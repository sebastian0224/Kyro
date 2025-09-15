"use client";

import { Pie, PieChart } from "recharts";
import { useEffect, useState } from "react";
import { Coins, AlertCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import { calculatePortfolioTokenDistribution } from "@/lib/alchemy/tokens";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-[340px]">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-muted rounded-full"></div>
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-medium">Loading tokens...</p>
          <p className="text-xs text-muted-foreground">
            Calculating token distribution
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TokenAllocationChart({ portfolioId }) {
  const [chartData, setChartData] = useState([]);
  const [chartConfig, setChartConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        setLoading(true);
        setError(null);

        const tokens = await calculatePortfolioTokenDistribution(portfolioId);

        // Build chartData directly with the result
        const newChartData = tokens.map((t) => ({
          token: t.token,
          value: t.value,
          fill: t.fill,
        }));

        // Build dynamic chartConfig
        const newChartConfig = {
          value: { label: "Percentage" },
        };

        tokens.forEach((t) => {
          newChartConfig[t.token] = {
            label: t.token,
            color: t.fill.replace("var(", "hsl(var(").replace(")", "))"),
          };
        });

        setChartData(newChartData);
        setChartConfig(newChartConfig);
      } catch (err) {
        console.error("Error loading token distribution:", err);
        setError("Failed to load token distribution");
      } finally {
        setLoading(false);
      }
    };

    if (portfolioId) {
      fetchTokenData();
    }
  }, [portfolioId]);

  // Loading state
  if (loading) {
    return (
      <Card className="flex flex-col w-full h-fit">
        <CardHeader className="items-center pb-0">
          <CardTitle>Token Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <LoadingSpinner />
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="flex flex-col w-full h-fit">
        <CardHeader className="items-center pb-0">
          <CardTitle>Token Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="flex items-center justify-center h-[340px]">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-destructive">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-xs text-muted-foreground hover:text-foreground underline transition-colors"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // No data state
  if (chartData.length === 0) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Token Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="flex items-center justify-center h-[340px]">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
                <Coins className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">No tokens found</p>
                <p className="text-xs text-muted-foreground">
                  Add tokens to your portfolio to see distribution
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Normal rendering with data
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Token Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="value" />
            <ChartLegend
              content={<ChartLegendContent nameKey="token" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
