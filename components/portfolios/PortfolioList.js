import { readPortfolios } from "@/lib/portfolios";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Edit3,
  Trash2,
  ExternalLink,
  Folder,
  Calendar,
  Plus,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

export default async function PortfolioList() {
  const { userId } = await auth();
  const portfolios = await readPortfolios(userId);

  if (portfolios.length === 0) {
    return (
      <Card className="bg-kyro-sidebar border-kyro-border">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-4 bg-kyro-blue/10 rounded-full mb-4">
            <Folder className="h-8 w-8 text-kyro-blue" />
          </div>
          <CardTitle className="text-xl font-space-grotesk text-kyro-text mb-2">
            No portfolios yet
          </CardTitle>
          <CardDescription className="text-muted-foreground font-inter mb-6 max-w-md">
            Create your first portfolio to start showcasing your projects and
            professional skills.
          </CardDescription>
          <Button
            asChild
            className="bg-kyro-blue hover:bg-kyro-blue-hover text-white font-inter"
          >
            <Link href="/portfolios/create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create My First Portfolio
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-space-grotesk font-semibold text-kyro-text">
            My Portfolios
          </h2>
          <p className="text-sm text-muted-foreground font-inter">
            {portfolios.length}{" "}
            {portfolios.length === 1 ? "portfolio" : "portfolios"} found
          </p>
        </div>
        <Badge
          variant="secondary"
          className="bg-kyro-blue/10 text-kyro-blue border-kyro-blue/20"
        >
          {portfolios.length} Total
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <Card
            key={portfolio.id}
            className="bg-kyro-sidebar border-kyro-border hover:border-kyro-blue/30 transition-all duration-200 group"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-kyro-blue/10 rounded-lg group-hover:bg-kyro-blue/20 transition-colors">
                    <Briefcase className="h-4 w-4 text-kyro-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg font-space-grotesk text-kyro-text truncate">
                      {portfolio.name}
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground font-inter flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3" />
                      Created recently
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>

            <Separator className="bg-kyro-border" />

            <CardContent className="pt-4">
              <div className="space-y-4">
                {/* Portfolio Preview Link */}
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start text-kyro-text hover:bg-kyro-blue/10 hover:text-kyro-blue font-inter"
                >
                  <Link
                    href={`/portfolios/${portfolio.id}`}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Portfolio
                  </Link>
                </Button>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1 border-kyro-border hover:bg-kyro-blue/10 hover:border-kyro-blue/30 text-kyro-text font-inter"
                  >
                    <Link
                      href={`/portfolios/@modals/edit?id=${
                        portfolio.id
                      }&name=${encodeURIComponent(portfolio.name)}`}
                      className="flex items-center gap-2"
                    >
                      <Edit3 className="h-3 w-3" />
                      Edit
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1 border-red-800/30 hover:bg-red-900/10 hover:border-red-700/50 text-red-400 hover:text-red-300 font-inter"
                  >
                    <Link
                      href={`/portfolios/@modals/delete?id=${portfolio.id}`}
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
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
