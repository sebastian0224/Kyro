export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-space-grotesk font-bold text-kyro-text mb-2">
          Transactions
        </h1>
        <p className="text-gray-400 font-inter">Recent transaction history</p>
      </div>

      {/* Content structure - ready for future components */}
      <div className="bg-kyro-sidebar border border-kyro-border rounded-lg">
        <div className="p-6 border-b border-kyro-border">
          <h3 className="font-space-grotesk font-semibold text-kyro-text">
            Transaction History
          </h3>
          <p className="text-gray-400 font-inter text-sm mt-1">
            Complete record of all your transactions
          </p>
        </div>
        <div className="p-6">
          <p className="text-gray-400 font-inter text-sm">
            Transaction table and filters will be implemented here
          </p>
        </div>
      </div>
    </div>
  );
}
