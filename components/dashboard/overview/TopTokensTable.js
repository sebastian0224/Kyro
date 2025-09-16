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
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Calendar } from "lucide-react";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingSpinner message="Loading tokens data..." />
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[200px] space-y-2">
            <p className="text-red-500 text-sm font-medium">{error}</p>
            <p className="text-xs text-muted-foreground">
              Please try again later.
            </p>
          </div>
        ) : tokens.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[200px] space-y-2">
            <Calendar className="h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No tokens available</p>
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}
