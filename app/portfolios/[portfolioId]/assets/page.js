import AssetsClient from "@/components/dashboard/assets/AssetsClient";

export default async function AssetsPage({ params }) {
  const { portfolioId } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-space-grotesk font-bold text-kyro-text mb-2">
          Assets
        </h1>
        <p className="text-gray-400 font-inter">Manage all your assets</p>
      </div>

      <AssetsClient portfolioId={portfolioId} />
    </div>
  );
}
