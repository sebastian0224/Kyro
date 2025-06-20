"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { deletePortfolioHandler } from "@/lib/actions/form-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function DeletePortfolioModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    router.back();
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await deletePortfolioHandler(formData);
      router.back();
      router.refresh();
    } catch (error) {
      console.error("Error deleting portfolio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="bg-kyro-sidebar border-kyro-border max-w-md">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-900/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <DialogTitle className="text-xl font-space-grotesk text-kyro-text">
                  Delete Portfolio
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground font-inter">
                  This action cannot be undone
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Separator className="bg-kyro-border" />

        <div className="space-y-4">
          <Alert className="border-red-800/30 bg-red-900/10">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-300 font-inter text-sm">
              <strong>Are you sure?</strong> This action will permanently delete
              your portfolio and all associated data. You wont be able to
              recover this information.
            </AlertDescription>
          </Alert>
        </div>

        <Separator className="bg-kyro-border" />

        <form action={handleSubmit} className="space-y-4">
          <input type="hidden" name="id" value={id || ""} />

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-kyro-border text-muted-foreground hover:bg-kyro-bg hover:text-kyro-text font-inter"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              className="flex-1 bg-red-900 hover:bg-red-800 text-red-100 font-inter font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-100 border-t-transparent" />
                  Deleting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete Portfolio
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
