// portfolios/page.js
// This is the main page for portfolios. It displays the list of portfolios for the current user.

export const dynamic = "force-dynamic";

import PortfolioList from "@/components/portfolios/PortfolioList";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Briefcase } from "lucide-react";
import Link from "next/link";

export default async function PortfoliosPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "var(--accent)", opacity: 0.1 }}
              >
                <Briefcase
                  className="h-8 w-8"
                  style={{ color: "var(--accent)" }}
                />
              </div>
              <div>
                <h1 className="font-space-grotesk text-4xl font-bold text-white">
                  Portfolios
                </h1>
                <p className="font-inter text-lg text-gray-400">
                  Gestiona y organiza todos tus proyectos profesionales
                </p>
              </div>
            </div>
          </div>

          <Button
            asChild
            className="font-inter font-medium px-6 py-3 h-auto"
            style={{
              backgroundColor: "var(--accent)",
              color: "white",
              borderRadius: "var(--radius)",
            }}
          >
            <Link href="/portfolios/create" className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Nuevo Portfolio
            </Link>
          </Button>
        </div>
      </div>

      <Separator style={{ backgroundColor: "var(--border)" }} />

      {/* Portfolio List Section */}
      <div className="space-y-6">
        <PortfolioList />
      </div>
    </div>
  );
}
