"use server";

import { calculateWalletNetWorth } from "./wallets";
import { getPortfolioById } from "../db/portfolios";
import { readWallets } from "../db/wallets";

const WALLET_COLORS = [
  "#3b82f6", // Blue-500
  "#ef4444", // Red-500
  "#10b981", // Emerald-500
  "#f59e0b", // Amber-500
  "#8b5cf6", // Violet-500
  "#ec4899", // Pink-500
];

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
