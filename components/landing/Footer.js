export default function Footer() {
  return (
    <footer className="bg-[#0F0F10] py-6 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Kyro. All rights reserved.
          </div>
          <nav className="flex flex-wrap gap-6 justify-center mt-1">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
            >
              Terms of Use
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
            >
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
