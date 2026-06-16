import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Cpu, Zap } from 'lucide-react';

const highlights = [
  {
    icon: Code2,
    label: 'Clean Code',
    desc: 'TypeScript-first, strict typing, modular architecture.',
  },
  {
    icon: Cpu,
    label: 'Full-Stack',
    desc: 'React, Next.js, Supabase, PostgreSQL, Tailwind.',
  },
  {
    icon: Zap,
    label: 'Fast Delivery',
    desc: 'From concept to deployed product, efficiently.',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-32" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">About</span>
          <h2 className="section-title mb-8">
            Building digital
            <br />
            <span className="text-[var(--color-accent)]">foundations</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 md:gap-16">
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-6">
              I'm a full-stack developer who believes great software starts with a
              strong foundation — clean architecture, thoughtful design, and code
              that stands the test of time.
            </p>
            <p className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-8">
              I specialize in building modern web applications with TypeScript,
              React, and Node.js. My flagship project,{' '}
              <strong className="text-[var(--color-text)]">Milestone</strong>, is a
              student portfolio platform serving schools, students, and parents with
              role-based dashboards and growth analytics.
            </p>
            <a
              href="https://github.com/MOSES-LEO-tech/growth-forge-ai-44"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm font-mono text-[var(--color-accent)]"
            >
              View Milestone on GitHub →
            </a>
          </motion.div>

          <motion.div
            className="md:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {highlights.map((item) => (
              <div key={item.label} className="card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-dim)] flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{item.label}</h3>
                  <p className="text-[var(--color-text-muted)] text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
