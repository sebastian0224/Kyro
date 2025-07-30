"use server";

/**
 * Gets the total net worth of a portfolio using Moralis Net Worth endpoint
 */
export async function getPortfolioValue(wallets) {
  if (!wallets || wallets.length === 0) {
    return { success: false, error: "No wallets provided" };
  }

  try {
    await initMoralis();

    let totalValue = 0;

    // Para cada wallet, obtener su valor
    for (const wallet of wallets) {
      const response = await Moralis.EvmApi.wallets.getWalletNetWorth({
        address: wallet.address,
        chains: [EvmChain.ETHEREUM], // Cambia si usas otra chain
        excludeSpam: true, // Ignora tokens spam
        excludeUnverifiedContracts: true, // Filter unverified contracts
      });

      const result = response.toJSON();
      const walletValue = parseFloat(result.total_networth_usd || "0");
      totalValue += walletValue;
    }

    return {
      success: true,
      value: totalValue,
    };
  } catch (error) {
    console.error("Error getting portfolio value:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Gets portfolio daily change using token balances with price data
 * Uses the correct getWalletTokenBalancesPrice endpoint under wallets
 */
export async function getPortfolioChange(wallets) {
  if (!wallets || wallets.length === 0) {
    return { success: false, error: "No wallets provided" };
  }
  try {
    await initMoralis();

    let totalCurrentValue = 0;
    let totalPreviousValue = 0;

    // Para cada wallet, obtener los precios actuales y de hace 24h
    for (const wallet of wallets) {
      // CAMBIO PRINCIPAL: Usar wallets.getWalletTokenBalancesPrice en lugar de token.getWalletTokenBalancesPrice
      const response = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice(
        {
          address: wallet.address,
          chain: EvmChain.ETHEREUM,
          excludeSpam: true,
          excludeUnverifiedContracts: true,
        }
      );

      const result = response.toJSON();
      // El resultado puede tener una estructura diferente, verificar si es un array directo o tiene una propiedad
      const tokens = result.result || result;

      for (const token of tokens) {
        if (token.usd_price && token.balance) {
          const balance =
            parseFloat(token.balance) / Math.pow(10, token.decimals);
          const currentPrice = parseFloat(token.usd_price);
          const currentValue = balance * currentPrice;

          // Calcular valor de hace 24h usando el porcentaje de cambio
          let previousValue = currentValue;
          if (token.usd_price_24hr_percent_change) {
            const changePercent = parseFloat(
              token.usd_price_24hr_percent_change
            );
            const previousPrice = currentPrice / (1 + changePercent / 100);
            previousValue = balance * previousPrice;
          }

          totalCurrentValue += currentValue;
          totalPreviousValue += previousValue;
        }
      }
    }

    // Calcular porcentaje de cambio
    const changePercent =
      totalPreviousValue > 0
        ? ((totalCurrentValue - totalPreviousValue) / totalPreviousValue) * 100
        : 0;

    return {
      success: true,
      change: changePercent,
      isPositive: changePercent >= 0,
    };
  } catch (error) {
    console.error("Error getting portfolio change:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Combined function to get both net worth and daily change in one call
 * More efficient when you need both values
 */
export async function getPortfolioData(wallets) {
  try {
    // Obtener ambos datos
    const [valueResult, changeResult] = await Promise.all([
      getPortfolioValue(wallets),
      getPortfolioChange(wallets),
    ]);

    return {
      success: true,
      value: valueResult.success ? valueResult.value : 0,
      change: changeResult.success ? changeResult.change : 0,
      isPositive: changeResult.success ? changeResult.isPositive : true,
    };
  } catch (error) {
    console.error("Error getting portfolio data:", error);
    return {
      success: false,
      error: error.message,
      value: 0,
      change: 0,
      isPositive: true,
    };
  }
}
