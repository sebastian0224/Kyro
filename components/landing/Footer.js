export default function Footer() {
  return (
    <footer className="bg-neutral-950 py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          {/* Copyright */}
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Kyro. All rights reserved.
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-6 justify-center">
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Terms of Use
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
