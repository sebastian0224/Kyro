"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { getPortfolioAssets } from "@/lib/alchemy/tokens";
import DropDown from "./Dropdown";

// 🔹 Reusable loading spinner (igual que en HistoricalPerformanceChart)
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-32">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-10 h-10 border-4 border-muted rounded-full"></div>
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-medium">Loading asset data...</p>
          <p className="text-xs text-muted-foreground">
            Fetching tokens and balances
          </p>
        </div>
      </div>
    </div>
  );
}

// 🔹 Number formatter
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + "K";
  }
  return num.toFixed(2);
};

// 🔹 USD formatter
const formatUSD = (value) => {
  return `$${formatNumber(value)}`;
};

export default function AssetsClient({ portfolioId }) {
  const [assets, setAssets] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [availableWallets, setAvailableWallets] = useState([]);
  const [availableNetworks, setAvailableNetworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [selectedWallet, setSelectedWallet] = useState("all");
  const [selectedNetwork, setSelectedNetwork] = useState("all");

  // Load assets
  useEffect(() => {
    async function loadAssets() {
      try {
        setLoading(true);
        setError(null);

        const result = await getPortfolioAssets(
          portfolioId,
          selectedWallet === "all" ? null : selectedWallet,
          selectedNetwork === "all" ? null : selectedNetwork
        );

        setAssets(result.assets);
        setTotalValue(result.totalValue);
        setAvailableWallets(result.availableWallets);
        setAvailableNetworks(result.availableNetworks);
      } catch (err) {
        console.error("Error loading assets:", err);
        setError("Failed to load assets");
        setAssets([]);
      } finally {
        setLoading(false);
      }
    }

    if (portfolioId) {
      loadAssets();
    }
  }, [portfolioId, selectedWallet, selectedNetwork]);

  // Dropdown options
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

  return (
    <div className="bg-kyro-sidebar border border-kyro-border rounded-lg">
      {/* Header with filters */}
      <div className="p-6 border-b border-kyro-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-space-grotesk font-semibold text-kyro-text">
              Asset Portfolio
            </h3>
            <p className="text-gray-400 font-inter text-sm mt-1">
              Total Value: {formatUSD(totalValue)}
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">💼</span>
              <span className="text-sm text-gray-400 font-inter">Wallet</span>
              <DropDown
                value={selectedWallet}
                onChange={setSelectedWallet}
                options={walletOptions}
                placeholder="All"
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">⛓️</span>
              <span className="text-sm text-gray-400 font-inter">Chain</span>
              <DropDown
                value={selectedNetwork}
                onChange={setSelectedNetwork}
                options={networkOptions}
                placeholder="All"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-x-auto">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-red-400">{error}</p>
          </div>
        ) : assets.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">No assets available</p>
                <p className="text-xs text-muted-foreground">
                  Try adjusting your filters or connect a wallet
                </p>
              </div>
            </div>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="text-left p-4 text-sm font-inter text-gray-400">
                  Token
                </th>
                <th className="text-left p-4 text-sm font-inter text-gray-400">
                  Portfolio %
                </th>
                <th className="text-left p-4 text-sm font-inter text-gray-400">
                  Amount
                </th>
                <th className="text-left p-4 text-sm font-inter text-gray-400">
                  Price
                </th>
                <th className="text-left p-4 text-sm font-inter text-gray-400">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr
                  key={`${asset.symbol}-${index}`}
                  className="border-t border-kyro-border hover:bg-gray-900/30 transition-colors"
                >
                  {/* Token */}
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-semibold text-white">
                        {asset.symbol.slice(0, 2)}
                      </div>
                      <span className="font-medium text-kyro-text font-inter">
                        {asset.symbol}
                      </span>
                    </div>
                  </td>

                  {/* Portfolio % */}
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 max-w-[100px]">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.min(asset.percentage, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-inter text-kyro-text min-w-[50px]">
                        {asset.percentage.toFixed(2)}%
                      </span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="p-4">
                    <span className="text-kyro-text font-inter">
                      {formatNumber(asset.amount)}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="p-4">
                    <span className="text-kyro-text font-inter">
                      {formatUSD(asset.price)}
                    </span>
                  </td>

                  {/* Value */}
                  <td className="p-4">
                    <span className="text-kyro-text font-inter font-medium">
                      {formatUSD(asset.value)}
                    </span>
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
