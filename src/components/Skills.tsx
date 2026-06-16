import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skillGroups = [
  {
    label: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'PLpgSQL', 'CSS', 'HTML'],
  },
  {
    label: 'Frameworks & Libraries',
    skills: ['React', 'Next.js', 'Vite', 'TailwindCSS', 'Node.js'],
  },
  {
    label: 'Tools & Platforms',
    skills: ['Supabase', 'PostgreSQL', 'Docker', 'Git', 'Vercel', 'Bun'],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-32" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Stack</span>
          <h2 className="section-title mb-4">
            Tools of the
            <br />
            <span className="text-[var(--color-accent)]">trade</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i + 0.15 }}
            >
              <div className="card p-6 h-full">
                <h3 className="font-mono text-xs tracking-widest uppercase text-[var(--color-accent)] mb-5">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-sm font-medium text-[var(--color-text)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
