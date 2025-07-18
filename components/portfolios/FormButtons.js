import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { useFormStatus } from "react-dom";

export default function FormButtons({ router }) {
  const { pending } = useFormStatus(); // Saber si el form está enviando

  return (
    <div className="flex gap-2 pt-2">
      <Button
        type="button"
        variant="outline"
        onClick={() => router.back()}
        className="flex-1 h-10"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={pending}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white h-10"
      >
        {pending ? (
          <>
            <Loader2 className="h-3 w-3 animate-spin mr-1" />
            Creating...
          </>
        ) : (
          "Create Portfolio"
        )}
      </Button>
    </div>
  );
}
