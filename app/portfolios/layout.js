export default function DashboardLayout({ children, modals }) {
  return (
    <div>
      <main>
        <div>{children}</div>
        <div>{modals}</div>
      </main>
    </div>
  );
}
