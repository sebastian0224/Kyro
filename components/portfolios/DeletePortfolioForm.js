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

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await deletePortfolioHandler(formData);
      router.back();
    } catch (error) {
      console.error("Error deleting portfolio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <input type="hidden" name="id" value={id || ""} />

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
