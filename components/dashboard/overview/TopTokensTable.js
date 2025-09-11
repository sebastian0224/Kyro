"use client";

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

export default function TopTokensTable() {
  // TODO: Replace mockTokens with real data from your portfolio API
  const mockTokens = [
    {
      id: 1,
      symbol: "BTC",
      name: "Bitcoin",
      logo: "/bitcoin-logo.png",
      amount: 2.5432,
      price: 43250.0,
      value: 109987.5,
      percentage: 45.2,
    },
    {
      id: 2,
      symbol: "ETH",
      name: "Ethereum",
      logo: "/ethereum-logo.png",
      amount: 15.8934,
      price: 2850.75,
      value: 45321.89,
      percentage: 18.6,
    },
    {
      id: 3,
      symbol: "SOL",
      name: "Solana",
      logo: "/solana-logo.png",
      amount: 245.67,
      price: 98.45,
      value: 24186.32,
      percentage: 9.9,
    },
  ];

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
            {mockTokens.map((token) => (
              <TableRow key={token.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      src={token.logo || "/placeholder.svg"}
                      alt={token.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{token.name}</div>
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
