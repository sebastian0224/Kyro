import PortfolioList from "@/components/portfolios/PortfolioList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function PortfoliosPage() {
  return (
    <div>
      <h1>Portafolios</h1>
      <Button>
        <Link href="/portfolios/create">nuevo portfolio</Link>
      </Button>

      <PortfolioList />
    </div>
  );
}
