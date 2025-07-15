import prisma from "@/lib/prisma";

export async function getPortfolioById(id) {
  return await prisma.portfolio.findUnique({
    where: { id },
  });
}

export async function createPortfolio(name, userId) {
  return await prisma.portfolio.create({
    data: { name, userId: userId },
  });
}

export async function readPortfolios(userId) {
  return await prisma.portfolio.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function updatePortfolio(id, name) {
  return await prisma.portfolio.update({ where: { id }, data: { name } });
}

export async function deletePortfolio(id) {
  await prisma.wallet.deleteMany({
    where: { portfolioId: id },
  });

  await prisma.portfolio.delete({
    where: { id },
  });
}
