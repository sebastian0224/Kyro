"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Briefcase, ChevronDown } from "lucide-react";
import Link from "next/link";

import { readPortfolios } from "@/lib/db/portfolios";

export default function PortfolioSelectorSection({
  currentPortfolioId,
  userId,
}) {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState([]);
  const [selected, setSelected] = useState(currentPortfolioId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const portfolios = await readPortfolios(userId);
        setPortfolios(portfolios);
      } catch (err) {
        console.error("Error cargando portfolios:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPortfolios();
    }
  }, [userId]);

  const handleSelect = (id) => {
    setSelected(id);
    router.push(`/portfolios/${id}`);
  };

  if (loading) {
    return (
      <div className="p-4 space-y-3 border-b border-kyro-border">
        <div className="h-10 bg-gray-700/50 rounded-lg animate-pulse"></div>
        <div className="h-9 bg-gray-700/50 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3 border-b border-kyro-border">
      {/* Portfolio Selector */}
      <Select value={selected} onValueChange={handleSelect}>
        <SelectTrigger className="w-full h-10 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 text-white transition-all duration-200 focus:ring-2 focus:ring-kyro-blue focus:border-transparent">
          <SelectValue placeholder="Select portfolio" className="text-sm" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700 text-white min-w-[240px]">
          {portfolios.map((p) => (
            <SelectItem
              key={p.id}
              value={p.id}
              className="focus:bg-gray-700 focus:text-white cursor-pointer"
            >
              <div className="flex items-center space-x-2 py-1">
                <div className="w-2 h-2 bg-kyro-blue rounded-full flex-shrink-0"></div>
                <span className="truncate">{p.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Manage Portfolios Button - Matching styles */}
      <Link href="/portfolios" className="block">
        <Button
          className="w-full h-9 bg-gray-800/50 hover:bg-kyro-blue hover:border-kyro-blue border border-gray-700 text-gray-300 hover:text-white font-medium transition-all duration-200 focus:ring-2 focus:ring-kyro-blue focus:border-transparent"
          variant="outline"
        >
          <Briefcase className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="truncate">Manage Portfolios</span>
        </Button>
      </Link>
    </div>
  );
}
