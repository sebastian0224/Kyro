"use client";

import { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import TopBar from "./topbar/TopBar";

export default function DashboardLayout({ children, portfolioId, wallets }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-kyro-bg text-kyro-text font-inter">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          portfolioId={portfolioId}
          wallets={wallets}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
          {/* Top Bar */}
          <TopBar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            portfolioId={portfolioId}
          />

          {/* Page Content */}
          <main className="flex-1 p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
