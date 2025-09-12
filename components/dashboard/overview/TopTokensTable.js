"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getTopTokens } from "@/lib/alchemy/tokens";

export default function TopTokensTable({ portfolioId }) {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTokens() {
      if (!portfolioId) return;

      setLoading(true);
      setError(null);

      try {
        const tokensData = await getTopTokens(portfolioId);
        setTokens(tokensData);
      } catch (err) {
        setError("Failed to load tokens data");
        console.error("Error loading tokens:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTokens();
  }, [portfolioId]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="text-muted-foreground">Cargando tokens...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="text-destructive">{error}</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (tokens.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="text-muted-foreground">
              No se encontraron tokens en este portfolio
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">% Portfolio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokens.map((token, index) => (
              <TableRow key={`${token.symbol}-${index}`}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="text-xs text-muted-foreground">
                        {token.symbol}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {token.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  $
                  {token.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="text-right font-medium">
                  $
                  {token.value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary">{token.percentage}%</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
