export default function AssetsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-space-grotesk font-bold text-kyro-text mb-2">
          Assets
        </h1>
        <p className="text-gray-400 font-inter">Manage all your assets</p>
      </div>

      {/* Content structure - ready for future components */}
      <div className="bg-kyro-sidebar border border-kyro-border rounded-lg">
        <div className="p-6 border-b border-kyro-border">
          <h3 className="font-space-grotesk font-semibold text-kyro-text">
            Asset Portfolio
          </h3>
          <p className="text-gray-400 font-inter text-sm mt-1">
            Overview of all your assets and holdings
          </p>
        </div>
        <div className="p-6">
          <p className="text-gray-400 font-inter text-sm">
            Asset management interface will be implemented here
          </p>
        </div>
      </div>
    </div>
  );
}
