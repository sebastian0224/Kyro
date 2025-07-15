// DeletePortfolioForm.js
// This component handles the deletion of a portfolio. It shows a warning and asks for confirmation before deleting.
// The logic for deletion and error handling is already implemented.
//
// TODO (v0): Redesign the visual part using chadcn/ui components and Tailwind CSS utilities.
// - Keep the layout minimal and professional, inspired by the landing page (see /app/(landing) and /components/landing/).
// - Use the same color palette and fonts as the landing. You can check globals.css for reference.
// - You can change the HTML structure and classes, but do not change the logic or data flow.
// - All error messages, loading states, and feedback should be visually clear and consistent with the rest of the app.
//
// v0: Focus on the UI/UX. If you need to add new visual states, coordinate with the logic already present.

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
