"use server";

import {
  getTopTokens,
  getWalletTokens,
  getHistoricalPricesForToken,
  aggregateValueByNetwork,
} from "./tokens";
import { calculateWalletNetWorth } from "./wallets";
import { getPortfolioById } from "../db/portfolios";
import { readWallets } from "../db/wallets";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const WALLET_COLORS = [
  "#3b82f6", // Blue-500
  "#ef4444", // Red-500
  "#10b981", // Emerald-500
  "#f59e0b", // Amber-500
  "#8b5cf6", // Violet-500
  "#ec4899", // Pink-500
];

const TOKEN_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--muted-foreground)", // Para "Otros"
];

const NATIVE_SYMBOLS = {
  "eth-mainnet": { symbol: "ETH", name: "Ethereum" },
  "matic-mainnet": { symbol: "MATIC", name: "Polygon" },
  "bnb-mainnet": { symbol: "BNB", name: "Binance Coin" },
  "avax-mainnet": { symbol: "AVAX", name: "Avalanche" },
  "opt-mainnet": { symbol: "ETH", name: "Optimism ETH" },
  "arb-mainnet": { symbol: "ETH", name: "Arbitrum ETH" },
  "base-mainnet": { symbol: "ETH", name: "Base ETH" },
};

async function calculatePortfolioNetWorth(wallets) {
  try {
    if (!wallets || wallets.length === 0) return 0;

    let total = 0;

    for (const wallet of wallets) {
      const walletValue = await calculateWalletNetWorth(wallet);
      total += walletValue;
    }
    return total;
  } catch (error) {
    console.error("calculatePortfolioNetWorth error:", error);
    return 0;
  }
}

export async function getPortfolioNameAndNetWorth(portfolioId, userId) {
  try {
    // 1️⃣ Nombre del portfolio
    const portfolio = await getPortfolioById(portfolioId, userId);
    if (!portfolio) {
      throw new Error("Portfolio not found.");
    }

    // 2️⃣ Wallets del portfolio
    const wallets = await readWallets(portfolioId);
    const walletAddresses = wallets.map((w) => w.address);

    // 3️⃣ Net worth total
    const totalNetWorth = await calculatePortfolioNetWorth(walletAddresses);

    // 4️⃣ Retornar datos finales
    return {
      id: portfolio.id,
      name: portfolio.name,
      netWorth: totalNetWorth,
    };
  } catch (error) {
    console.error("getPortfolioNameAndNetWorth error:", error);
    return null;
  }
}

function truncateAddress(address) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export async function getPortfolioNetWorthData(portfolioId, userId) {
  try {
    const portfolio = await getPortfolioById(portfolioId, userId);
    if (!portfolio || !portfolio.wallets) {
      throw new Error("Portfolio not found or has no wallets");
    }

    const walletResults = await Promise.all(
      portfolio.wallets.map(async (wallet, index) => {
        const value = await calculateWalletNetWorth(wallet.address);
        return {
          address: wallet.address,
          display: truncateAddress(wallet.address),
          value,
        };
      })
    );

    const totalNetWorth = walletResults.reduce((sum, w) => sum + w.value, 0);

    const walletContributions = walletResults.map((w, index) => ({
      ...w,
      percentage: totalNetWorth > 0 ? (w.value / totalNetWorth) * 100 : 0,
      color: WALLET_COLORS[index % WALLET_COLORS.length],
    }));

    return {
      portfolioId: portfolio.id,
      portfolioName: portfolio.name,
      totalNetWorth,
      walletContributions,
    };
  } catch (error) {
    console.error("Error in getPortfolioNetWorthData:", error);
    throw error;
  }
}

export async function calculatePortfolioHistoricalPerformance(
  portfolioId,
  userId
) {
  try {
    // Info del portafolio (para usar el nombre en el chart)
    const portfolio = await getPortfolioById(portfolioId, userId);
    if (!portfolio) throw new Error("Portfolio not found");

    // Obtener top 10 tokens del portafolio
    const topTokens = await getTopTokens(portfolioId);
    if (!topTokens || topTokens.length === 0) return [];

    // Definir rango: últimos 3 meses desde hoy
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 3);

    const startISO = startDate.toISOString();
    const endISO = endDate.toISOString();

    // Para acumular los valores diarios
    const dailyMap = new Map();

    for (const token of topTokens) {
      const { symbol, amount } = token;

      const prices = await getHistoricalPricesForToken(
        symbol,
        startISO,
        endISO
      );

      for (const entry of prices) {
        const dateKey = entry.timestamp.split("T")[0]; // "2025-01-01"
        const price = Number(entry.value || 0);
        const tokenValue = price * amount;

        if (!dailyMap.has(dateKey)) {
          dailyMap.set(dateKey, 0);
        }
        dailyMap.set(dateKey, dailyMap.get(dateKey) + tokenValue);
      }
    }

    // Convertir map → array listo para chart
    const chartData = Array.from(dailyMap.entries()).map(([date, value]) => ({
      date,
      [portfolio.name]: parseFloat(value.toFixed(2)),
    }));

    // Ordenar por fecha ascendente
    chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

    return chartData;
  } catch (err) {
    console.error("Error calculating portfolio historical performance:", err);
    return [];
  }
}

