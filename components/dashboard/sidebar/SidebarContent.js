import { UserButton } from "@clerk/nextjs";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Briefcase } from "lucide-react";
import LogoSection from "./LogoSection";
import PortfolioValueCard from "./PortfolioValueCard";

export default function SidebarContent({
  menuItems,
  pathname,
  onLinkClick,
  isMobile = false,
  wallets,
}) {
  return (
    <>
      {/* Logo Section */}
      {/* <LogoSection isMobile={isMobile} /> */}
      <div>
        {/* <PortfolioValueCard portfolioName="My Portfolio 1" wallets={wallets} /> */}
      </div>

      {/* Manage Portfolio Button */}
      <div className="p-4">
        <Link href="/portfolios">
          <Button
            className="w-full bg-kyro-blue hover:bg-kyro-blue-hover text-white font-space-grotesk font-medium transition-colors"
            size="sm"
          >
            <Briefcase />
            Manage Portfolios
          </Button>
        </Link>
      </div>

      <Separator className="bg-kyro-border" />

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={onLinkClick}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors font-inter ${
                    isActive
                      ? "bg-kyro-blue text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-kyro-border">
        <div className="flex items-center space-x-3">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
              },
            }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-kyro-text truncate">
              Account
            </p>
            <p className="text-xs text-gray-400 truncate">Manage settings</p>
          </div>
        </div>
      </div>
    </>
  );
}
