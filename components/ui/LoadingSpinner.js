"use client";

import { Loader2 } from "lucide-react";

export default function LoadingSpinner({
  message = "Loading data...",
  subMessage,
}) {
  return (
    <div className="flex items-center justify-center h-[250px]">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-foreground">{message}</p>
          {subMessage && (
            <p className="text-xs text-muted-foreground">{subMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
