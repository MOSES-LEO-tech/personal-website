import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Milestone',
    subtitle: 'Student Portfolio Platform',
    description:
      'A full-featured platform where students build portfolios, track scholarships, and manage achievements. Teachers verify work, parents monitor progress, and admins oversee the ecosystem.',
    tags: ['TypeScript', 'Next.js', 'Supabase', 'PostgreSQL', 'TailwindCSS'],
    github: 'https://github.com/MOSES-LEO-tech/growth-forge-ai-44',
    live: 'https://growth-forge-ai-44.vercel.app',
    featured: true,
  },
  {
    title: 'Keyboard v2',
    subtitle: 'Virtual Keyboard Application',
    description:
      'An interactive virtual keyboard built with JavaScript and CSS. Features responsive design and smooth key interactions.',
    tags: ['JavaScript', 'CSS', 'Docker'],
    github: 'https://github.com/MOSES-LEO-tech/keyboard-2',
    live: null,
    featured: false,
  },
  {
    title: 'Keyboard',
    subtitle: 'On-Screen Keyboard',
    description:
      'Earlier iteration of a virtual keyboard demonstrating core input handling and UI rendering with vanilla JavaScript.',
    tags: ['JavaScript', 'CSS'],
    github: 'https://github.com/MOSES-LEO-tech/Keyboard',
    live: null,
    featured: false,
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-32" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Projects</span>
          <h2 className="section-title mb-4">
            What I've
            <br />
            <span className="text-[var(--color-accent)]">built</span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg max-w-xl mb-16">
            Selected projects that showcase my range — from full-stack platforms to
            focused frontend experiments.
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i + 0.15 }}
            >
              <div
                className={`card p-6 sm:p-8 ${
                  project.featured
                    ? 'border-[var(--color-accent-dim)] relative overflow-hidden'
                    : ''
                }`}
              >
                {project.featured && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-[var(--color-accent)] text-[var(--color-bg)] text-[0.6rem] font-mono font-semibold px-3 py-1 rounded-bl-lg">
                      FEATURED
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  {/* Project icon placeholder */}
                  <div className="w-14 h-14 rounded-xl bg-[var(--color-accent-dim)] flex items-center justify-center shrink-0">
                    <span className="font-display font-bold text-xl text-[var(--color-accent)]">
                      {project.title.charAt(0)}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <span className="text-[var(--color-text-muted)] text-sm">
                        {project.subtitle}
                      </span>
                    </div>

                    <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-5">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-1.5"
                      >
                        <Github size={14} />
                        Source
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-mono text-[var(--color-accent)] hover:text-[var(--color-text)] transition-colors inline-flex items-center gap-1.5"
                        >
                          <ExternalLink size={14} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
