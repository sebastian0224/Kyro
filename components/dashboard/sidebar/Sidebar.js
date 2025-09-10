"use client";

import { usePathname } from "next/navigation";
import { BarChart3, Briefcase, CreditCard, Home, X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

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
    // Close sidebar on mobile/tablet when clicking a link
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* Mobile Menu Button - Fixed position */}
      <Button
        className="fixed top-4 left-4 z-50 lg:hidden bg-kyro-sidebar border border-kyro-border text-gray-300 hover:text-white hover:bg-gray-800 shadow-lg"
        size="sm"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Desktop Sidebar - Fixed position */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-kyro-sidebar border-r border-kyro-border z-30 flex-col">
        <SidebarContent
          menuItems={menuItems}
          pathname={pathname}
          onLinkClick={handleLinkClick}
          portfolioId={portfolioId}
          userId={userId}
          isMobile={false}
        />
      </aside>

      {/* Mobile Sidebar - Slide in from left */}
      <aside
        className={`lg:hidden fixed left-0 top-0 h-full w-64 sm:w-72 bg-kyro-sidebar border-r border-kyro-border z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Header with Close Button */}
        <div className="flex justify-between items-center p-4 border-b border-kyro-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-1 h-8 w-8"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <SidebarContent
          menuItems={menuItems}
          pathname={pathname}
          onLinkClick={handleLinkClick}
          portfolioId={portfolioId}
          userId={userId}
          isMobile={true}
        />
      </aside>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
