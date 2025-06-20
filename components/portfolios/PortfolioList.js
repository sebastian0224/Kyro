import { readPortfolios } from "@/lib/portfolios";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function PortfolioList() {
  const { userId } = await auth();
  const portfolios = await readPortfolios(userId);
  return (
    <ul>
      {portfolios.map((p) => (
        <li key={p.id}>
          <Link href={`/portfolios/${p.id}`}>{p.name}</Link>

          <Button>
            <Link
              href={`/portfolios/edit?id=${p.id}&name=${encodeURIComponent(
                p.name
              )}`}
            >
              editar
            </Link>
          </Button>

          <Button>
            <Link href={`/portfolios/delete?id=${p.id}`}>Eliminar</Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
