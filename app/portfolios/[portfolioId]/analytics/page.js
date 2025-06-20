export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-space-grotesk font-bold text-kyro-text mb-2">
          Analytics
        </h1>
        <p className="text-gray-400 font-inter">
          Detailed analysis of your portfolios
        </p>
      </div>

      {/* Content structure - ready for future components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-kyro-sidebar border border-kyro-border rounded-lg p-6">
          <h3 className="font-space-grotesk font-semibold text-kyro-text mb-2">
            Performance Charts
          </h3>
          <p className="text-gray-400 font-inter text-sm">
            Visual representation of portfolio performance
          </p>
        </div>

        <div className="bg-kyro-sidebar border border-kyro-border rounded-lg p-6">
          <h3 className="font-space-grotesk font-semibold text-kyro-text mb-2">
            Risk Analysis
          </h3>
          <p className="text-gray-400 font-inter text-sm">
            Risk assessment and recommendations
          </p>
        </div>
      </div>
    </div>
  );
}
