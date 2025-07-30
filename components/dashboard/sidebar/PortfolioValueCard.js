import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { getPortfolioData } from "@/lib/moralis/portfolioUtils";

export default function PortfolioValueCard({
  portfolioName = "My Portfolio 1",
  wallets,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simular carga de datos (reemplaza esto con tu función real)
  useEffect(() => {
    const fetchData = async () => {
      const result = await getPortfolioData(wallets);
      if (result.success) {
        setLoading(false);
        setData({
          value: result.value,
          change: result.change,
          isPositive: result.isPositive,
        });
      }
    };

    if (wallets.length > 0) {
      fetchData();
    }
  }, [wallets]);

  const formatValue = (value) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  const formatChange = (change) => {
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 min-w-[200px]">
        <div className="flex items-center space-x-3">
          {/* Icono de carga */}
          <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center animate-pulse">
            <RefreshCw className="w-5 h-5 text-gray-500 animate-spin" />
          </div>

          <div className="flex-1">
            {/* Nombre del portfolio */}
            <div className="h-4 bg-gray-700 rounded animate-pulse mb-2"></div>
            {/* Valor */}
            <div className="h-5 bg-gray-700 rounded animate-pulse"></div>
          </div>

          {/* Botón de configuración */}
          <div className="w-6 h-6 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors min-w-[200px]">
      <div className="flex items-center space-x-3">
        {/* Icono del Portfolio (mismo estilo que tu imagen) */}
        <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded-sm opacity-90"></div>
        </div>

        <div className="flex-1 min-w-0">
          {/* Nombre del Portfolio */}
          <div className="text-white text-sm font-medium truncate">
            {portfolioName}
          </div>

          {/* Valor y Cambio */}
          <div className="flex items-center space-x-2">
            <span className="text-white font-semibold">
              {data ? data.value : "$0"}
            </span>

            {data && (
              <div
                className={`flex items-center space-x-1 text-xs ${
                  data.isPositive ? "text-green-400" : "text-red-400"
                }`}
              >
                {data.isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{formatChange(data.change)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
