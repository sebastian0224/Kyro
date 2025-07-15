"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPortfolioHandler } from "@/lib/actions/form-actions";
import { validateWalletAddress } from "@/lib/moralis/validateWallet";

export default function CreatePortfolioForm() {
  const router = useRouter();
  const [wallets, setWallets] = useState([]);
  const [inputWallet, setInputWallet] = useState("");
  const [walletError, setWalletError] = useState("");

  async function handleAddWallet() {
    setWalletError(""); // limpiar errores anteriores

    const result = await validateWalletAddress(inputWallet, wallets);

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
    try {
      await createPortfolioHandler(formData);
      router.back();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "1rem" }}>
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
