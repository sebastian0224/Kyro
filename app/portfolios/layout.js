// portfolios/layout.js
// This layout component wraps all portfolio-related pages, providing a consistent structure for navigation and content.
//
// TODO (v0): Redesign the layout using chadcn/ui components and Tailwind CSS utilities.
// - Keep the layout minimal and professional, inspired by the landing page (see /app/(landing) and /components/landing/).
// - Use the same color palette and fonts as the landing. You can check globals.css for reference.
// - You can change the HTML structure and classes, but do not change the logic or children rendering.
//
// v0: Focus on the UI/UX. If you need to add new visual states, coordinate with the logic already present.

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
