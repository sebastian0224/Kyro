"use server";

import prisma from "@/lib/prisma";

export async function createWalletList(wallets) {
  try {
    return await prisma.wallet.createMany({
      data: wallets,
    });
  } catch (err) {
    throw new Error("Error creating wallets.");
  }
}

export async function readWallets(portfolioId) {
  try {
    return await prisma.wallet.findMany({
      where: { portfolioId },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    throw new Error("Error reading wallets." + err);
  }
}

export async function deleteWalletsByPortfolio(portfolioId) {
  try {
    await prisma.wallet.deleteMany({ where: { portfolioId } });
  } catch (err) {
    throw new Error("Error deleting portfolio wallets.");
  }
}
