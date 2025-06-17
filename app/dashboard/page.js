import { UserButton, currentUser } from "@clerk/nextjs";
import prisma from "../../lib/prisma";

export default async function Dashboard() {
  const user = await currentUser();
  const usersCount = await prisma.user.count();

  return (
    <div style={{ padding: 32 }}>
      <UserButton />
      <h2>Dashboard de prueba</h2>
      <div>
        Email autenticado:{" "}
        {user?.emailAddresses?.[0]?.emailAddress || "No logueado"}
      </div>
      <div>Usuarios en la base de datos: {usersCount}</div>
    </div>
  );
}
