"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Briefcase,
  CreditCard,
  Home,
  Plus,
  TrendingUp,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      name: "Assets",
      href: "/dashboard/assets",
      icon: Briefcase,
    },
    {
      name: "Transactions",
      href: "/dashboard/transactions",
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
        />
      </div>
    </>
  );
};

// Componente reutilizable para el contenido del sidebar
const SidebarContent = ({
  menuItems,
  pathname,
  onLinkClick,
  isMobile = false,
}) => {
  return (
    <>
      {/* Logo Section */}
      <div
        className={`p-6 border-b border-kyro-border ${isMobile ? "pt-2" : ""}`}
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-kyro-blue rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-space-grotesk font-bold text-kyro-text">
            KYRO
          </h1>
        </div>
      </div>

      {/* Create Portfolio Button */}
      <div className="p-4">
        <Button
          className="w-full bg-kyro-blue hover:bg-kyro-blue-hover text-white font-space-grotesk font-medium transition-colors"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Portfolio
        </Button>
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
            afterSignOutUrl="/"
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
};

export default Sidebar;
