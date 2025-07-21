"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ShowToastOnError() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("error") === "not-authorized") {
        toast.error(
          "You are not authorized to access this portfolio or it does not exist."
        );
        // Limpiar el error de la URL para que no se repita
        params.delete("error");
        const newUrl =
          window.location.pathname + (params.toString() ? `?${params}` : "");
        window.history.replaceState({}, "", newUrl);
      }
    }
  }, [mounted]);
  return null;
}
