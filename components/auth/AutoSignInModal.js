"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

export default function AutoSignInModal() {
  const searchParams = useSearchParams();
  const { openSignIn } = useClerk();

  useEffect(() => {
    const redirectUrl = searchParams.get("redirect_url");

    if (redirectUrl) {
      console.log("Redireccionando al modal de inicio de sesión...");
      openSignIn({ redirectUrl });
    }
  }, [searchParams, openSignIn]);

  return null;
}
