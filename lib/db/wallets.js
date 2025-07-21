import prisma from "@/lib/prisma";

export async function createWalletList(wallets, prismaClient = prisma) {
  try {
    return await prismaClient.wallet.createMany({
      data: wallets,
    });
  } catch (err) {
    throw new Error("Error creating wallets.");
  }
}

export async function readWallets(portfolioId, prismaClient = prisma) {
  try {
    return await prismaClient.wallet.findMany({
      where: { portfolioId },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    throw new Error("Error reading wallets.");
  }
}

export async function deleteWalletsByPortfolio(
  portfolioId,
  prismaClient = prisma
) {
  try {
    await prismaClient.wallet.deleteMany({ where: { portfolioId } });
  } catch (err) {
    throw new Error("Error deleting portfolio wallets.");
  }
}
