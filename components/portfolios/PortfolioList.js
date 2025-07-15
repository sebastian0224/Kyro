import { readPortfolios } from "@/lib/db/portfolios";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function PortfolioList() {
  const { userId } = await auth();
  const portfolios = await readPortfolios(userId);

  if (portfolios.length === 0) {
    return (
      <div>
        <p>No portfolios yet</p>
        <Link href="/portfolios/create">Create Portfolio</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>My Portfolios ({portfolios.length})</h2>

      <ul>
        {portfolios.map((portfolio) => (
          <li key={portfolio.id}>
            <p>{portfolio.name}</p>
            <div>
              <Link href={`/portfolios/${portfolio.id}`}>View</Link>
              <Link href={`/portfolios/edit?id=${portfolio.id}`}>Edit</Link>
              <Link href={`/portfolios/delete?id=${portfolio.id}`}>Delete</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
