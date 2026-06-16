import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <a
            href="#"
            className="font-display font-bold text-lg tracking-tight hover:text-[var(--color-accent)] transition-colors"
          >
            MOMOLILI<span className="text-[var(--color-accent)]">_TECH</span>
          </a>

          <div className="hidden sm:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com/MOSES-LEO-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <Github size={18} />
            </a>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
