"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPortfolioHandler } from "@/lib/actions/form-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Briefcase } from "lucide-react";

export default function CreatePortfolioModal() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    router.back();
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await createPortfolioHandler(formData);
      router.back();
      router.refresh();
    } catch (error) {
      console.error("Error creating portfolio:", error);
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
              <div className="p-2 bg-kyro-blue/10 rounded-lg">
                <Plus className="h-5 w-5 text-kyro-blue" />
              </div>
              <div>
                <DialogTitle className="text-xl font-space-grotesk text-kyro-text">
                  Create New Portfolio
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground font-inter">
                  Create a new portfolio to showcase your projects
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Separator className="bg-kyro-border" />

        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label
              htmlFor="name"
              className="text-sm font-inter font-medium text-kyro-text"
            >
              Portfolio Name
            </Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                placeholder="e.g. Professional Portfolio 2024"
                required
                className="pl-10 bg-kyro-bg border-kyro-border text-kyro-text placeholder:text-muted-foreground focus:border-kyro-blue focus:ring-kyro-blue/20 font-inter"
                disabled={isSubmitting}
              />
            </div>
            <p className="text-xs text-muted-foreground font-inter">
              Choose a descriptive name for your portfolio
            </p>
          </div>

          <Separator className="bg-kyro-border" />

          <div className="flex gap-3 pt-2">
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
              className="flex-1 bg-kyro-blue hover:bg-kyro-blue-hover text-white font-inter font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Portfolio
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
