"use server";

import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import { initMoralis } from "./moralis";

export async function validateWallet(address, chain = "eth") {
  try {
    await initMoralis();

    const chainId = {
      eth: EvmChain.ETHEREUM,
      polygon: EvmChain.POLYGON,
      bsc: EvmChain.BSC,
      arbitrum: EvmChain.ARBITRUM,
      optimism: EvmChain.OPTIMISM,
    }[chain];

    const result = await Moralis.EvmApi.balance.getNativeBalance({
      address,
      chain: chainId,
    });

    return !!result.raw.balance;
  } catch (error) {
    console.error("Wallet no válida o API error:", error.message);
    return false;
  }
}
