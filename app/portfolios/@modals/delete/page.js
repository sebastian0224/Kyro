"use client";
import { deletePortfolioHandler } from "@/lib/actions/form-actions";
import { useSearchParams } from "next/navigation";

export default function DeleteModal() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return (
    <>
      <form action={deletePortfolioHandler}>
        <input type="hidden" name="id" value={id} />
        <button type="submit">Eliminar</button>
      </form>
    </>
  );
}
//cuando vayamos a hacer el ui tenemos que hacer un componente aprte para que solo quede como use client la logica, bueno eso tienes que investigarlo mas
