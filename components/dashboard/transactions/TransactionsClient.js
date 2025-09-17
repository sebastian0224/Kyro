"use client";

import { useState, useEffect } from "react";
import { ExternalLink, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { getPortfolioTransactions } from "@/lib/alchemy/portfolio";
import Dropdown from "./DropDown";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const truncateAddress = (a) => (!a ? "" : `${a.slice(0, 6)}...${a.slice(-4)}`);
const truncateHash = (h) => (!h ? "" : `${h.slice(0, 10)}...${h.slice(-8)}`);
const formatAmount = (n) =>
  n >= 1_000_000
    ? (n / 1_000_000).toFixed(4) + "M"
    : n >= 1000
    ? (n / 1000).toFixed(4) + "K"
    : parseFloat(n).toFixed(6);
const formatDate = (ts) => {
  const d = new Date(ts);
  return (
    d.toLocaleDateString() +
    " " +
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
};
const getCategoryColor = (c) =>
  ({
    external: "bg-blue-500/20 text-blue-400",
    internal: "bg-green-500/20 text-green-400",
    erc20: "bg-purple-500/20 text-purple-400",
    erc721: "bg-orange-500/20 text-orange-400",
    erc1155: "bg-pink-500/20 text-pink-400",
  }[c] || "bg-gray-500/20 text-gray-400");

export default function TransactionsClient({ portfolioId }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedWallet, setSelectedWallet] = useState("all");
  const [selectedNetwork, setSelectedNetwork] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getPortfolioTransactions(
        portfolioId,
        selectedWallet === "all" ? null : selectedWallet,
        selectedNetwork === "all" ? null : selectedNetwork,
        selectedCategory === "all" ? null : selectedCategory,
        20
      );
      setTransactions(res.transactions);
      setLoading(false);
    }
    if (portfolioId) load();
  }, [portfolioId, selectedWallet, selectedNetwork, selectedCategory]);

  if (loading) return <LoadingSpinner message="Loading transactions..." />;

  return (
    <div className="bg-kyro-sidebar border border-kyro-border rounded-lg">
      <div className="p-6 border-b border-kyro-border">
        <h3 className="font-space-grotesk font-semibold text-kyro-text">
          Transaction History
        </h3>
      </div>

      {transactions.length === 0 ? (
        <p className="p-6 text-center text-gray-400">No transactions found</p>
      ) : (
        <>
          {/* Tabla solo en pantallas extra grandes */}
          <div className="hidden xl:block overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="p-4 text-left text-sm text-gray-400">Hash</th>
                  <th className="p-4 text-left text-sm text-gray-400">
                    From → To
                  </th>
                  <th className="p-4 text-left text-sm text-gray-400">Asset</th>
                  <th className="p-4 text-left text-sm text-gray-400">
                    Amount
                  </th>
                  <th className="p-4 text-left text-sm text-gray-400">Type</th>
                  <th className="p-4 text-left text-sm text-gray-400">Date</th>
                  <th className="p-4 text-left text-sm text-gray-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => (
                  <tr key={i} className="border-t border-kyro-border">
                    <td className="p-4 font-mono text-sm">
                      {truncateHash(tx.hash)}
                    </td>
                    <td className="p-4">
                      {truncateAddress(tx.from)} → {truncateAddress(tx.to)}
                    </td>
                    <td className="p-4">{tx.asset}</td>
                    <td
                      className={`p-4 font-mono ${
                        tx.direction === "sent"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {tx.direction === "sent" ? "-" : "+"}
                      {formatAmount(tx.amount)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(
                          tx.category
                        )}`}
                      >
                        {tx.category}
                      </span>
                    </td>
                    <td className="p-4">{formatDate(tx.timestamp)}</td>
                    <td className="p-4">
                      <button
                        onClick={() =>
                          window.open(
                            `https://etherscan.io/tx/${tx.hash}`,
                            "_blank"
                          )
                        }
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards en mobile, tablet y laptops medianas */}
          <div className="xl:hidden space-y-4 p-4">
            {transactions.map((tx, i) => (
              <div key={i} className="p-4 border rounded-lg bg-card space-y-2">
                <p className="font-mono text-sm">
                  Hash: {truncateHash(tx.hash)}
                </p>
                <p className="text-sm">From: {truncateAddress(tx.from)}</p>
                <p className="text-sm">To: {truncateAddress(tx.to)}</p>
                <p className="text-sm">Asset: {tx.asset}</p>
                <p
                  className={`font-mono ${
                    tx.direction === "sent" ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {tx.direction === "sent" ? "-" : "+"}
                  {formatAmount(tx.amount)}
                </p>
                <p
                  className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(
                    tx.category
                  )}`}
                >
                  {tx.category}
                </p>
                <p className="text-xs text-gray-400">
                  Date: {formatDate(tx.timestamp)}
                </p>
                <button
                  onClick={() =>
                    window.open(`https://etherscan.io/tx/${tx.hash}`, "_blank")
                  }
                  className="text-blue-400 flex items-center gap-1 text-sm"
                >
                  View <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
