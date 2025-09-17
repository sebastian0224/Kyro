import AssetsClient from "@/components/dashboard/assets/AssetsClient";

export default async function AssetsPage({ params }) {
  const { portfolioId } = await params;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-space-grotesk font-bold mb-2">
          Assets
        </h1>
        <p className="text-gray-400 font-inter text-sm sm:text-base">
          Manage all your assets
        </p>
      </div>

      <AssetsClient portfolioId={portfolioId} />
    </div>
  );
}
