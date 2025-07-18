"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function ModalPortfolio({ title, description, children }) {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
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
