"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPortfolioNetWorthData } from "@/lib/alchemy/portfolio";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Calendar } from "lucide-react";

export default function NetWorthCard({ portfolioId, userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getPortfolioNetWorthData(portfolioId, userId);
        setData(result);
      } catch (err) {
        console.error("Error loading portfolio net worth:", err);
        setError("Failed to load portfolio net worth");
      } finally {
        setLoading(false);
      }
    };

    if (portfolioId && userId) {
      fetchData();
    }
  }, [portfolioId, userId]);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">
          Net Worth
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {loading ? (
          <LoadingSpinner message="Loading net worth data..." />
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[150px] space-y-2">
            <p className="text-red-500 text-sm font-medium">{error}</p>
            <p className="text-muted-foreground text-xs">
              Please try again later.
            </p>
          </div>
        ) : !data ? (
          <div className="flex flex-col items-center justify-center h-[150px] space-y-2">
            <Calendar className="h-6 w-6 text-muted-foreground" />
            <p className="text-sm font-medium">No net worth data available</p>
          </div>
        ) : (
          <>
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
                      backgroundColor: wallet.color,
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
                      style={{ backgroundColor: wallet.color }}
                    />
                    {wallet.display} ({wallet.percentage.toFixed(2)}%)
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
