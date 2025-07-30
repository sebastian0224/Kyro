// Estrategia híbrida: priorizar networks más importantes
export async function getWalletNetWorthOptimized(wallet_address) {
  // PASO 1: Networks priorizadas por volumen y actividad
  const priorityNetworks = [
    "eth-mainnet", // Mayor volumen y valor
    "polygon-mainnet", // L2 más popular
    "bnb-mainnet", // Gran ecosistema DeFi
    "base-mainnet", // L2 de Coinbase, creciendo rápido
    "arb-mainnet", // L2 con mucho volumen
  ];

  const secondaryNetworks = [
    "opt-mainnet",
    "avax-mainnet",
    "blast-mainnet",
    "gnosis-mainnet",
    "zksync-mainnet",
  ];

  try {
    // PASO 2: Primera llamada con networks prioritarias
    const primaryResult = await callTokensByWallet(
      wallet_address,
      priorityNetworks
    );

    let totalValue = calculateTotalValue(primaryResult);
    let allTokens = primaryResult.data.tokens || [];

    // PASO 3: Si el valor es significativo (>$100), analizar networks secundarias
    if (totalValue > 100) {
      console.log(
        `Valor significativo encontrado ($${totalValue.toFixed(
          2
        )}). Analizando networks adicionales...`
      );

      const secondaryResult = await callTokensByWallet(
        wallet_address,
        secondaryNetworks
      );
      const secondaryValue = calculateTotalValue(secondaryResult);

      totalValue += secondaryValue;
      allTokens = [...allTokens, ...(secondaryResult.data.tokens || [])];
    }

    // PASO 4: Para casos especiales, usar Token Balances para networks específicas
    const specialNetworks = [
      "linea-mainnet",
      "scroll-mainnet",
      "celo-mainnet",
      "zora-mainnet",
      "unichain-mainnet",
      "worldchain-mainnet",
      "shape-mainnet",
      "berachain-mainnet",
      "arbnova-mainnet",
    ];

    // Solo si ya encontramos valor considerable, verificar networks especiales
    if (totalValue > 500) {
      console.log("Verificando networks especializadas...");
      const specialResult = await getTokensBalanceByWallet(
        wallet_address,
        specialNetworks
      );
      // Aquí tendrías que obtener precios por separado pero solo para tokens con balance > 0
    }

    return {
      totalValue,
      tokens: allTokens,
      strategy:
        totalValue > 500
          ? "comprehensive"
          : totalValue > 100
          ? "extended"
          : "basic",
    };
  } catch (error) {
    console.error("Error en análisis optimizado:", error);
    throw error;
  }
}

// Función para llamar a Tokens By Wallet API
async function callTokensByWallet(wallet_address, networks) {
  const url = `https://api.g.alchemy.com/data/v1/${ALCHEMY_API_KEY}/assets/tokens/by-wallet`;

  const requestBody = {
    addresses: [
      {
        address: wallet_address,
        networks: networks.slice(0, 5), // Máximo 5 networks
      },
    ],
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Función para calcular valor total rápidamente
function calculateTotalValue(apiResponse) {
  if (!apiResponse.data?.tokens) return 0;

  return apiResponse.data.tokens.reduce((total, token) => {
    return total + (parseFloat(token.valueUSD) || 0);
  }, 0);
}

// Estrategia alternativa: Análisis en lotes
export async function analyzeMultipleWallets(wallet_addresses) {
  const results = [];

  // Procesar en lotes de 2 wallets (límite de la API)
  for (let i = 0; i < wallet_addresses.length; i += 2) {
    const batch = wallet_addresses.slice(i, i + 2);

    const batchResult = await callTokensByWalletBatch(batch, [
      "eth-mainnet",
      "polygon-mainnet",
      "bnb-mainnet",
      "base-mainnet",
      "arb-mainnet",
    ]);

    results.push(...processBatchResult(batchResult, batch));
  }

  return results;
}

async function callTokensByWalletBatch(addresses, networks) {
  const url = `https://api.g.alchemy.com/data/v1/${ALCHEMY_API_KEY}/assets/tokens/by-wallet`;

  const requestBody = {
    addresses: addresses.map((addr) => ({
      address: addr,
      networks: networks,
    })),
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  };

  const response = await fetch(url, options);
  return await response.json();
}

function processBatchResult(apiResponse, addresses) {
  return addresses.map((address) => {
    const addressTokens =
      apiResponse.data?.tokens?.filter(
        (token) => token.address.toLowerCase() === address.toLowerCase()
      ) || [];

    const totalValue = addressTokens.reduce(
      (sum, token) => sum + (parseFloat(token.valueUSD) || 0),
      0
    );

    return {
      address,
      totalValue,
      tokens: addressTokens,
      tokensCount: addressTokens.length,
    };
  });
}

// Función de fallback para análisis completo (solo si es necesario)
export async function getCompleteAnalysis(wallet_address) {
  console.log("Iniciando análisis completo (costoso)...");

  const allNetworks = [
    "eth-mainnet",
    "polygon-mainnet",
    "bnb-mainnet",
    "base-mainnet",
    "avax-mainnet",
    "zksync-mainnet",
    "linea-mainnet",
    "scroll-mainnet",
    "blast-mainnet",
    "celo-mainnet",
    "zora-mainnet",
    "gnosis-mainnet",
    "opt-mainnet",
    "arb-mainnet",
    "arbnova-mainnet",
    "unichain-mainnet",
    "worldchain-mainnet",
    "shape-mainnet",
    "berachain-mainnet",
  ];

  // Usar Token Balances para cobertura completa
  const balancesResult = await getTokensBalanceByWallet(
    wallet_address,
    allNetworks
  );

  // Obtener precios solo para tokens con balance > 0
  const tokensWithBalance = balancesResult.data.tokens.filter(
    (token) => BigInt(token.tokenBalance) > 0n
  );

  console.log(
    `Encontrados ${tokensWithBalance.length} tokens con balance. Obteniendo precios...`
  );

  // Aquí implementarías la lógica para obtener precios de CoinGecko/CoinMarketCap
  // Solo para los tokens que realmente tienen balance

  return await enrichWithPrices(tokensWithBalance);
}

async function enrichWithPrices(tokens) {
  // Implementar lógica de precios aquí
  console.log("Enriqueciendo con precios...");
  return tokens; // Placeholder
}
