// import {
//   getWalletNetWorth5,
//   getWalletNetWorth10,
//   getWalletTestToken,
// } from "@/lib/alchemy/wallets";

// export default async function displaydatos() {
//   const PortfolioWalletsList = [
//     "0x1E6E8695FAb3Eb382534915eA8d7Cc1D1994B152",
//     "0x503828976D22510aad0201ac7EC88293211D23Da",
//   ];

//   const networth5 = await getWalletNetWorth5(
//     "0x503828976D22510aad0201ac7EC88293211D23Da"
//   );

//   const networth10 = await getWalletNetWorth10(
//     "0x503828976D22510aad0201ac7EC88293211D23Da"
//   );

//   const especificToken = await getWalletTestToken(
//     "0x1E6E8695FAb3Eb382534915eA8d7Cc1D1994B152"
//   );
//   console.log("networth by 5", networth5);

//   console.log("networth by 10", networth10);
//   return (
//     <>
//       <h1>Portfolio Data</h1>
//       <h1>Total Networth:</h1>
//       <p>-----------------</p>
//       <h2>Wallet</h2>
//       <p>address:</p>
//       <p>total networth:</p>
//       <p>number of tokens:</p>
//       <p>list ok tokens:</p>
//     </>
//   );
// }
