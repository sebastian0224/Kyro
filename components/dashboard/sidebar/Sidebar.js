"use client";
import { usePathname } from "next/navigation";
import { BarChart3, Briefcase, CreditCard, Home, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import SidebarContent from "./SidebarContent";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  portfolioId,
  userId,
}) {
  const pathname = usePathname();
  const menuItems = [
    {
      name: "Overview",
      href: `/portfolios/${portfolioId}`,
      icon: Home,
    },
    {
      name: "Analytics",
      href: `/portfolios/${portfolioId}/analytics`,
      icon: BarChart3,
    },
    {
      name: "Assets",
      href: `/portfolios/${portfolioId}/assets`,
      icon: Briefcase,
    },
    {
      name: "Transactions",
      href: `/portfolios/${portfolioId}/transactions`,
      icon: CreditCard,
    },
  ];
  const handleLinkClick = () => {
    // Close sidebar on mobile when clicking a link
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-kyro-sidebar border-r border-kyro-border flex-col z-30">
        <SidebarContent
          menuItems={menuItems}
          pathname={pathname}
          onLinkClick={handleLinkClick}
          portfolioId={portfolioId}
          userId={userId}
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-kyro-sidebar border-r border-kyro-border flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <SidebarContent
          menuItems={menuItems}
          pathname={pathname}
          onLinkClick={handleLinkClick}
          isMobile={true}
          portfolioId={portfolioId}
          userId={userId}
        />
      </div>
    </>
  );
}
