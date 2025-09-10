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
import { Briefcase } from "lucide-react";
import Link from "next/link";

import { readPortfolios } from "@/lib/db/portfolios";

export default function PortfolioSelectorSection({
  currentPortfolioId,
  userId,
}) {
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const portfolios = await readPortfolios(userId);
        setPortfolios(portfolios);
      } catch (err) {
        console.error("Error cargando portfolios:", err);
      }
    };

    if (userId) {
      fetchPortfolios();
    }
  }, [userId]);

  const router = useRouter();
  const [portfolios, setPortfolios] = useState([]);
  const [selected, setSelected] = useState(currentPortfolioId);

  const handleSelect = (id) => {
    setSelected(id);
    router.push(`/portfolios/${id}`);
  };

  return (
    <div className="p-4 space-y-3 border-b border-kyro-border">
      {/* Dropdown */}
      <Select value={selected} onValueChange={handleSelect}>
        <SelectTrigger className="w-full bg-gray-800 text-white">
          <SelectValue placeholder="Select portfolio" />
        </SelectTrigger>
        <SelectContent>
          {portfolios.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Manage Portfolios Button */}
      <Link href="/portfolios">
        <Button
          className="w-full bg-kyro-blue hover:bg-kyro-blue-hover text-white font-space-grotesk font-medium transition-colors"
          size="sm"
        >
          <Briefcase className="mr-2 h-4 w-4" />
          Manage Portfolios
        </Button>
      </Link>
    </div>
  );
}
