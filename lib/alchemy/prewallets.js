const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

export async function getTokensByMultipleWallet(PortfolioWalletsList) {
  const url = `https://api.g.alchemy.com/data/v1/${ALCHEMY_API_KEY}/assets/tokens/by-address`;

  const MainNetworks = [
    "eth-mainnet",
    "polygon-mainnet",
    "bnb-mainnet",
    "base-mainnet",
    "arb-mainnet",
  ];

  const requestBody = {
    includeNativeTokens: true,
    addresses: PortfolioWalletsList.map((wallet) => ({
      address: wallet,
      networks: MainNetworks,
    })),
  };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("numero de tokens", data.data.tokens.length);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getTokensByWallet5(wallet) {
  const url = `https://api.g.alchemy.com/data/v1/${ALCHEMY_API_KEY}/assets/tokens/by-address`;

  const MainNetworks = [
    "eth-mainnet",
    "polygon-mainnet",
    "bnb-mainnet",
    "base-mainnet",
    "arb-mainnet",
  ];

  const requestBody = {
    addresses: [
      {
        address: wallet,
        networks: MainNetworks,
      },
    ],
  };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data.tokens;
  } catch (error) {
    console.error(error);
  }
}

export async function getTokensByWallet10(wallet) {
  const url = `https://api.g.alchemy.com/data/v1/${ALCHEMY_API_KEY}/assets/tokens/by-address`;

  const MainNetworks1 = [
    "eth-mainnet",
    "polygon-mainnet",
    "bnb-mainnet",
    "base-mainnet",
    "arb-mainnet",
  ];

  const MainNetworks2 = [
    "avax-mainnet", // Avalanche
    "zksync-mainnet", // zkSync
    "opt-mainnet", // Optimism
    "scroll-mainnet", // Scroll
    "celo-mainnet", // Celo
  ];
  const requestBody = {
    addresses: [
      {
        address: wallet,
        networks: MainNetworks1,
      },
      {
        address: wallet,
        networks: MainNetworks2,
      },
    ],
  };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data.tokens;
  } catch (error) {
    console.error(error);
  }
}

//---------------

export async function getWalletTestToken(wallet) {
  const tokens = await getTokensByWallet5(wallet);

  return tokens[10];
}
export async function getWalletNetWorth5(wallet) {
  const tokens = await getTokensByWallet5(wallet);

  let netWorth = 0;

  tokens.forEach((token) => {
    const rawBalance = Number(token.tokenBalance);
    const price = Number(token.tokenPrices?.[0]?.value || 0);
    const decimals = Number(token.tokenMetadata.decimals || 18);

    const balance = rawBalance / 10 ** decimals;
    const value = balance * price;

    netWorth += value;
  });

  return netWorth;
}

export async function getWalletNetWorth10(wallet) {
  const tokens = await getTokensByWallet10(wallet);

  let netWorth = 0;

  tokens.forEach((token) => {
    const rawBalance = Number(token.tokenBalance);
    const price = Number(token.tokenPrices?.[0]?.value || 0);
    const decimals = Number(token.tokenMetadata.decimals || 18);

    const balance = rawBalance / 10 ** decimals;
    const value = balance * price;

    netWorth += value;
  });

  return netWorth;
}

//_----------------------------------------------

export async function getTokensBalanceByWallet(wallet_address) {
  const url = `https://api.g.alchemy.com/data/v1/${ALCHEMY_API_KEY}/assets/tokens/balances/by-address`;

  const networks = [
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

  const requestBody = {
    includeNativeTokens: true,
    addresses: [
      {
        address: wallet_address,
        networks: networks,
      },
    ],
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getTransaccionsByWallet() {}

//preguntar al usuario que tipo de networks trabaja
//----------------------
//----------------------
