"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export default function ModalPortfolio({ title, description, children }) {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl w-[90vw] bg-gray-900 border-gray-700">
        <DialogHeader className="space-y-3">
          <DialogTitle className="font-space-grotesk text-xl text-white">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="font-inter text-gray-400">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <Separator style={{ backgroundColor: "var(--border)" }} />

        <div className="py-4 space-y-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
