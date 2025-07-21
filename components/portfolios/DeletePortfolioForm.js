// DeletePortfolioForm.js
// This component handles the deletion of a portfolio. It shows a warning and asks for confirmation before deleting.

"use client";
import { deletePortfolioHandler } from "@/lib/actions/form-actions";
import { useActionState } from "react";
import FormButtons from "./FormButtons";
import { useRouter } from "next/navigation";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, AlertCircle } from "lucide-react";

const initialState = {
  error: null,
};

export default function DeletePortfolioForm({ id }) {
  const router = useRouter();
  const [state, formAction] = useActionState(
    deletePortfolioHandler,
    initialState
  );

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {state.error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 font-inter">
            {state.error}
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

      <form action={formAction}>
        <input type="hidden" name="id" value={id || ""} />
        <FormButtons router={router} mode="delete" />
      </form>
    </div>
  );
}
