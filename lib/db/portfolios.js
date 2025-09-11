"use server";

import prisma from "@/lib/prisma";

export async function getPortfolioById(id, userId) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id, userId },
      include: { wallets: true },
    });
    return portfolio;
  } catch (err) {
    throw new Error("Error getting portfolio.");
  }
}

export async function createPortfolio(name, userId) {
  try {
    return await prisma.portfolio.create({
      data: { name, userId: userId },
    });
  } catch (err) {
    throw new Error("Error creating portfolio.");
  }
}

export async function readPortfolios(userId) {
  try {
    return await prisma.portfolio.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { wallets: true },
    });
  } catch (err) {
    throw new Error("Error reading portfolios.");
  }
}

export async function updatePortfolio(id, name, userId) {
  try {
    const updated = await prisma.portfolio.update({
      where: { id, userId },
      data: { name },
    });
    return updated;
  } catch (err) {
    throw new Error("Error updating portfolio.");
  }
}

export async function deletePortfolio(id, userId) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id, userId },
    });
    if (!portfolio)
      throw new Error("You do not have permission to delete this portfolio.");

    await prisma.wallet.deleteMany({ where: { portfolioId: id } });
    await prisma.portfolio.delete({ where: { id, userId } });
  } catch (err) {
    throw new Error("Error deleting portfolio.");
  }
}
