// PortfolioList.js
// This component displays the list of portfolios for the current user.
// For each portfolio, it shows the name and a simple list of associated wallet addresses.
// Actions: View, Edit, Delete.
//
// TODO (v0): Improve the visual design using chadcn/ui components. Keep it minimal and professional, inspired by the landing page style.
//
// Props: None (this is a server component, fetches data internally)
//
// Example of expected data structure for each portfolio:
// {
//   id: "portfolio_id",
//   name: "Portfolio Name",
//   wallets: [
//     { id: "wallet_id_1", address: "0x123..." },
//     { id: "wallet_id_2", address: "0xabc..." }
//   ]
// }
//
// Example usage for mockup/testing:
// <PortfolioList portfolios={[
//   { id: '1', name: 'Main Portfolio', wallets: [ { id: 'w1', address: '0x123' } ] },
//   { id: '2', name: 'Savings', wallets: [] }
// ]} />
//
// v0: You can change the HTML structure and styles, but keep the logic and data mapping intact.

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
            {/* Lista de wallets asociadas */}
            {portfolio.wallets && portfolio.wallets.length > 0 && (
              <ul style={{ marginLeft: "1rem", marginBottom: "0.5rem" }}>
                {portfolio.wallets.map((wallet) => (
                  <li
                    key={wallet.id}
                    style={{ fontSize: "0.95em", color: "#aaa" }}
                  >
                    {wallet.address}
                  </li>
                ))}
              </ul>
            )}
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
