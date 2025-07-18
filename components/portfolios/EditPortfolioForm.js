// EditPortfolioForm.js
// This component allows editing an existing portfolio, including its name and associated wallet addresses.

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePortfolioHandler } from "@/lib/actions/form-actions";
import { validateWalletAddress } from "@/lib/moralis/validateWallet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

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
  const [wallets, setWallets] = useState(
    (initialWallets ?? []).map((w) => (typeof w === "string" ? w : w.address))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidatingWallet, setIsValidatingWallet] = useState(false);

  const MAX_WALLETS_PER_PORTFOLIO = 20;

  async function handleAddWallet() {
    if (!inputWallet.trim()) return;

    setWalletError("");
    setIsValidatingWallet(true);

    if (wallets.length >= MAX_WALLETS_PER_PORTFOLIO) {
      setWalletError(
        `Solo puedes agregar hasta ${MAX_WALLETS_PER_PORTFOLIO} wallets en un portfolio.`
      );
      setIsValidatingWallet(false);
      return;
    }

    try {
      const result = await validateWalletAddress(inputWallet, wallets);

      if (!result.success) {
        setWalletError(result.error);
        setIsValidatingWallet(false);
        return;
      }

      setWallets([...wallets, result.address]);
      setInputWallet("");
    } catch (error) {
      setWalletError("Error al validar la wallet. Intenta de nuevo.");
    } finally {
      setIsValidatingWallet(false);
    }
  }

  function handleRemoveWallet(walletAddress) {
    setWallets(wallets.filter((addr) => addr !== walletAddress));
  }

  async function handleSubmit(formData) {
    setFormError("");
    setIsSubmitting(true);
    try {
      const result = await updatePortfolioHandler(formData);
      if (result && result.error) {
        setFormError(result.error);
        setIsSubmitting(false);
        return;
      }
      router.push("/portfolios");
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error(err);
      }
      setFormError(
        "Ocurrió un error inesperado. Intenta de nuevo o contacta soporte."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Error Alert */}
      {formError && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 font-inter">
            {formError}
          </AlertDescription>
        </Alert>
      )}

      <form action={handleSubmit} className="space-y-4">
        <input type="hidden" name="id" value={id} />

        {/* Portfolio Name */}
        <div className="space-y-2">
          <label className="font-inter text-sm font-medium text-white">
            Portfolio Name
          </label>
          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="font-inter bg-gray-800 border-gray-700 text-white h-10 focus:border-blue-500"
          />
        </div>

        {/* Add Wallets Section */}
        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="font-inter text-sm font-medium text-white">
              Add Wallets
            </h3>
            <p className="font-inter text-xs text-gray-400">
              Add up to {MAX_WALLETS_PER_PORTFOLIO} wallets in the supported
              address formats
            </p>
          </div>

          {/* Existing Wallets List */}
          {wallets.length > 0 && (
            <div className="max-h-32 overflow-y-auto space-y-1 pr-1">
              {wallets.map((wallet) => {
                const address =
                  typeof wallet === "string" ? wallet : wallet.address;
                return (
                  <div
                    key={address}
                    className="group flex items-center p-2 rounded bg-gray-800 border border-gray-700 hover:bg-gray-750 cursor-pointer"
                    onClick={() => handleRemoveWallet(address)}
                    title="Click to remove"
                  >
                    <span className="font-mono text-xs text-gray-300 flex-1 truncate">
                      {address}
                    </span>
                    <span className="text-xs text-gray-500 group-hover:text-red-400 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Remove
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add Wallet Input */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Enter a wallet address"
                  value={inputWallet}
                  onChange={(e) => setInputWallet(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddWallet();
                    }
                  }}
                  disabled={isValidatingWallet}
                  className="font-mono bg-gray-800 border-gray-700 text-white h-10 focus:border-green-500 text-sm"
                />
                {isValidatingWallet && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="h-3 w-3 animate-spin text-gray-400" />
                  </div>
                )}
              </div>
              <Button
                type="button"
                onClick={handleAddWallet}
                disabled={isValidatingWallet || !inputWallet.trim()}
                className="font-inter bg-green-600 hover:bg-green-700 text-white h-10 px-4 text-sm"
              >
                Add
              </Button>
            </div>
            {walletError && (
              <p className="font-inter text-xs text-red-400">{walletError}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="flex-1 font-inter border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 h-10 text-sm"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 font-inter font-medium bg-green-600 hover:bg-green-700 text-white h-10 text-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>

        {/* Hidden inputs for form submission */}
        {wallets.map((wallet, index) => (
          <input key={index} type="hidden" name="wallets" value={wallet} />
        ))}
      </form>
    </div>
  );
}
