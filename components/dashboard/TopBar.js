"use client";

import { Bell, Menu, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const TopBar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="h-16 bg-kyro-sidebar border-b border-kyro-border flex items-center justify-between px-4 lg:px-6">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <Menu className="w-5 h-5" />
        </Button>

        <h2 className="text-lg font-space-grotesk font-semibold text-kyro-text">
          Dashboard
        </h2>
      </div>

      {/* Right side - Action buttons */}
      <div className="flex items-center space-x-2 lg:space-x-3">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <Search className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <Bell className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};

export default TopBar;
