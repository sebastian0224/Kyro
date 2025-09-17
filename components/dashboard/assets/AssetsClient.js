"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { getPortfolioAssets } from "@/lib/alchemy/tokens";
import DropDown from "./Dropdown";

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
  if (num >= 1000) return (num / 1000).toFixed(2) + "K";
  return num.toFixed(2);
};
const formatUSD = (value) => `$${formatNumber(value)}`;

export default function AssetsClient({ portfolioId }) {
  const [assets, setAssets] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [availableWallets, setAvailableWallets] = useState([]);
  const [availableNetworks, setAvailableNetworks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedWallet, setSelectedWallet] = useState("all");
  const [selectedNetwork, setSelectedNetwork] = useState("all");

  useEffect(() => {
    async function loadAssets() {
      setLoading(true);
      const result = await getPortfolioAssets(
        portfolioId,
        selectedWallet === "all" ? null : selectedWallet,
        selectedNetwork === "all" ? null : selectedNetwork
      );
      setAssets(result.assets);
      setTotalValue(result.totalValue);
      setAvailableWallets(result.availableWallets);
      setAvailableNetworks(result.availableNetworks);
      setLoading(false);
    }
    if (portfolioId) loadAssets();
  }, [portfolioId, selectedWallet, selectedNetwork]);

  return (
    <div className="bg-kyro-sidebar border border-kyro-border rounded-lg">
      <div className="p-6 border-b border-kyro-border flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h3 className="font-space-grotesk font-semibold text-kyro-text">
            Asset Portfolio
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            Total Value: {formatUSD(totalValue)}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <DropDown
            value={selectedWallet}
            onChange={setSelectedWallet}
            options={[{ value: "all", display: "All" }, ...availableWallets]}
          />
          <DropDown
            value={selectedNetwork}
            onChange={setSelectedNetwork}
            options={[{ value: "all", display: "All" }, ...availableNetworks]}
          />
        </div>
      </div>

      {/* Tabla solo en pantallas grandes */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="p-4 text-left text-sm text-gray-400">Token</th>
              <th className="p-4 text-left text-sm text-gray-400">
                Portfolio %
              </th>
              <th className="p-4 text-left text-sm text-gray-400">Amount</th>
              <th className="p-4 text-left text-sm text-gray-400">Price</th>
              <th className="p-4 text-left text-sm text-gray-400">Value</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, i) => (
              <tr key={i} className="border-t border-kyro-border">
                <td className="p-4">{asset.symbol}</td>
                <td className="p-4">{asset.percentage.toFixed(2)}%</td>
                <td className="p-4">{formatNumber(asset.amount)}</td>
                <td className="p-4">{formatUSD(asset.price)}</td>
                <td className="p-4 font-medium">{formatUSD(asset.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards en mobile + tablet */}
      <div className="lg:hidden space-y-4 p-4">
        {assets.map((asset, i) => (
          <div key={i} className="p-4 border rounded-lg bg-card space-y-2">
            <h4 className="font-semibold">{asset.symbol}</h4>
            <p className="text-sm text-gray-400">
              Portfolio: {asset.percentage.toFixed(2)}%
            </p>
            <p className="text-sm text-gray-400">
              Amount: {formatNumber(asset.amount)}
            </p>
            <p className="text-sm text-gray-400">
              Price: {formatUSD(asset.price)}
            </p>
            <p className="font-medium">Value: {formatUSD(asset.value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
