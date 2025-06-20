import PortfolioList from "@/components/portfolios/PortfolioList";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Briefcase } from "lucide-react";
import Link from "next/link";

export default async function PortfoliosPage() {
  return (
    <div className="min-h-screen bg-kyro-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-kyro-blue/10 rounded-lg">
              <Briefcase className="h-6 w-6 text-kyro-blue" />
            </div>
            <div>
              <h1 className="text-3xl font-space-grotesk font-bold text-kyro-text">
                Portfolios
              </h1>
              <p className="text-muted-foreground font-inter">
                Manage and organize all your professional projects
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground font-inter">
              Create, edit and share your professional portfolios
            </div>
            <Button
              asChild
              className="bg-kyro-blue hover:bg-kyro-blue-hover text-white font-inter font-medium"
            >
              <Link
                href="/portfolios/create"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                New Portfolio
              </Link>
            </Button>
          </div>
        </div>

        <Separator className="bg-kyro-border" />

        {/* Portfolio List Section */}
        <div className="space-y-6">
          <PortfolioList />
        </div>
      </div>
    </div>
  );
}
