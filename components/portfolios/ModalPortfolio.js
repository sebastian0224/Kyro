"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter, usePathname, useParams } from "next/navigation";

export default function ModalPortfolio({ title, description, children }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(true);
  const isClosingRef = useRef(false); // Flag para evitar conflictos

  const handleClose = () => {
    if (isClosingRef.current) return; // Prevenir múltiples cierres

    isClosingRef.current = true;
    setIsOpen(false);

    setTimeout(() => {
      router.back();
    }, 150);
  };

  // Efecto principal para manejar el estado del modal
  useEffect(() => {
    // Si estamos cerrando, no hacer nada más
    if (isClosingRef.current) return;

    // Si la ruta cambió a /portfolios, cerrar el modal
    if (pathname === "/portfolios") {
      setIsOpen(false);
      return;
    }

    // Si estamos en una ruta de edición y el modal está cerrado, abrirlo
    if (pathname.includes("/edit") && params?.portfolioId && !isOpen) {
      setIsOpen(true);
    }
  }, [pathname, params?.portfolioId, isOpen]);

  // Reset del flag cuando el componente se remonta
  useEffect(() => {
    isClosingRef.current = false;
  }, [params?.portfolioId]);

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
