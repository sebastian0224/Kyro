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

export default function TokenDistributionChart({ portfolioId }) {
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

        // Construimos chartData directo con el resultado
        const newChartData = tokens.map((t) => ({
          token: t.token,
          value: t.value,
          fill: t.fill,
        }));

        // Construimos chartConfig dinámico
        const newChartConfig = {
          value: { label: "Porcentaje" },
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
        setError("Error cargando distribución de tokens");
      } finally {
        setLoading(false);
      }
    };

    if (portfolioId) {
      fetchTokenData();
    }
  }, [portfolioId]);

  // Estado de carga
  if (loading) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Distribución de Tokens</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="flex items-center justify-center h-[300px]">
            <div className="text-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mx-auto"></div>
              <p className="text-sm text-muted-foreground">
                Cargando distribución...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Estado de error
  if (error) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Distribución de Tokens</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="flex items-center justify-center h-[300px]">
            <div className="text-center space-y-2">
              <div className="text-destructive text-sm">{error}</div>
              <button
                onClick={() => window.location.reload()}
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Estado sin datos
  if (chartData.length === 0) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Distribución de Tokens</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-sm text-muted-foreground">
              No hay tokens para mostrar
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Renderizado normal con datos
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
