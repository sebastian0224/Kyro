import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function FormButtons({ router, mode = "create" }) {
  const { pending } = useFormStatus();

  const labels = {
    create: {
      confirm: "Create Portfolio",
      loading: "Creating...",
    },
    edit: {
      confirm: "Save Changes",
      loading: "Saving...",
    },
    delete: {
      confirm: "Delete Portfolio",
      loading: "Deleting...",
    },
  };

  const { confirm, loading } = labels[mode] || labels.create;

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
        className={`flex-1 h-10 ${
          mode === "delete"
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        {pending ? (
          <>
            <Loader2 className="h-3 w-3 animate-spin mr-1" />
            {loading}
          </>
        ) : (
          confirm
        )}
      </Button>
    </div>
  );
}
