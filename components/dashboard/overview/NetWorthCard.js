"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NetWorthCard() {
  // TODO: Replace mockData with real portfolio data
  const mockData = {
    totalNetWorth: 125420.5,
    walletContributions: [
      {
        name: "Main Wallet",
        percentage: 65,
        value: 81523.33,
        color: "bg-teal-500",
      },
      {
        name: "Trading Wallet",
        percentage: 25,
        value: 31355.13,
        color: "bg-blue-500",
      },
      {
        name: "DeFi Wallet",
        percentage: 10,
        value: 12542.05,
        color: "bg-amber-500",
      },
    ],
  };

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
            {mockData.totalNetWorth.toLocaleString("en-US", {
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
            {mockData.walletContributions.map((wallet, i) => (
              <div
                key={i}
                className={`${wallet.color} h-full`}
                style={{ width: `${wallet.percentage}%` }}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-xs mt-2">
            {mockData.walletContributions.map((wallet, i) => (
              <div
                key={i}
                className="flex items-center space-x-1 text-muted-foreground"
              >
                <span className={`w-3 h-3 rounded-full ${wallet.color}`} />
                <span>{wallet.name}</span>
                <span className="text-foreground font-medium">
                  {wallet.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
