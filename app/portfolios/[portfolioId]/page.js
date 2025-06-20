export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-space-grotesk font-bold text-kyro-text mb-2">
          Overview
        </h1>
        <p className="text-gray-400 font-inter">
          Welcome to your KYRO dashboard
        </p>
      </div>

      {/* Content structure - ready for future components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-kyro-sidebar border border-kyro-border rounded-lg p-6">
          <h3 className="font-space-grotesk font-semibold text-kyro-text mb-2">
            Portfolio Value
          </h3>
          <p className="text-gray-400 font-inter text-sm">
            Total portfolio overview
          </p>
        </div>

        <div className="bg-kyro-sidebar border border-kyro-border rounded-lg p-6">
          <h3 className="font-space-grotesk font-semibold text-kyro-text mb-2">
            Recent Activity
          </h3>
          <p className="text-gray-400 font-inter text-sm">
            Latest transactions and updates
          </p>
        </div>

        <div className="bg-kyro-sidebar border border-kyro-border rounded-lg p-6">
          <h3 className="font-space-grotesk font-semibold text-kyro-text mb-2">
            Performance
          </h3>
          <p className="text-gray-400 font-inter text-sm">
            Portfolio performance metrics
          </p>
        </div>
      </div>
    </div>
  );
}
