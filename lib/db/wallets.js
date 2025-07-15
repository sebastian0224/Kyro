import prisma from "@/lib/prisma";

export async function createWalletList(wallets) {
  return await prisma.wallet.createMany({
    data: wallets,
  });
}

export async function readWallets(portfolioId) {
  return await prisma.wallet.findMany({
    where: { portfolioId },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteWalletsByPortfolio(portfolioId) {
  await prisma.wallet.deleteMany({ where: { portfolioId } });
}
