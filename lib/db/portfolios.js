import prisma from "@/lib/prisma";

export async function getPortfolioById(id, userId) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id, userId },
    });
    return portfolio;
  } catch (err) {
    throw new Error(" 2. Error al obtener el portfolio.");
  }
}

export async function createPortfolio(name, userId) {
  try {
    return await prisma.portfolio.create({
      data: { name, userId: userId },
    });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("Ya existe un portfolio con ese nombre.");
    }
    throw new Error("Error al crear el portfolio.");
  }
}

export async function readPortfolios(userId) {
  // TODO: Agregar paginación usando skip y take cuando se permita más portfolios por usuario
  try {
    return await prisma.portfolio.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { wallets: true }, // Incluye las wallets asociadas
    });
  } catch (err) {
    throw new Error("Error al leer los portfolios.");
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
    if (err.code === "P2025") {
      throw new Error("Portfolio no encontrado o no autorizado.");
    }
    throw new Error("Error al actualizar el portfolio.");
  }
}

export async function deletePortfolio(id, userId) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id, userId },
    });
    if (!portfolio)
      throw new Error("No tienes permiso para eliminar este portfolio.");

    await prisma.wallet.deleteMany({ where: { portfolioId: id } });
    await prisma.portfolio.delete({ where: { id, userId } });
  } catch (err) {
    if (err.code === "P2025") {
      throw new Error("Portfolio no encontrado o no autorizado.");
    }
    throw new Error("Error al eliminar el portfolio.");
  }
}
