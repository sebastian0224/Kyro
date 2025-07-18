// DeletePortfolioForm.js
// This component handles the deletion of a portfolio. It shows a warning and asks for confirmation before deleting.

"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { deletePortfolioHandler } from "@/lib/actions/form-actions";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Loader2, AlertCircle } from "lucide-react";

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
      router.push("/portfolios");
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
      setFormError(
        "Ocurrió un error inesperado. Intenta de nuevo o contacta soporte."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {formError && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 font-inter">
            {formError}
          </AlertDescription>
        </Alert>
      )}

      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-red-400" />
        </div>

        <div className="space-y-2">
          <h3 className="font-inter text-sm font-medium text-white">
            Are you sure?
          </h3>
          <p className="font-inter text-xs text-gray-400">
            This action will permanently delete this portfolio and all its
            configuration. You won't be able to recover this information.
          </p>
        </div>
      </div>

      <form action={handleSubmit}>
        <input type="hidden" name="id" value={id || ""} />

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/portfolios")}
            className="flex-1 font-inter border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 h-12"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-inter font-medium h-12"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              "Delete Portfolio"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
