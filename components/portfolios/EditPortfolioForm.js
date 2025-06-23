"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { updatePortfolioHandler } from "@/lib/actions/form-actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Briefcase } from "lucide-react";

export default function EditPortfolioForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await updatePortfolioHandler(formData);
      router.back();
    } catch (error) {
      console.error("Error updating portfolio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <input type="hidden" name="id" value={id || ""} />

      <div className="space-y-3">
        <Label htmlFor="name">Portfolio Name</Label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="name"
            name="name"
            defaultValue={name || ""}
            placeholder="Portfolio name"
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
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
