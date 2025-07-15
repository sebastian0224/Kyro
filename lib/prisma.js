import { PrismaClient } from "@prisma/client";

let prisma;

try {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
  }
} catch (error) {
  // TODO: Mostrar mensaje visual de error de conexión con V0
  console.error("Error al inicializar Prisma:", error);
  throw new Error(
    "No se pudo conectar a la base de datos. Revisa la configuración de Prisma y tu conexión."
  );
}

export default prisma;
