"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPortfolioHandler } from "@/lib/actions/form-actions";
import { validateWalletAddress } from "@/lib/moralis/walletsUtils";
import { useActionState } from "react";
import FormButtons from "./FormButtons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

const initialState = {
  error: null,
  nameError: null,
  walletError: null,
};

export default function CreatePortfolioForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(
    createPortfolioHandler,
    initialState
  );

  // Local state only for wallets (this is still valid)
  const [wallets, setWallets] = useState([]);
  const [inputWallet, setInputWallet] = useState("");
  const [walletError, setWalletError] = useState("");
  const [isValidatingWallet, setIsValidatingWallet] = useState(false);

  const MAX_WALLETS_PER_PORTFOLIO = 20;

  async function handleAddWallet() {
    if (!inputWallet.trim()) return;

    setWalletError("");
    setIsValidatingWallet(true);

    if (wallets.length >= MAX_WALLETS_PER_PORTFOLIO) {
      setWalletError(
        `You can only add up to ${MAX_WALLETS_PER_PORTFOLIO} wallets in a portfolio.`
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
      setWalletError("Error validating wallet. Please try again.");
    } finally {
      setIsValidatingWallet(false);
    }
  }

  function handleRemoveWallet(wallet) {
    setWallets(wallets.filter((w) => w !== wallet));
  }

  return (
    <div className="space-y-4">
      {/* Error Alert */}
      {state.error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 font-inter">
            {state.error}
          </AlertDescription>
        </Alert>
      )}

      <form action={formAction} className="space-y-4">
        {/* Portfolio Name */}
        <div className="space-y-2">
          <label className="font-inter text-sm font-medium text-white">
            Portfolio Name
          </label>
          <Input
            name="name"
            placeholder="Enter portfolio name"
            className="font-inter bg-gray-800 border-gray-700 text-white h-10 focus:border-blue-500"
          />
          {state.nameError && (
            <p className="text-xs text-red-400">{state.nameError}</p>
          )}
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
              {wallets.map((wallet) => (
                <div
                  key={wallet}
                  className="group flex items-center p-2 rounded bg-gray-800 border border-gray-700 hover:bg-gray-750 cursor-pointer"
                  onClick={() => handleRemoveWallet(wallet)}
                  title="Click to remove"
                >
                  <span className="font-mono text-xs text-gray-300 flex-1 truncate">
                    {wallet}
                  </span>
                  <span className="text-xs text-gray-500 group-hover:text-red-400 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Remove
                  </span>
                </div>
              ))}
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

            {state.walletError && (
              <p className="font-inter text-xs text-red-400">
                {state.walletError}
              </p>
            )}
          </div>
        </div>

        {/* Components Form Buttons */}
        <FormButtons router={router} mode="create" />

        {/* Hidden inputs for form submission */}
        {wallets.map((wallet, index) => (
          <input key={index} type="hidden" name="wallets" value={wallet} />
        ))}
      </form>
    </div>
  );
}
