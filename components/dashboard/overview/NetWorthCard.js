"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPortfolioNetWorthData } from "@/lib/alchemy/portfolio";

export default function NetWorthCard({ portfolioId, userId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPortfolioNetWorthData(portfolioId, userId);
        setData(result);
      } catch (err) {
        console.error("Error loading portfolio net worth:", err);
      }
    };
    if (portfolioId && userId) fetchData();
  }, [portfolioId, userId]);

  if (!data) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">
            Net Worth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">
          Net Worth
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Total Net Worth Display */}
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground">
            $
            {data.totalNetWorth.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <p className="text-sm text-muted-foreground mt-1">USD</p>
        </div>

        {/* Wallet Contributions */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Wallet Contributions
          </h4>

          {/* Segmented Bar */}
          <div className="flex h-4 w-full overflow-hidden rounded-full border border-gray-700">
            {data.walletContributions.map((wallet, i) => (
              <div
                key={i}
                className="h-full"
                style={{
                  width: `${wallet.percentage}%`,
                  backgroundColor: wallet.color, // hex → ej: "#14b8a6"
                }}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-2 text-xs mt-2">
            {data.walletContributions.map((wallet, i) => (
              <Badge
                key={i}
                variant="outline"
                className="flex items-center gap-1"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: wallet.color }} // ✅ ahora inline style
                />
                {wallet.display} ({wallet.percentage.toFixed(2)}%)
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
