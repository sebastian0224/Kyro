"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Wallet, AlertCircle } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { calculateWalletContributions } from "@/lib/alchemy/portfolio";

export const description =
  "A horizontal bar chart showing wallet contributions";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-[300px]">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-muted rounded-full"></div>
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-medium">Loading wallets...</p>
          <p className="text-xs text-muted-foreground">
            Calculating wallet contributions
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WalletContributionChart({ portfolioId }) {
  const [chartData, setChartData] = useState([]);
  const [chartConfig, setChartConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const { chartData, chartConfig } = await calculateWalletContributions(
          portfolioId
        );

        // Adapt chartData to the format expected by the chart
        const formattedData = chartData.map((w) => ({
          wallet: w.wallet, // maintains compatibility with YAxis
          $: w.value,
          fill: w.fill,
        }));

        // Calculate total value
        const total = formattedData.reduce((sum, item) => sum + item.$, 0);

        setChartData(formattedData);
        setChartConfig(chartConfig);
        setTotalValue(total);
      } catch (err) {
        console.error("Error loading wallet contributions:", err);
        setError("Failed to load wallet contributions");
      } finally {
        setLoading(false);
      }
    }

    if (portfolioId) {
      fetchData();
    }
  }, [portfolioId]);

  // Calculate percentage for top contributor
  const getTopContributorPercentage = () => {
    if (chartData.length === 0 || totalValue === 0) return 0;
    const topValue = Math.max(...chartData.map((item) => item.$));
    return ((topValue / totalValue) * 100).toFixed(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Contributions</CardTitle>
        <CardDescription>
          {loading
            ? "Loading contribution data..."
            : `Value distribution across ${chartData.length} wallet${
                chartData.length !== 1 ? "s" : ""
              }`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="flex items-center justify-center h-[300px]">
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
        ) : chartData.length === 0 ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
                <Wallet className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">No wallets found</p>
                <p className="text-xs text-muted-foreground">
                  Add wallets to your portfolio to see contributions
                </p>
              </div>
            </div>
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 0,
              }}
            >
              <YAxis
                dataKey="wallet"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => chartConfig[value]?.label || value}
              />
              <XAxis dataKey="$" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="$" layout="vertical" radius={5} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      {!loading && !error && chartData.length > 0 && (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Top contributor: {getTopContributorPercentage()}% of portfolio
            <TrendingUp className="h-4 w-4" />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
