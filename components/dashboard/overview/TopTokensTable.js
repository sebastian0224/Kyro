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
          <p className="text-red-500 text-center">{error}</p>
        ) : tokens.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[200px] space-y-2">
            <Calendar className="h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No tokens available</p>
          </div>
        ) : (
          <>
            {/* Tabla en pantallas grandes */}
            <div className="hidden lg:block overflow-x-auto">
              <Table className="min-w-[600px]">
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
                    <TableRow key={index}>
                      <TableCell>{token.symbol}</TableCell>
                      <TableCell className="text-right">
                        {token.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${token.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${token.value.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary">{token.percentage}%</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {/* Cards en mobile + tablet + portátiles chicos */}
            <div className="lg:hidden space-y-4">
              {tokens.map((token, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg bg-card space-y-2"
                >
                  <h4 className="font-semibold">{token.symbol}</h4>
                  <p className="text-sm text-gray-400">
                    Amount: {token.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400">
                    Price: ${token.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400">
                    Value: ${token.value.toFixed(2)}
                  </p>
                  <p className="font-medium">
                    % Portfolio: {token.percentage}%
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