// 🔹 Calcular distribución del portafolio por red
export async function calculatePortfolioNetworkDistribution(portfolioId) {
  try {
    const wallets = await readWallets(portfolioId);
    if (!wallets || wallets.length === 0) return [];

    const walletAddresses = wallets.map((w) => w.address);
    const aggregatedNetworks = await aggregateValueByNetwork(walletAddresses);

    if (!aggregatedNetworks || aggregatedNetworks.length === 0) return [];

    const totalValue = aggregatedNetworks.reduce(
      (acc, n) => acc + n.valueUSD,
      0
    );

    // Asignar colores y porcentajes
    const chartData = aggregatedNetworks.map((n, i) => {
      const percentage = (n.valueUSD / totalValue) * 100;
      return {
        network: n.network,
        valueUSD: n.valueUSD,
        percentage: parseFloat(percentage.toFixed(2)),
        fill: TOKEN_COLORS[i] || "var(--muted-foreground)",
      };
    });

    return chartData;
  } catch (err) {
    console.error("Error calculating network distribution:", err);
    return [];
  }
}

export async function calculateWalletContributions(portfolioId) {
  try {
    // 1. Obtener wallets del portafolio
    const wallets = await readWallets(portfolioId);
    if (!wallets || wallets.length === 0)
      return { chartData: [], chartConfig: {} };

    const results = [];

    // 2. Para cada wallet, obtener sus tokens y calcular valor USD
    for (const wallet of wallets) {
      const tokens = await getWalletTokens(wallet.address);
      let walletTotalUSD = 0;

      for (const token of tokens) {
        // usar precios ya devueltos por Alchemy
        if (!token.tokenPrices || token.tokenPrices.length === 0) continue;
        const priceUSD = Number(token.tokenPrices[0]?.value || 0);
        if (!priceUSD || priceUSD <= 0) continue;

        // balance real
        const decimals = token.tokenMetadata?.decimals ?? 18;
        const rawBalance = BigInt(token.tokenBalance || "0");
        const balance = Number(rawBalance) / Math.pow(10, decimals);
        if (!balance || balance <= 0) continue;

        walletTotalUSD += balance * priceUSD;
      }

      results.push({
        wallet: wallet.address,
        valueUSD: walletTotalUSD,
      });
    }

    // 3. Total del portfolio
    const totalValue = results.reduce((acc, w) => acc + w.valueUSD, 0);

    // 4. Formatear datos para gráfico
    const chartData = results.map((w, i) => {
      const percentage = totalValue ? (w.valueUSD / totalValue) * 100 : 0;
      return {
        wallet: w.wallet,
        value: w.valueUSD,
        percentage: parseFloat(percentage.toFixed(2)),
        fill: WALLET_COLORS[i % WALLET_COLORS.length],
      };
    });

    // 5. Construir chartConfig dinámico
    const chartConfig = {
      value: { label: "Value" },
    };
    chartData.forEach((w) => {
      chartConfig[w.wallet] = {
        label: truncateAddress(w.wallet),
        color: w.fill,
      };
    });

    return { chartData, chartConfig };
  } catch (err) {
    console.error("Error calculating wallet contributions:", err);
    return { chartData: [], chartConfig: {} };
  }
}

