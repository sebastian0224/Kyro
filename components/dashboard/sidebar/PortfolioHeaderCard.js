"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getPortfolioNameAndNetWorth } from "@/lib/alchemy/portfolio";

export default function PortfolioHeaderCard({ portfolioId, userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const result = await getPortfolioNameAndNetWorth(portfolioId, userId);
        setData(result);
      } catch (err) {
        console.error("Error cargando portfolio:", err);
        setData({ name: "Error", netWorth: 0 });
      } finally {
        setLoading(false);
      }
    };

    if (portfolioId && userId) {
      fetchPortfolioData();
    }
  }, [portfolioId, userId]);

  const formatValue = (value) => {
    if (!value) return "$0";
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="p-6 border-b border-kyro-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Kyro Logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-lg shadow-md bg-white object-contain"
              priority
            />
          </div>
          <div className="flex-1">
            <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-24"></div>
            <div className="h-5 bg-gray-700 rounded animate-pulse w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 border-b border-kyro-border">
      <div className="flex items-center space-x-3">
        {/* Logo */}
        <div className="w-10 h-10 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Kyro Logo"
            width={40}
            height={40}
            className="w-10 h-10 rounded-lg shadow-md bg-white object-contain"
            priority
          />
        </div>

        {/* Portfolio info */}
        <div className="flex-1 min-w-0">
          <div className="text-white text-sm font-medium truncate">
            {data?.name || "Sin nombre"}
          </div>
          <div className="text-lg font-bold text-white">
            {formatValue(data?.netWorth)}
          </div>
        </div>
      </div>
    </div>
  );
}
