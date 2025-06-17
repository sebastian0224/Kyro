import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const user = await currentUser();

  return (
    <div style={{ padding: 32 }}>
      <UserButton />
      <h2>Dashboard de prueba</h2>
      <div>
        Email autenticado:{" "}
        {user?.emailAddresses?.[0]?.emailAddress || "No logueado"}
      </div>
    </div>
  );
}
