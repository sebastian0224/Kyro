"use server";

import { readWallets } from "@/lib/db/wallets";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const TOKEN_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--muted-foreground)", // Para "Otros"
];

// Mapa de símbolos para nativos
const NATIVE_SYMBOLS = {
  "eth-mainnet": { symbol: "ETH", name: "Ethereum" },
  "matic-mainnet": { symbol: "MATIC", name: "Polygon" },
  "bnb-mainnet": { symbol: "BNB", name: "Binance Coin" },
  "avax-mainnet": { symbol: "AVAX", name: "Avalanche" },
  "opt-mainnet": { symbol: "ETH", name: "Optimism ETH" },
  "arb-mainnet": { symbol: "ETH", name: "Arbitrum ETH" },
  "base-mainnet": { symbol: "ETH", name: "Base ETH" },
};

// Función helper para obtener tokens de una wallet
async function getWalletTokens(walletAddress) {
  const url = `https://api.g.alchemy.com/data/v1/${ALCHEMY_API_KEY}/assets/tokens/by-address`;

  const networks = Object.keys(NATIVE_SYMBOLS);

  const requestBody = {
    includeNativeTokens: true,
    addresses: [
      {
        address: walletAddress,
        networks,
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    return data?.data?.tokens || [];
  } catch (error) {
    console.error(`Error fetching tokens for wallet ${walletAddress}:`, error);
    return [];
  }
}

// Agregar tokens por valor USD
async function aggregateTokensByValue(walletAddresses) {
  const tokenMap = new Map();

  for (const walletAddress of walletAddresses) {
    const tokens = await getWalletTokens(walletAddress);

    for (const token of tokens) {
      // 1. Validar precio
      if (!token.tokenPrices || token.tokenPrices.length === 0) continue;

      const priceUSD = Number(token.tokenPrices[0]?.value || 0);
      if (!priceUSD || priceUSD <= 0) continue;

      // 2. Calcular balance real
      const decimals = token.tokenMetadata?.decimals ?? 18;
      const rawBalance = BigInt(token.tokenBalance || "0");
      const balance = Number(rawBalance) / Math.pow(10, decimals);

      if (!balance || balance <= 0) continue;

      // 3. Detectar nativos o tokens normales
      let symbol = token.tokenMetadata?.symbol;
      let name = token.tokenMetadata?.name;

      if (!token.tokenAddress) {
        const native = NATIVE_SYMBOLS[token.network];
        if (native) {
          symbol = native.symbol;
          name = native.name;
        }
      }

      if (!symbol) symbol = "UNKNOWN";
      if (!name) name = symbol;

      // 4. Calcular valor en USD
      const valueUSD = balance * priceUSD;

      // 5. Agregar al Map
      if (tokenMap.has(symbol)) {
        const existing = tokenMap.get(symbol);
        tokenMap.set(symbol, {
          ...existing,
          totalBalance: existing.totalBalance + balance,
          totalValueUSD: existing.totalValueUSD + valueUSD,
        });
      } else {
        tokenMap.set(symbol, {
          symbol,
          name,
          totalBalance: balance,
          priceUSD,
          totalValueUSD: valueUSD,
        });
      }
    }
  }

  return Array.from(tokenMap.values());
}

// Función principal
export async function calculatePortfolioTokenDistribution(portfolioId) {
  try {
    const wallets = await readWallets(portfolioId);
    if (!wallets || wallets.length === 0) return [];

    const walletAddresses = wallets.map((w) => w.address);

    const aggregatedTokens = await aggregateTokensByValue(walletAddresses);

    if (!aggregatedTokens || aggregatedTokens.length === 0) {
      console.log("❌ No tokens found after aggregation");
      return [];
    }

    // Ordenar
    const sorted = aggregatedTokens
      .filter((t) => t.totalValueUSD > 0)
      .sort((a, b) => b.totalValueUSD - a.totalValueUSD);

    const totalValue = sorted.reduce((acc, t) => acc + t.totalValueUSD, 0);

    // Top 5 + otros
    const topTokens = [];
    const seen = new Set();

    for (const token of sorted) {
      if (topTokens.length < 5 && !seen.has(token.symbol)) {
        topTokens.push(token);
        seen.add(token.symbol);
      }
    }

    const others = sorted.filter((t) => !seen.has(t.symbol));
    if (others.length > 0) {
      const othersValue = others.reduce((acc, t) => acc + t.totalValueUSD, 0);
      topTokens.push({
        symbol: "Otros",
        name: "Otros tokens",
        totalBalance: 0,
        priceUSD: 0,
        totalValueUSD: othersValue,
      });
    }

    const chartData = topTokens.map((t, i) => ({
      token: t.symbol,
      value: parseFloat(((t.totalValueUSD / totalValue) * 100).toFixed(2)),
      fill: TOKEN_COLORS[i] || "var(--muted-foreground)",
      valueUSD: t.totalValueUSD,
      name: t.name,
    }));

    return chartData;
  } catch (err) {
    console.error("Error calculating token distribution:", err);
    return [];
  }
}

// Función para obtener los top 10 tokens del portfolio
export async function getTopTokens(portfolioId) {
  try {
    // 1. Obtener wallets del portfolio
    const wallets = await readWallets(portfolioId);
    if (!wallets || wallets.length === 0) {
      console.log("No wallets found for portfolio:", portfolioId);
      return [];
    }

    const walletAddresses = wallets.map((w) => w.address);
    console.log("Processing wallets:", walletAddresses.length);

    // 2. Agregar tokens por valor USD usando la lógica existente
    const aggregatedTokens = await aggregateTokensByValue(walletAddresses);

    if (!aggregatedTokens || aggregatedTokens.length === 0) {
      console.log("No tokens found after aggregation");
      return [];
    }

    // 3. Filtrar y ordenar tokens
    const validTokens = aggregatedTokens
      .filter((token) => token.totalValueUSD > 0 && token.totalBalance > 0)
      .sort((a, b) => b.totalValueUSD - a.totalValueUSD);

    if (validTokens.length === 0) {
      console.log("No valid tokens with value > 0");
      return [];
    }

    // 4. Calcular valor total del portfolio
    const totalPortfolioValue = validTokens.reduce(
      (acc, token) => acc + token.totalValueUSD,
      0
    );

    // 5. Tomar los top 10 tokens y formatear para la tabla
    const topTokens = validTokens.slice(0, 10).map((token) => {
      const percentage = (token.totalValueUSD / totalPortfolioValue) * 100;

      return {
        symbol: token.symbol,
        amount: token.totalBalance,
        price: token.priceUSD,
        value: token.totalValueUSD,
        percentage: parseFloat(percentage.toFixed(2)),
      };
    });

    console.log(`✅ Successfully processed ${topTokens.length} top tokens`);
    console.log("Total portfolio value:", totalPortfolioValue);

    return topTokens;
  } catch (error) {
    console.error("Error getting top tokens:", error);
    return [];
  }
}
