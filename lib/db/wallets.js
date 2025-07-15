import prisma from "@/lib/prisma";

export async function createWalletList(wallets, prismaClient = prisma) {
  try {
    return await prismaClient.wallet.createMany({
      data: wallets,
    });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error(
        "Ya existe una wallet con esa dirección en este portfolio."
      );
    }
    throw new Error("Error al crear las wallets.");
  }
}

export async function readWallets(portfolioId, prismaClient = prisma) {
  // TODO: Agregar paginación usando skip y take cuando se permita más wallets por portfolio
  try {
    return await prismaClient.wallet.findMany({
      where: { portfolioId },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    throw new Error("Error al leer las wallets.");
  }
}

export async function deleteWalletsByPortfolio(
  portfolioId,
  prismaClient = prisma
) {
  try {
    await prismaClient.wallet.deleteMany({ where: { portfolioId } });
  } catch (err) {
    throw new Error("Error al eliminar las wallets del portfolio.");
  }
}
