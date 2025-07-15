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
  const [wallets, setWallets] = useState(initialWallets ?? []);

  async function handleAddWallet() {
    setWalletError("");

    const walletStrings = wallets.map((w) =>
      typeof w === "string" ? w : w.address
    );
    const result = await validateWalletAddress(inputWallet, walletStrings);

    if (!result.success) {
      setWalletError(result.error);
      return;
    }

    setWallets([...wallets, result.address]);
    setInputWallet("");
  }

  function handleRemoveWallet(walletAddress) {
    setWallets(
      wallets.filter((w) => {
        const addr = typeof w === "string" ? w : w.address;
        return addr !== walletAddress;
      })
    );
  }

  async function handleSubmit(formData) {
    try {
      await updatePortfolioHandler(formData);
      router.back();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "1rem" }}>
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
          <input
            key={index}
            type="hidden"
            name="wallets"
            value={typeof wallet === "string" ? wallet : wallet.address}
          />
        ))}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
