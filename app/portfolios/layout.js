export default function DashboardLayout({ children, modals }) {
  return (
    <div>
      <main>
        {children}
        {modals}
      </main>
    </div>
  );
}
