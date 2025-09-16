export const dynamic = "force-dynamic";

import PortfolioList from "@/components/portfolios/PortfolioList";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Briefcase } from "lucide-react";
import Link from "next/link";
import ShowToastOnError from "@/components/ShowToastOnError";

export default function PortfoliosPage() {
  return (
    <>
      <ShowToastOnError />
      <div className="max-w-6xl mx-auto space-y-8 px-4">
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: "var(--accent)", opacity: 0.1 }}
                >
                  <Briefcase className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="font-space-grotesk text-3xl md:text-4xl font-bold text-white">
                    Portfolios
                  </h1>
                  <p className="font-inter text-base md:text-lg text-gray-400">
                    Manage and organize all your professional projects
                  </p>
                </div>
              </div>
            </div>

            <div className="flex md:block">
              <Button
                asChild
                className="font-inter font-medium px-6 py-3 h-auto w-full md:w-auto"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "white",
                  borderRadius: "var(--radius)",
                }}
              >
                <Link
                  href="/portfolios/create"
                  className="flex items-center justify-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  New Portfolio
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator style={{ backgroundColor: "var(--border)" }} />

        {/* Portfolio List Section */}
        <div className="space-y-6">
          <PortfolioList />
        </div>
      </div>
    </>
  );
}
