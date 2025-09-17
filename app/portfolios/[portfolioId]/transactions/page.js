import TransactionsClient from "@/components/dashboard/transactions/TransactionsClient";

export default async function TransactionsPage({ params }) {
  const { portfolioId } = await params;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-space-grotesk font-bold mb-2">
          Transactions
        </h1>
        <p className="text-gray-400 font-inter text-sm sm:text-base">
          Recent transaction history
        </p>
      </div>

      <TransactionsClient portfolioId={portfolioId} />
    </div>
  );
}
