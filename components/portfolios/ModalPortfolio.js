"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ModalPortfolio({ title, description, children }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    router.push("/portfolios");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md w-[90vw] max-h-[80vh] bg-gray-900 border-gray-700 p-0">
        <DialogHeader className="flex flex-col items-start gap-1 p-4 pb-0">
          <DialogTitle className="font-space-grotesk text-lg font-medium text-white">
            {title}
          </DialogTitle>
          {description && (
            <p className="text-sm text-gray-400 font-inter mt-1">
              {description}
            </p>
          )}
        </DialogHeader>
        <div className="px-4 pb-4 overflow-y-auto">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
