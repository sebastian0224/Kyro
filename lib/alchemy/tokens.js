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
export async function getWalletTokens(walletAddress) {
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

// 🔹 Agregar valor por red (network)
export async function aggregateValueByNetwork(walletAddresses) {
  const url = `https://api.g.alchemy.com/data/v1/${ALCHEMY_API_KEY}/assets/tokens/by-address`;

  const networks = Object.keys(NATIVE_SYMBOLS);

  const requestBody = {
    includeNativeTokens: true,
    addresses: walletAddresses.map((address) => ({
      address,
      networks,
    })),
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    if (!data?.data?.tokens) return [];

    const networkMap = new Map();

    for (const token of data.data.tokens) {
      // validar precio
      if (!token.tokenPrices || token.tokenPrices.length === 0) continue;
      const priceUSD = Number(token.tokenPrices[0]?.value || 0);
      if (!priceUSD || priceUSD <= 0) continue;

      // balance real
      const decimals = token.tokenMetadata?.decimals ?? 18;
      const rawBalance = BigInt(token.tokenBalance || "0");
      const balance = Number(rawBalance) / Math.pow(10, decimals);
      if (!balance || balance <= 0) continue;

      // valor en USD
      const valueUSD = balance * priceUSD;
      const network = token.network || "unknown";

      if (networkMap.has(network)) {
        networkMap.set(network, networkMap.get(network) + valueUSD);
      } else {
        networkMap.set(network, valueUSD);
      }
    }

    return Array.from(networkMap.entries()).map(([network, valueUSD]) => ({
      network,
      valueUSD,
    }));
  } catch (err) {
    console.error("Error aggregating value by network:", err);
    return [];
  }
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

export async function getHistoricalPricesForToken(symbol, startTime, endTime) {
  const url = `https://api.g.alchemy.com/prices/v1/${ALCHEMY_API_KEY}/tokens/historical`;

  const body = {
    symbol,
    startTime,
    endTime,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error("Alchemy historical prices error:", await response.text());
      return [];
    }

    const data = await response.json();
    // la estructura correcta es data.data
    return data?.data || [];
  } catch (err) {
    console.error(`Error fetching historical prices for ${symbol}:`, err);
    return [];
  }
}

export async function getPortfolioAssets(
  portfolioId,
  filterWallet = null,
  filterNetwork = null
) {
  try {
    // 1. Obtener wallets del portfolio
    const wallets = await readWallets(portfolioId);
    if (!wallets || wallets.length === 0) {
      return {
        assets: [],
        totalValue: 0,
        availableWallets: [],
        availableNetworks: [],
      };
    }

    // 2. Filtrar wallets si se especifica
    let walletsToProcess = wallets;
    if (filterWallet && filterWallet !== "all") {
      walletsToProcess = wallets.filter((w) => w.address === filterWallet);
    }

    const walletAddresses = walletsToProcess.map((w) => w.address);

    // 3. Obtener todos los tokens de todas las wallets
    const allTokens = [];
    const networksSet = new Set();

    for (const walletAddress of walletAddresses) {
      const tokens = await getWalletTokens(walletAddress);

      for (const token of tokens) {
        // Agregar network al set para filtros
        if (token.network) {
          networksSet.add(token.network);
        }

        // Filtrar por network si se especifica
        if (
          filterNetwork &&
          filterNetwork !== "all" &&
          token.network !== filterNetwork
        ) {
          continue;
        }

        // Validar precio
        if (!token.tokenPrices || token.tokenPrices.length === 0) continue;
        const priceUSD = Number(token.tokenPrices[0]?.value || 0);
        if (!priceUSD || priceUSD <= 0) continue;

        // Calcular balance real
        const decimals = token.tokenMetadata?.decimals ?? 18;
        const rawBalance = BigInt(token.tokenBalance || "0");
        const balance = Number(rawBalance) / Math.pow(10, decimals);
        if (!balance || balance <= 0) continue;

        // Detectar símbolo (nativos o tokens normales)
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

        allTokens.push({
          symbol,
          name,
          balance,
          priceUSD,
          valueUSD: balance * priceUSD,
          network: token.network,
        });
      }
    }

    // 4. Agregar tokens por símbolo
    const tokenMap = new Map();

    for (const token of allTokens) {
      if (tokenMap.has(token.symbol)) {
        const existing = tokenMap.get(token.symbol);
        tokenMap.set(token.symbol, {
          ...existing,
          balance: existing.balance + token.balance,
          valueUSD: existing.valueUSD + token.valueUSD,
        });
      } else {
        tokenMap.set(token.symbol, {
          symbol: token.symbol,
          name: token.name,
          balance: token.balance,
          priceUSD: token.priceUSD,
          valueUSD: token.valueUSD,
          network: token.network,
        });
      }
    }

    const aggregatedTokens = Array.from(tokenMap.values());

    // 5. Calcular valor total y porcentajes
    const totalValue = aggregatedTokens.reduce(
      (acc, token) => acc + token.valueUSD,
      0
    );

    // 6. Formatear y limitar a top 20
    const assets = aggregatedTokens
      .filter((token) => token.valueUSD > 0)
      .sort((a, b) => b.valueUSD - a.valueUSD)
      .slice(0, 20) // Máximo 20 tokens
      .map((token) => {
        const percentage =
          totalValue > 0 ? (token.valueUSD / totalValue) * 100 : 0;

        return {
          symbol: token.symbol,
          name: token.name,
          amount: token.balance,
          price: token.priceUSD,
          value: token.valueUSD,
          percentage: parseFloat(percentage.toFixed(2)),
          network: token.network,
        };
      });

    // 7. Preparar datos para filtros
    const availableWallets = wallets.map((w) => ({
      address: w.address,
      display: `${w.address.slice(0, 6)}...${w.address.slice(-4)}`,
    }));

    const availableNetworks = Array.from(networksSet).map((network) => ({
      value: network,
      display: network.replace("-mainnet", "").replace("-", " ").toUpperCase(),
    }));

    return {
      assets,
      totalValue,
      availableWallets,
      availableNetworks,
    };
  } catch (error) {
    console.error("Error getting portfolio assets:", error);
    return {
      assets: [],
      totalValue: 0,
      availableWallets: [],
      availableNetworks: [],
    };
  }
}
