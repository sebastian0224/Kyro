"use client";

import { useState, useEffect } from "react";
import { ExternalLink, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { getPortfolioTransactions } from "@/lib/alchemy/portfolio";
import Dropdown from "./DropDown";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Función para truncar direcciones
const truncateAddress = (address) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Función para truncar hash
const truncateHash = (hash) => {
  if (!hash) return "";
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
};

// Función para formatear números
const formatAmount = (amount) => {
  if (amount >= 1000000) {
    return (amount / 1000000).toFixed(4) + "M";
  }
  if (amount >= 1000) {
    return (amount / 1000).toFixed(4) + "K";
  }
  return parseFloat(amount).toFixed(6);
};

// Función para formatear fecha
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return (
    date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
};

// Función para obtener color de la categoría
const getCategoryColor = (category) => {
  const colors = {
    external: "bg-blue-500/20 text-blue-400",
    internal: "bg-green-500/20 text-green-400",
    erc20: "bg-purple-500/20 text-purple-400",
    erc721: "bg-orange-500/20 text-orange-400",
    erc1155: "bg-pink-500/20 text-pink-400",
  };
  return colors[category] || "bg-gray-500/20 text-gray-400";
};

export default function TransactionsClient({ portfolioId }) {
  const [transactions, setTransactions] = useState([]);
  const [availableWallets, setAvailableWallets] = useState([]);
  const [availableNetworks, setAvailableNetworks] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtros
  const [selectedWallet, setSelectedWallet] = useState("all");
  const [selectedNetwork, setSelectedNetwork] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Cargar datos
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getPortfolioTransactions(
          portfolioId,
          selectedWallet === "all" ? null : selectedWallet,
          selectedNetwork === "all" ? null : selectedNetwork,
          selectedCategory === "all" ? null : selectedCategory,
          20 // Límite de transacciones
        );

        setTransactions(result.transactions);
        setAvailableWallets(result.availableWallets);
        setAvailableNetworks(result.availableNetworks);
        setAvailableCategories(result.availableCategories);
      } catch (err) {
        setError("Failed to load transactions");
        console.error("Error loading transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (portfolioId) {
      loadTransactions();
    }
  }, [portfolioId, selectedWallet, selectedNetwork, selectedCategory]);

  // Opciones para los dropdowns
  const walletOptions = [
    { value: "all", display: "All" },
    ...availableWallets.map((wallet) => ({
      value: wallet.address,
      display: wallet.display,
    })),
  ];

  const networkOptions = [
    { value: "all", display: "All" },
    ...availableNetworks,
  ];

  const categoryOptions = [
    { value: "all", display: "All Types" },
    ...availableCategories,
  ];

  // Estado de carga
  if (loading) {
    return (
      <div className="bg-kyro-sidebar border border-kyro-border rounded-lg">
        <div className="p-6 border-b border-kyro-border">
          <h3 className="font-space-grotesk font-semibold text-kyro-text">
            Transaction History
          </h3>
          <p className="text-gray-400 font-inter text-sm mt-1">
            Loading your transactions...
          </p>
        </div>
        <div className="p-6">
          <LoadingSpinner message="Loading transactions..." />
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="bg-kyro-sidebar border border-kyro-border rounded-lg">
        <div className="p-6 border-b border-kyro-border">
          <h3 className="font-space-grotesk font-semibold text-kyro-text">
            Transaction History
          </h3>
          <p className="text-gray-400 font-inter text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-kyro-sidebar border border-kyro-border rounded-lg">
      {/* Header with filters */}
      <div className="p-6 border-b border-kyro-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-space-grotesk font-semibold text-kyro-text">
              Transaction History
            </h3>
            <p className="text-gray-400 font-inter text-sm mt-1">
              {transactions.length} recent transactions
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">💼</span>
            <span className="text-sm text-gray-400 font-inter">Wallet</span>
            <Dropdown
              value={selectedWallet}
              onChange={setSelectedWallet}
              options={walletOptions}
              placeholder="All"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">⛓️</span>
            <span className="text-sm text-gray-400 font-inter">Chain</span>
            <Dropdown
              value={selectedNetwork}
              onChange={setSelectedNetwork}
              options={networkOptions}
              placeholder="All"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">📄</span>
            <span className="text-sm text-gray-400 font-inter">Type</span>
            <Dropdown
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categoryOptions}
              placeholder="All Types"
            />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        {transactions.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-400 font-inter">No transactions found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="text-left p-4 text-sm font-inter text-gray-400">
                  Hash
                </th>
                <th className="text-left p-4 text-sm font-inter text-gray-400">
                  From → To
                </th>
                <th className="text-left p-4 text-sm font-inter text-gray-400">
                  Asset
                </th>
                <th className="text-left p-4 text-sm font-inter text-gray-400">
                  Amount
                </th>
                <th className="text-left p-4 text-sm font-inter text-gray-400">
                  Type
                </th>
                <th className="text-left p-4 text-sm font-inter text-gray-400">
                  Date
                </th>
                <th className="text-left p-4 text-sm font-inter text-gray-400">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr
                  key={`${tx.uniqueId}-${index}`}
                  className="border-t border-kyro-border hover:bg-gray-900/30 transition-colors"
                >
                  {/* Hash */}
                  <td className="p-4">
                    <span className="font-mono text-sm text-kyro-text">
                      {truncateHash(tx.hash)}
                    </span>
                  </td>

                  {/* From → To */}
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs text-gray-400">
                        {truncateAddress(tx.from)}
                      </span>
                      <span className="text-gray-500">→</span>
                      <span className="font-mono text-xs text-gray-400">
                        {truncateAddress(tx.to)}
                      </span>
                      {tx.direction === "sent" ? (
                        <ArrowUpRight className="w-3 h-3 text-red-400" />
                      ) : (
                        <ArrowDownLeft className="w-3 h-3 text-green-400" />
                      )}
                    </div>
                  </td>

                  {/* Asset */}
                  <td className="p-4">
                    <span className="font-medium text-kyro-text font-inter">
                      {tx.asset}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="p-4">
                    <span
                      className={`font-mono text-sm ${
                        tx.direction === "sent"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {tx.direction === "sent" ? "-" : "+"}
                      {formatAmount(tx.amount)}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                        tx.category
                      )}`}
                    >
                      {tx.category}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="p-4">
                    <span className="text-sm text-gray-400 font-inter">
                      {formatDate(tx.timestamp)}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="p-4">
                    <button
                      onClick={() =>
                        window.open(
                          `https://etherscan.io/tx/${tx.hash}`,
                          "_blank"
                        )
                      }
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
