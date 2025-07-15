// DeletePortfolioForm.js
// This component handles the deletion of a portfolio. It shows a warning and asks for confirmation before deleting.

"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { deletePortfolioHandler } from "@/lib/actions/form-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Trash2, Loader2, AlertCircle } from "lucide-react";

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
    <div className="max-w-2xl mx-auto space-y-6 px-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-red-500/10">
          <Trash2 className="h-6 w-6 text-red-400" />
        </div>
        <div>
          <h1 className="font-space-grotesk text-2xl font-bold text-white">
            Eliminar Portfolio
          </h1>
          <p className="font-inter text-gray-400">
            Esta acción no se puede deshacer
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {formError && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 font-inter">
            {formError}
          </AlertDescription>
        </Alert>
      )}

      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="font-space-grotesk text-lg flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Confirmar Eliminación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-red-200 bg-red-50/50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="font-inter text-white">
              <strong>¿Estás seguro?</strong> Esta acción eliminará
              permanentemente este portfolio y toda su configuración. No podrás
              recuperar esta información.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <p className="font-inter text-sm text-gray-400">Se eliminará:</p>
            <ul className="font-inter text-sm space-y-1 text-gray-400">
              <li>• Configuración del portfolio</li>
              <li>• Todas las wallets asociadas</li>
              <li>• Historial y datos relacionados</li>
            </ul>
          </div>

          <Separator style={{ backgroundColor: "var(--border)" }} />

          <form action={handleSubmit} className="space-y-4">
            <input type="hidden" name="id" value={id || ""} />

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1 font-inter border-gray-600 text-gray-300 hover:text-white"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-inter font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Eliminando...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar Portfolio
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
