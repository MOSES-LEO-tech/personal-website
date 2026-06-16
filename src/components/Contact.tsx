import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, Mail, ExternalLink } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-32" ref={ref}>
      <div className="section-container">
        <motion.div
          className="card p-10 sm:p-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Background glow */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-[100px]" />

          <div className="relative z-10">
            <span className="section-label">Contact</span>
            <h2 className="section-title mb-6">
              Let's build
              <br />
              <span className="text-[var(--color-accent)]">something</span>
            </h2>

            <p className="text-[var(--color-text-muted)] text-lg max-w-lg mx-auto mb-10">
              Have a project in mind or just want to connect? I'm always open to
              interesting conversations and collaborations.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://github.com/MOSES-LEO-tech"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Github size={18} />
                GitHub Profile
                <ExternalLink size={16} />
              </a>
              <a
                href="mailto:momolilitech@gmail.com"
                className="btn-secondary"
              >
                <Mail size={18} />
                Send an Email
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
