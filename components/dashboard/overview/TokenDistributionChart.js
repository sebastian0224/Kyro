"use client";

import { Pie, PieChart } from "recharts";
import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import { calculatePortfolioTokenDistribution } from "@/lib/alchemy/tokens";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Calendar } from "lucide-react";

export default function TokenDistributionChart({ portfolioId }) {
  const [chartData, setChartData] = useState([]);
  const [chartConfig, setChartConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokenData = async () => {
      setLoading(true);
      setError(null);

      try {
        const tokens = await calculatePortfolioTokenDistribution(portfolioId);

        const newChartData = tokens.map((t) => ({
          token: t.token,
          value: t.value,
          fill: t.fill,
        }));

        const newChartConfig = {
          value: { label: "%" },
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

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Token Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {loading ? (
          <LoadingSpinner message="Loading token distribution..." />
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[300px] space-y-2">
            <p className="text-red-500 text-sm font-medium">{error}</p>
            <p className="text-xs text-muted-foreground">
              Please try again later.
            </p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] space-y-2">
            <Calendar className="h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No tokens available</p>
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}
