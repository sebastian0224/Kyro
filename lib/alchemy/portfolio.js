"use server";

import { calculateWalletNetWorth } from "./wallets";
import { getPortfolioById } from "../db/portfolios";
import { readWallets } from "../db/wallets";

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
