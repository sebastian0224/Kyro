"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ModalPortfolio({ title, description, children }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(true);
  const isClosingRef = useRef(false);

  const handleClose = () => {
    if (isClosingRef.current) return;

    isClosingRef.current = true;
    setIsOpen(false);

    setTimeout(() => {
      router.back();
    }, 150);
  };

  useEffect(() => {
    if (isClosingRef.current) return;

    // Si la ruta cambió a /portfolios, cerrar el modal
    if (pathname === "/portfolios") {
      setIsOpen(false);
      return;
    }

    // ✅ FIX: Detectar si estamos en cualquier ruta de modal
    const isModalRoute =
      pathname.includes("/edit") ||
      pathname.includes("/delete") ||
      pathname.includes("/create");

    // Si estamos en una ruta de modal y tiene portfolioId (para edit/delete)
    if (isModalRoute && !isOpen) {
      // Para create no necesita portfolioId, para edit/delete sí
      const needsPortfolioId =
        pathname.includes("/edit") || pathname.includes("/delete");

      if (!needsPortfolioId || params?.portfolioId) {
        setIsOpen(true);
      }
    }
  }, [pathname, params?.portfolioId, isOpen]);

  useEffect(() => {
    isClosingRef.current = false;
  }, [params?.portfolioId]);

  useEffect(() => {
    // Si no hay portfolioId cuando se necesita (rutas edit/delete), cerrar modal
    const needsPortfolioId =
      pathname.includes("/edit") || pathname.includes("/delete");

    if (needsPortfolioId && !params?.portfolioId && isOpen) {
      handleClose();
    }
  }, [params?.portfolioId, pathname, isOpen]);

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
