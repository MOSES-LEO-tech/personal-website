export default function Footer() {
  return (
    <footer className="py-10 border-t border-[var(--color-border)]">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[var(--color-text-muted)] text-sm">
          &copy; {new Date().getFullYear()} MOMOLILI_TECH. Built with React & Tailwind.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/MOSES-LEO-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-muted)] text-sm hover:text-[var(--color-accent)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:momolilitech@gmail.com"
            className="text-[var(--color-text-muted)] text-sm hover:text-[var(--color-accent)] transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
