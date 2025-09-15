import TransactionsClient from "@/components/dashboard/transactions/TransactionsClient";

export default async function TransactionsPage({ params }) {
  const { portfolioId } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-space-grotesk font-bold text-kyro-text mb-2">
          Transactions
        </h1>
        <p className="text-gray-400 font-inter">Recent transaction history</p>
      </div>

      <TransactionsClient portfolioId={portfolioId} />
    </div>
  );
}
