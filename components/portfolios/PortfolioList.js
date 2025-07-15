// PortfolioList.js
// This component displays the list of portfolios for the current user.

import { readPortfolios } from "@/lib/db/portfolios";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit3, Trash2, Wallet, Plus, FolderOpen } from "lucide-react";

export default async function PortfolioList() {
  const { userId } = await auth();
  const portfolios = await readPortfolios(userId);

  if (portfolios.length === 0) {
    return (
      <div className="text-center py-16">
        <div
          className="mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: "var(--accent)", opacity: 0.1 }}
        >
          <FolderOpen
            className="h-12 w-12"
            style={{ color: "var(--accent)" }}
          />
        </div>
        <h3 className="font-space-grotesk text-xl font-semibold mb-2 text-white">
          No tienes portfolios aún
        </h3>
        <p className="font-inter mb-6 text-gray-400">
          Crea tu primer portfolio para comenzar a gestionar tus inversiones
        </p>
        <Button
          asChild
          className="font-inter font-medium"
          style={{
            backgroundColor: "var(--accent)",
            color: "white",
          }}
        >
          <Link href="/portfolios/create" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Crear Portfolio
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-space-grotesk text-2xl font-semibold text-white">
            Mis Portfolios
          </h2>
          <Badge
            variant="secondary"
            className="font-inter"
            style={{
              backgroundColor: "var(--accent)",
              color: "white",
              opacity: 0.8,
            }}
          >
            {portfolios.length}
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {portfolios.map((portfolio) => (
          <Card
            key={portfolio.id}
            className="group hover:shadow-lg transition-all duration-200 border bg-gray-900 border-gray-700"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                {/* Información del Portfolio */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: "var(--accent)", opacity: 0.1 }}
                    >
                      <Wallet
                        className="h-6 w-6"
                        style={{ color: "var(--accent)" }}
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="font-space-grotesk text-xl text-white mb-2">
                        {portfolio.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mb-3">
                        <Wallet className="h-4 w-4 text-gray-400" />
                        <span className="font-inter text-sm text-gray-400">
                          {portfolio.wallets?.length || 0} wallets conectadas
                        </span>
                      </div>

                      {/* Lista de wallets */}
                      {portfolio.wallets && portfolio.wallets.length > 0 && (
                        <div className="space-y-2">
                          <p className="font-inter text-xs font-medium text-gray-400">
                            WALLETS CONECTADAS
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {portfolio.wallets.slice(0, 4).map((wallet) => (
                              <div
                                key={wallet.id}
                                className="font-mono text-xs px-3 py-1 rounded-full bg-gray-800 border border-gray-600 text-gray-300"
                              >
                                {wallet.address.slice(0, 6)}...
                                {wallet.address.slice(-4)}
                              </div>
                            ))}
                            {portfolio.wallets.length > 4 && (
                              <div className="font-mono text-xs px-3 py-1 rounded-full bg-gray-700 border border-gray-600 text-gray-300">
                                +{portfolio.wallets.length - 4} más
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    asChild
                    size="sm"
                    className="font-inter bg-blue-600 hover:bg-blue-700 text-white border-0"
                  >
                    <Link
                      href={`/portfolios/${portfolio.id}`}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Ver
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="sm"
                    className="font-inter bg-gray-700 hover:bg-gray-600 text-white border-0"
                  >
                    <Link
                      href={`/portfolios/edit?id=${portfolio.id}`}
                      className="flex items-center gap-2"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="font-inter text-red-400 hover:text-red-300 bg-transparent"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <Link
                      href={`/portfolios/delete?id=${portfolio.id}`}
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
