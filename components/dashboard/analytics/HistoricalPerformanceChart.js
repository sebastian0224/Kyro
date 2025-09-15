"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useState, useEffect } from "react";
import { TrendingUp, Calendar } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { calculatePortfolioHistoricalPerformance } from "@/lib/alchemy/portfolio";

export const description =
  "An interactive area chart showing portfolio performance over time";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-[250px]">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-muted rounded-full"></div>
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-medium">Loading performance data...</p>
          <p className="text-xs text-muted-foreground">
            Analyzing historical portfolio values
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HistoricalPerformanceChart({ portfolioId, userId }) {
  const [timeRange, setTimeRange] = useState("90d");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [portfolioName, setPortfolioName] = useState("Portfolio");

  const chartConfig = {
    [portfolioName]: {
      label: "$",
      color: "var(--chart-1)",
    },
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const end = new Date();
        let daysToSubtract = 90;
        if (timeRange === "30d") daysToSubtract = 30;
        if (timeRange === "7d") daysToSubtract = 7;

        const start = new Date();
        start.setDate(end.getDate() - daysToSubtract);

        const data = await calculatePortfolioHistoricalPerformance(
          portfolioId,
          userId,
          start.toISOString(),
          end.toISOString()
        );

        if (data.length > 0) {
          const keyName = Object.keys(data[0]).find((k) => k !== "date");
          setPortfolioName(keyName || "Portfolio");
        }

        setChartData(data);
      } catch (err) {
        console.error("Error loading chart data:", err);
        setChartData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [portfolioId, userId, timeRange]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const end = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    if (timeRange === "7d") daysToSubtract = 7;
    const startDate = new Date(end);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  const finalData = loading ? [] : filteredData;

  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case "7d":
        return "last 7 days";
      case "30d":
        return "last 30 days";
      case "90d":
        return "last 3 months";
      default:
        return "selected period";
    }
  };

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Portfolio Performance</CardTitle>
          <CardDescription>Historical value tracking over time</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {loading ? (
          <LoadingSpinner />
        ) : finalData.length === 0 ? (
          <div className="flex items-center justify-center h-[250px]">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  No performance data available
                </p>
                <p className="text-xs text-muted-foreground">
                  Historical data for the {getTimeRangeLabel()} is not available
                </p>
              </div>
            </div>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={finalData}>
              <defs>
                <linearGradient id="fillPortfolio" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-portfolio)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-portfolio)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey={portfolioName}
                type="natural"
                fill="url(#fillPortfolio)"
                stroke="var(--color-portfolio)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
