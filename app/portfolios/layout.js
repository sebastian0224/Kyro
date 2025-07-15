export default function DashboardLayout({ children, modals }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <main className="space-y-8">
          <div className="space-y-6">{children}</div>
          {modals}
        </main>
      </div>
    </div>
  );
}
