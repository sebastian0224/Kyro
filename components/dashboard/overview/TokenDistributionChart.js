"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartData = [
  { token: "BTC", value: 45, fill: "var(--chart-1)" },
  { token: "ETH", value: 25, fill: "var(--chart-2)" },
  { token: "SOL", value: 15, fill: "var(--chart-3)" },
  { token: "USDC", value: 8, fill: "var(--chart-4)" },
  { token: "AVAX", value: 4, fill: "var(--chart-5)" },
  { token: "Otros", value: 3, fill: "var(--muted-foreground)" },
];

const chartConfig = {
  value: {
    label: "Porcentaje",
  },
  BTC: {
    label: "Bitcoin",
    color: "hsl(var(--chart-1))",
  },
  ETH: {
    label: "Ethereum",
    color: "hsl(var(--chart-2))",
  },
  SOL: {
    label: "Solana",
    color: "hsl(var(--chart-3))",
  },
  USDC: {
    label: "USD Coin",
    color: "hsl(var(--chart-4))",
  },
  AVAX: {
    label: "Avalanche",
    color: "hsl(var(--chart-5))",
  },
  Otros: {
    label: "Otros",
    color: "hsl(var(--muted-foreground))",
  },
};

export default function TokenDistributionChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribución de Tokens</CardTitle>
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
