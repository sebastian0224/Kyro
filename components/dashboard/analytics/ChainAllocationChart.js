"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { LabelList, RadialBar, RadialBarChart } from "recharts";

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

import { calculatePortfolioNetworkDistribution } from "@/lib/alchemy/portfolio";

export const description = "A radial chart with network allocation";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-[280px]">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-muted rounded-full"></div>
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-medium">Loading networks...</p>
          <p className="text-xs text-muted-foreground">
            Analyzing blockchain distribution
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ChainAllocationChart({ portfolioId }) {
  const [chartData, setChartData] = useState([]);
  const [chartConfig, setChartConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await calculatePortfolioNetworkDistribution(portfolioId);

        // Build chartConfig dynamically
        const config = {
          value: { label: "Value" },
        };

        let total = 0;
        data.forEach((item, i) => {
          config[item.network] = {
            label: item.network,
            color: item.fill,
          };
          total += item.valueUSD;
        });

        setChartData(
          data.map((item) => ({
            network: item.network,
            value: item.valueUSD,
            fill: item.fill,
          }))
        );
        setChartConfig(config);
        setTotalValue(total);
      } catch (err) {
        console.error("Error loading network distribution:", err);
      } finally {
        setLoading(false);
      }
    }

    if (portfolioId) {
      fetchData();
    }
  }, [portfolioId]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Chain Allocation</CardTitle>
        <CardDescription>
          {loading
            ? "Loading distribution..."
            : "Portfolio distribution across blockchains"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {loading ? (
          <LoadingSpinner />
        ) : chartData.length === 0 ? (
          <div className="flex items-center justify-center h-[280px]">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
                <TrendingUp className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                No network data available
              </p>
            </div>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadialBarChart
              data={chartData}
              startAngle={-90}
              endAngle={380}
              innerRadius={30}
              outerRadius={110}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel nameKey="network" />}
              />
              <RadialBar dataKey="value" background>
                <LabelList
                  position="insideStart"
                  dataKey="network"
                  className="fill-white capitalize mix-blend-luminosity"
                  fontSize={11}
                />
              </RadialBar>
            </RadialBarChart>
          </ChartContainer>
        )}
      </CardContent>
      {!loading && chartData.length > 0 && (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Total Portfolio Value: ${totalValue.toLocaleString()}
          </div>
          <div className="leading-none text-muted-foreground">
            Distribution across {chartData.length} blockchain networks
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
