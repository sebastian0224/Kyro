import { createPortfolioHandler } from "@/lib/actions/form-actions";

export default function CreateModal() {
  return (
    <>
      <form action={createPortfolioHandler}>
        <input name="name" placeholder="Nombre del portafolio" required />
        <button type="submit">Crear</button>
      </form>
    </>
  );
}
