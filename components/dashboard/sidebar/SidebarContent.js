"use client";

import { UserButton } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import PortfolioHeaderCard from "./PortfolioHeaderCard";
import PortfolioSelectorSection from "./PortfolioSelectorSection";

export default function SidebarContent({
  menuItems,
  pathname,
  onLinkClick,
  portfolioId,
  userId,
  isMobile = false,
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Portfolio Header */}
      <div className="flex-shrink-0">
        <PortfolioHeaderCard portfolioId={portfolioId} userId={userId} />
      </div>

      {/* Portfolio Selector */}
      <div className="flex-shrink-0">
        <PortfolioSelectorSection
          userId={userId}
          currentPortfolioId={portfolioId}
        />
      </div>

      <Separator className="bg-kyro-border flex-shrink-0" />

      {/* Navigation Menu - Scrollable */}
      <nav className="flex-1 overflow-y-auto">
        <div className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={onLinkClick}
                    className={`group flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium ${
                      isActive
                        ? "bg-kyro-blue text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-800/60 hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-gray-300"
                      }`}
                    />
                    <span className="truncate text-sm">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* User Section - Fixed at bottom */}
      <div className="flex-shrink-0 p-4 border-t border-kyro-border bg-kyro-sidebar">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-8 h-8 ring-2 ring-gray-700 hover:ring-gray-600 transition-all",
                },
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Account</p>
            <p className="text-xs text-gray-400 truncate">Manage settings</p>
          </div>
        </div>
      </div>
    </div>
  );
}
