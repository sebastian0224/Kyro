// EditPortfolioForm.js
// This component allows editing an existing portfolio, including its name and associated wallet addresses.

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePortfolioHandler } from "@/lib/actions/form-actions";
import { validateWalletAddress } from "@/lib/moralis/validateWallet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Plus,
  X,
  Wallet,
  AlertCircle,
  Loader2,
  Edit3,
  Save,
} from "lucide-react";

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
    <div className="max-w-2xl mx-auto space-y-6 px-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: "var(--accent)", opacity: 0.1 }}
        >
          <Edit3 className="h-6 w-6" style={{ color: "var(--accent)" }} />
        </div>
        <div>
          <h1 className="font-space-grotesk text-2xl font-bold text-white">
            Editar Portfolio
          </h1>
          <p className="font-inter text-gray-400">
            Modifica la configuración de tu portfolio
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {formError && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 font-inter">
            {formError}
          </AlertDescription>
        </Alert>
      )}

      <form action={handleSubmit} className="space-y-6">
        <input type="hidden" name="id" value={id} />

        {/* Portfolio Name */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="font-space-grotesk text-lg text-white">
              Información del Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="font-inter font-medium text-white"
              >
                Nombre del Portfolio
              </Label>
              <Input
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="font-inter bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Wallets Section */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="font-space-grotesk text-lg flex items-center gap-2 text-white">
              <Wallet className="h-5 w-5" />
              Wallets
              {wallets.length > 0 && (
                <Badge
                  variant="secondary"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "white",
                    opacity: 0.8,
                  }}
                >
                  {wallets.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Wallet Input */}
            <div className="space-y-2">
              <Label className="font-inter font-medium text-white">
                Agregar Nueva Wallet
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="0x... o dirección ENS"
                  value={inputWallet}
                  onChange={(e) => setInputWallet(e.target.value)}
                  className="font-mono font-inter bg-gray-800 border-gray-600 text-white"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddWallet();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddWallet}
                  disabled={isValidatingWallet || !inputWallet.trim()}
                  className="font-inter bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isValidatingWallet ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {walletError && (
                <p className="font-inter text-sm text-red-400">{walletError}</p>
              )}
            </div>

            {/* Wallets List */}
            {wallets.length > 0 && (
              <>
                <Separator style={{ backgroundColor: "var(--border)" }} />
                <div className="space-y-2">
                  <Label className="font-inter font-medium text-white">
                    Wallets Configuradas ({wallets.length}/
                    {MAX_WALLETS_PER_PORTFOLIO})
                  </Label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {wallets.map((wallet) => {
                      const address =
                        typeof wallet === "string" ? wallet : wallet.address;
                      return (
                        <div
                          key={address}
                          className="flex items-center justify-between p-3 rounded-lg border bg-gray-800 border-gray-600"
                        >
                          <span className="font-mono text-sm text-white">
                            {address.slice(0, 8)}...{address.slice(-6)}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveWallet(address)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Hidden inputs for form submission */}
            {wallets.map((wallet, index) => (
              <input key={index} type="hidden" name="wallets" value={wallet} />
            ))}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="flex-1 font-inter"
            style={{ borderColor: "var(--border)" }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 font-inter font-medium bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
