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
      <DialogContent className="bg-kyro-sidebar border-kyro-border max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Separator className="bg-kyro-border" />

        {children}
      </DialogContent>
    </Dialog>
  );
}