export async function getPortfolioTransactions(
  portfolioId,
  filterWallet = null,
  filterNetwork = null,
  filterCategory = null,
  limit = 50
) {
  try {
    // 1. Obtener wallets del portfolio
    const wallets = await readWallets(portfolioId);
    if (!wallets || wallets.length === 0) {
      return {
        transactions: [],
        availableWallets: [],
        availableNetworks: [],
        availableCategories: [],
      };
    }

    // 2. Filtrar wallets si se especifica
    let walletsToProcess = wallets;
    if (filterWallet && filterWallet !== "all") {
      walletsToProcess = wallets.filter((w) => w.address === filterWallet);
    }

    const networks = Object.keys(NATIVE_SYMBOLS);

    // 3. Filtrar networks si se especifica
    let networksToProcess = networks;
    if (filterNetwork && filterNetwork !== "all") {
      networksToProcess = [filterNetwork];
    }

    const allTransactions = [];
    const networksSet = new Set();
    const categoriesSet = new Set();

    // Helper: obtiene transacciones para una wallet/network/dirección
    async function fetchTransactions(
      walletAddress,
      network,
      direction,
      limitPerCall
    ) {
      try {
        // Construir URL correcta según el network
        let baseUrl;
        switch (network) {
          case "eth-mainnet":
            baseUrl = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
            break;
          case "polygon-mainnet":
            baseUrl = `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
            break;
          case "arb-mainnet":
            baseUrl = `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
            break;
          case "opt-mainnet":
            baseUrl = `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
            break;
          case "base-mainnet":
            baseUrl = `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
            break;
          default:
            baseUrl = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
        }

        const paramsObj = {
          fromBlock: "0x0",
          toBlock: "latest",
          category: ["external", "internal", "erc20", "erc721", "erc1155"],
          maxCount: `0x${Math.min(limitPerCall, 100).toString(16)}`,
          excludeZeroValue: true,
          order: "desc",
        };

        // agregar la propiedad computed (fromAddress o toAddress)
        if (direction === "from") {
          paramsObj.fromAddress = walletAddress;
        } else {
          paramsObj.toAddress = walletAddress;
        }

        const requestBody = {
          id: 1,
          jsonrpc: "2.0",
          method: "alchemy_getAssetTransfers",
          params: [paramsObj],
        };

        const response = await fetch(baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (data?.result?.transfers) {
          for (const transfer of data.result.transfers) {
            // Agregar network y categoría a los sets
            networksSet.add(network);
            categoriesSet.add(transfer.category);

            // Filtrar por categoría si se especifica
            if (
              filterCategory &&
              filterCategory !== "all" &&
              transfer.category !== filterCategory
            ) {
              continue;
            }

            // Obtener timestamp preciso si viene en metadata, si no usar fallback aproximado
            const timestamp =
              transfer.metadata?.blockTimestamp ||
              new Date(
                Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
              ).toISOString();

            // Formatear transacción
            const transaction = {
              hash: transfer.hash,
              uniqueId: transfer.uniqueId,
              from: transfer.from,
              to: transfer.to,
              asset: transfer.asset || "ETH",
              amount: transfer.value || 0,
              category: transfer.category,
              blockNum: transfer.blockNum,
              network: network,
              walletAddress: walletAddress,
              timestamp: new Date(timestamp).toISOString(),
              // Determinar dirección (sent/received)
              direction:
                transfer.from?.toLowerCase() === walletAddress.toLowerCase()
                  ? "sent"
                  : "received",
            };

            allTransactions.push(transaction);
          }
        }
      } catch (error) {
        console.error(
          `Error fetching transactions for ${walletAddress} on ${network}:`,
          error
        );
      }
    }

    // 4. Para cada wallet y network, obtener transacciones (enviadas y recibidas)
    for (const wallet of walletsToProcess) {
      for (const network of networksToProcess) {
        // Obtener transacciones enviadas y recibidas (cada llamada respeta 'limit' por llamada)
        await fetchTransactions(wallet.address, network, "from", limit);
        await fetchTransactions(wallet.address, network, "to", limit);
      }
    }

    // 5. Ordenar por timestamp (más recientes primero) y limitar
    const sortedTransactions = allTransactions
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);

    // 6. Preparar datos para filtros
    const availableWallets = wallets.map((w) => ({
      address: w.address,
      display: `${w.address.slice(0, 6)}...${w.address.slice(-4)}`,
    }));

    const availableNetworks = Array.from(networksSet).map((network) => ({
      value: network,
      display: network.replace("-mainnet", "").replace("-", " ").toUpperCase(),
    }));

    const availableCategories = Array.from(categoriesSet).map((category) => ({
      value: category,
      display: category.charAt(0).toUpperCase() + category.slice(1),
    }));

    return {
      transactions: sortedTransactions,
      availableWallets,
      availableNetworks,
      availableCategories,
    };
  } catch (error) {
    console.error("Error getting portfolio transactions:", error);
    return {
      transactions: [],
      availableWallets: [],
      availableNetworks: [],
      availableCategories: [],
    };
  }
}
