"use client";

import { useState, useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";

export default function DashboardLayout({ children, portfolioId, userId }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when route changes (for mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [portfolioId]);

  return (
    <div className="min-h-screen text-kyro-text font-inter">
      <div className="flex min-h-screen">
        {/* Sidebar Component */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          portfolioId={portfolioId}
          userId={userId}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-h-screen lg:ml-64">
          {/* Content Container with proper spacing */}
          <div className="flex-1 p-4 pt-16 lg:pt-4 lg:p-6">
            <div className="max-w-7xl mx-auto w-full">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
