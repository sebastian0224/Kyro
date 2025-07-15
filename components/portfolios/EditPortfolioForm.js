"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePortfolioHandler } from "@/lib/actions/form-actions";
import { validateWalletAddress } from "@/lib/moralis/validateWallet";

export default function EditPortfolioForm({
  id,
  name: initialName,
  wallets: initialWallets,
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [inputWallet, setInputWallet] = useState("");
  const [walletError, setWalletError] = useState("");
  const [formError, setFormError] = useState("");
  // Siempre convertir a strings
  const [wallets, setWallets] = useState(
    (initialWallets ?? []).map((w) => (typeof w === "string" ? w : w.address))
  );

  const MAX_WALLETS_PER_PORTFOLIO = 20; // TODO: Reemplazar por lógica de planes cuando se implemente el sistema de pagos

  async function handleAddWallet() {
    setWalletError("");
    if (wallets.length >= MAX_WALLETS_PER_PORTFOLIO) {
      setWalletError(
        `Solo puedes agregar hasta ${MAX_WALLETS_PER_PORTFOLIO} wallets en un portfolio.`
      );
      return;
    }
    // Siempre usar solo strings
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

  function handleRemoveWallet(walletAddress) {
    setWallets(wallets.filter((addr) => addr !== walletAddress));
  }

  async function handleSubmit(formData) {
    setFormError("");
    try {
      const result = await updatePortfolioHandler(formData);
      if (result && result.error) {
        setFormError(result.error);
        return;
      }
      router.back();
    } catch (err) {
      setFormError(
        err?.message || "Ocurrió un error inesperado. Intenta de nuevo."
      );
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "1rem" }}>
      {formError && (
        <div style={{ color: "#f55", marginBottom: "1rem", fontWeight: 500 }}>
          {formError}
        </div>
      )}
      <h1 style={{ marginBottom: "1rem" }}>Edit your portfolio</h1>
      <form action={handleSubmit}>
        <input type="hidden" name="id" value={id} />

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: 4 }}>
            Portfolio Name
          </label>
          <input
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label style={{ display: "block", marginBottom: 4 }}>Wallets</label>
          <ul style={{ marginBottom: "0.5rem" }}>
            {wallets.map((wallet) => {
              const address =
                typeof wallet === "string" ? wallet : wallet.address;
              return (
                <li key={address} style={{ marginBottom: "0.3rem" }}>
                  {address}
                  <button
                    type="button"
                    onClick={() => handleRemoveWallet(address)}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>

          <input
            placeholder="Add wallet"
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

        {wallets.map((wallet, index) => (
          <input key={index} type="hidden" name="wallets" value={wallet} />
        ))}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
