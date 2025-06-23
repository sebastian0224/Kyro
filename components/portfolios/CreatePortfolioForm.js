"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPortfolioHandler } from "@/lib/actions/form-actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Briefcase } from "lucide-react";

export default function CreatePortfolioForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await createPortfolioHandler(formData);
      router.back();
    } catch (error) {
      console.error("Error creating portfolio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="name">Portfolio Name</Label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="name"
            name="name"
            placeholder="e.g. Professional Portfolio 2024"
            required
            className="pl-10"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <Separator className="bg-kyro-border" />

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-kyro-blue text-white"
        >
          {isSubmitting ? "Creating..." : "Create Portfolio"}
        </Button>
      </div>
    </form>
  );
}
