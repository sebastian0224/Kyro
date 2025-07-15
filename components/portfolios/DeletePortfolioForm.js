"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { deletePortfolioHandler } from "@/lib/actions/form-actions";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle } from "lucide-react";

export default function DeletePortfolioForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setFormError("");
    try {
      const result = await deletePortfolioHandler(formData);
      if (result && result.error) {
        setFormError(result.error);
        setIsSubmitting(false);
        return;
      }
      router.back();
    } catch (error) {
      setFormError(
        error?.message || "Ocurrió un error inesperado. Intenta de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* TODO: Mostrar spinner o feedback visual con V0 cuando isSubmitting sea true */}
      <input type="hidden" name="id" value={id || ""} />

      {formError && (
        <div style={{ color: "#f55", marginBottom: "1rem", fontWeight: 500 }}>
          {formError}
        </div>
      )}

      <div className="space-y-4 text-sm text-red-300">
        <AlertTriangle className="inline mr-2" />
        Are you sure? This will delete everything in this portfolio.
      </div>

      <Separator className="bg-kyro-border" />

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          variant="destructive"
          disabled={isSubmitting}
          className="flex-1 bg-red-900 text-white"
        >
          {isSubmitting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </form>
  );
}
