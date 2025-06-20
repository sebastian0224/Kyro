"use client";
import { updatePortfolioHandler } from "@/lib/actions/form-actions";
import { useSearchParams } from "next/navigation";

export default function EditModal() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  return (
    <>
      <form action={updatePortfolioHandler}>
        <input type="hidden" name="id" value={id} />
        <input name="name" defaultValue={name} required />
        <button type="submit">guardar</button>
      </form>
    </>
  );
}
