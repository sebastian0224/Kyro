// CreatePortfolioForm.js
// This component handles the creation of a new portfolio, including adding wallet addresses before submission.
// The logic for validation and wallet management is already implemented.
//
// TODO (v0): Redesign the visual part using chadcn/ui components and Tailwind CSS utilities.
// - Keep the layout minimal and professional, inspired by the landing page (see /app/(landing) and /components/landing/).
// - Use the same color palette and fonts as the landing. You can check globals.css for reference.
// - You can change the HTML structure and classes, but do not change the logic or data flow.
// - All error messages, loading states, and feedback should be visually clear and consistent with the rest of the app.
//
// v0: Focus on the UI/UX. If you need to add new visual states, coordinate with the logic already present.

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPortfolioHandler } from "@/lib/actions/form-actions";
import { validateWalletAddress } from "@/lib/moralis/validateWallet";

export default function CreatePortfolioForm({ userPortfolioCount = 0 }) {
  const router = useRouter();
  const [wallets, setWallets] = useState([]);
  const [inputWallet, setInputWallet] = useState("");
  const [walletError, setWalletError] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_WALLETS_PER_PORTFOLIO = 20; // TODO: Reemplazar por lógica de planes cuando se implemente el sistema de pagos
  const MAX_PORTFOLIOS_PER_USER = 5; // TODO: Reemplazar por lógica de planes cuando se implemente el sistema de pagos

  async function handleAddWallet() {
    setWalletError("");

    if (wallets.length >= MAX_WALLETS_PER_PORTFOLIO) {
      setWalletError(
        `Solo puedes agregar hasta ${MAX_WALLETS_PER_PORTFOLIO} wallets en un portfolio.`
      );
      return;
    }

    // wallets ya es array de strings, pero lo dejamos explícito
    const walletStrings = wallets;
    // TODO: Optimizar para evitar llamadas repetidas a Moralis si la wallet ya fue validada en esta sesión
    const result = await validateWalletAddress(inputWallet, walletStrings);

    if (!result.success) {
      setWalletError(result.error);
      return;
    }

    setWallets([...wallets, result.address]);
    setInputWallet("");
  }

  function handleRemoveWallet(wallet) {
    setWallets(wallets.filter((w) => w !== wallet));
  }

  async function handleSubmit(formData) {
    setFormError("");
    setIsSubmitting(true);
    if (userPortfolioCount >= MAX_PORTFOLIOS_PER_USER) {
      alert(
        `Solo puedes tener hasta ${MAX_PORTFOLIOS_PER_USER} portfolios. Elimina uno para crear otro.`
      );
      setIsSubmitting(false);
      return;
    }
    try {
      const result = await createPortfolioHandler(formData);
      if (result && result.error) {
        setFormError(result.error);
        setIsSubmitting(false);
        return;
      }
      router.back();
    } catch (err) {
      setFormError(
        err?.message || "Ocurrió un error inesperado. Intenta de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "1rem" }}>
      {/* TODO: Mostrar spinner o feedback visual con V0 cuando isSubmitting sea true */}
      {formError && (
        <div style={{ color: "#f55", marginBottom: "1rem", fontWeight: 500 }}>
          {formError}
        </div>
      )}
      <h1 style={{ marginBottom: "1rem" }}>Create your portfolio</h1>
      <form action={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: 4 }}>
            Portfolio Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Enter portfolio name"
            required
            style={{
              color: "#fff",
              backgroundColor: "#222",
              padding: "0.5rem",
              width: "100%",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: 4 }}>
            Add Wallets
          </label>
          <ul style={{ marginBottom: "0.5rem" }}>
            {wallets.map((wallet) => (
              <li key={wallet} style={{ marginBottom: "0.3rem" }}>
                {wallet}
                <button
                  type="button"
                  onClick={() => handleRemoveWallet(wallet)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <input
            placeholder="Enter wallet address"
            value={inputWallet}
            onChange={(e) => setInputWallet(e.target.value)}
            style={{
              color: "#fff",
              backgroundColor: "#222",
              padding: "0.5rem",
              width: "100%",
              marginBottom: "0.3rem",
            }}
          />
          {walletError && (
            <p
              style={{
                color: "#f55",
                fontSize: "0.875rem",
                marginBottom: "0.5rem",
              }}
            >
              {walletError}
            </p>
          )}
          <button type="button" onClick={handleAddWallet}>
            Add Wallet
          </button>
        </div>

        {/* Wallets ocultas para enviar como FormData */}
        {wallets.map((wallet, index) => (
          <input key={index} type="hidden" name="wallets" value={wallet} />
        ))}

        <button type="submit">Create Portfolio</button>
      </form>
    </div>
  );
}
