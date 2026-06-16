import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  Code2,
  Database,
  ExternalLink,
  Gauge,
  Github,
  GitBranch,
  GraduationCap,
  Keyboard,
  Layers,
  Mail,
  Monitor,
  Rocket,
  Shield,
  Sparkles,
  Workflow,
  Zap,
} from 'lucide-react';

const navLinks = [
  { label: 'Story', href: '#story' },
  { label: 'Motion', href: '#motion' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

const motionPrinciples = [
  {
    icon: Layers,
    title: 'Layered Layouts',
    body: 'Sections reveal in layers so the page feels assembled, not simply scrolled.',
  },
  {
    icon: Workflow,
    title: 'Guided Transitions',
    body: 'Animated bridges carry the eye from identity, to proof, to invitation.',
  },
  {
    icon: Zap,
    title: 'Responsive Rhythm',
    body: 'Motion is fast enough to feel alive, calm enough to keep the content readable.',
  },
];

const projects = [
  {
    number: '01',
    icon: GraduationCap,
    title: 'Milestone',
    subtitle: 'Student portfolio platform',
    description:
      'A production-minded platform for students, teachers, parents, and admins. It combines role-based dashboards, scholarship tracking, achievement records, and growth analytics.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL'],
    github: 'https://github.com/MOSES-LEO-tech/growth-forge-ai-44',
    live: 'https://growth-forge-ai-44.vercel.app',
    image: '/assets/milestone-og.png',
    accent: '#1f7a5c',
  },
  {
    number: '02',
    icon: Keyboard,
    title: 'Keyboard v2',
    subtitle: 'Interactive input surface',
    description:
      'A focused browser interface that turns simple key interactions into a polished responsive tool, with Docker support for repeatable deployment.',
    tags: ['JavaScript', 'CSS', 'Docker'],
    github: 'https://github.com/MOSES-LEO-tech/keyboard-2',
    accent: '#3157d8',
  },
  {
    number: '03',
    icon: Monitor,
    title: 'Keyboard',
    subtitle: 'Foundational UI experiment',
    description:
      'An earlier on-screen keyboard exploring DOM-driven input handling, layout discipline, and clean browser interaction patterns.',
    tags: ['JavaScript', 'CSS'],
    github: 'https://github.com/MOSES-LEO-tech/Keyboard',
    accent: '#c76f2a',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Frame',
    body: 'Define the user, the promise, and the smallest useful path.',
  },
  {
    number: '02',
    title: 'Model',
    body: 'Shape data, permissions, and the product boundaries before screens multiply.',
  },
  {
    number: '03',
    title: 'Build',
    body: 'Ship typed React interfaces with clear states, loading paths, and errors.',
  },
  {
    number: '04',
    title: 'Connect',
    body: 'Wire Supabase, APIs, auth, and deployment into one working loop.',
  },
  {
    number: '05',
    title: 'Polish',
    body: 'Tune layout, motion, copy, and accessibility until the flow feels intentional.',
  },
  {
    number: '06',
    title: 'Launch',
    body: 'Deploy, inspect, and keep improving from real usage instead of guesses.',
  },
];

const stackGroups = [
  {
    label: 'Interface',
    icon: Code2,
    items: ['React', 'Next.js', 'Vite', 'TailwindCSS', 'Framer Motion'],
  },
  {
    label: 'System',
    icon: Database,
    items: ['TypeScript', 'Node.js', 'Supabase', 'PostgreSQL', 'RLS'],
  },
  {
    label: 'Delivery',
    icon: GitBranch,
    items: ['Git', 'Docker', 'Vercel', 'Bun', 'CI checks'],
  },
];

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 34,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
            }
          : undefined
      }
      transition={{ duration: 0.78, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 32,
    mass: 0.2,
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

/* ─── Scroll direction detection with 5px threshold ─── */
const SCROLL_THRESHOLD = 5;

function useScrollDirection() {
  const [hidden, setHidden] = useState(false);
  const prevScroll = useRef(0);
  const reduceMotion = Boolean(useReducedMotion());

  useEffect(() => {
    if (reduceMotion) return;

    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - prevScroll.current;

      if (Math.abs(delta) < SCROLL_THRESHOLD) {
        return; // ignore small fluctuations
      }

      if (delta > 0 && current > 0) {
        // Scrolled down — hide
        setHidden(true);
      } else if (delta < 0) {
        // Scrolled up — show
        setHidden(false);
      }

      prevScroll.current = current;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduceMotion]);

  return hidden;
}

/* ─── Scroll animation hook for hero transition ─── */
const SCROLL_RANGE = 700; // px of scroll for full hero transition

function useHeroScroll() {
  const { scrollY } = useScroll();
  const reduceMotion = Boolean(useReducedMotion());

  // Hero title: scale shrink from 1 to 0.55
  const titleScale = useTransform(
    scrollY,
    [0, SCROLL_RANGE * 0.5],
    [1, 0.55]
  );

  // Hero content: fade-out
  const contentOpacity = useTransform(
    scrollY,
    [SCROLL_RANGE * 0.35, SCROLL_RANGE * 0.85],
    [1, 0]
  );

  if (reduceMotion) {
    return {
      titleStyle: {},
      contentStyle: {},
    };
  }

  return {
    titleStyle: { scale: titleScale },
    contentStyle: { opacity: contentOpacity },
  };
}

/* ─── Brand + Nav: scroll-direction based hide/show ─── */
function BrandFloat() {
  const hidden = useScrollDirection();

  return (
    <a
      href="#home"
      className={`brand-float${hidden ? ' brand-hidden' : ''}`}
      aria-label="MOMOLILI TECH home"
    >
      <span>MOMOLILI</span>
      <strong>TECH</strong>
    </a>
  );
}

function NavCompact() {
  const hidden = useScrollDirection();

  return (
    <nav
      className={`nav-compact${hidden ? ' nav-hidden' : ''}`}
      aria-label="Primary navigation"
    >
      {navLinks.map((link) => (
        <a key={link.href} href={link.href}>
          {link.label}
        </a>
      ))}
      <a
        href="https://github.com/MOSES-LEO-tech"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-gh-link"
      >
        <Github size={14} />
        GitHub
      </a>
    </nav>
  );
}

const flowLines = Array.from({ length: 16 }, (_, index) => index);

function FlowField({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'flow-field flow-field-compact' : 'flow-field'} aria-hidden="true">
      {flowLines.map((line) => (
        <span
          key={line}
          className="flow-line"
          style={
            {
              '--i': line,
              '--lane': `${(line % 8) * 12 + 6}%`,
              '--speed': `${11 + (line % 5) * 1.5}s`,
              '--delay': `${line * -0.55}s`,
              '--drift': `${((line % 5) - 2) * 18}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function Hero() {
  const { titleStyle, contentStyle } = useHeroScroll();
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -84]);
  const opacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 0.82, 0]);

  return (
    <section id="home" ref={ref} className="hero-stage">
      <FlowField />
      <div className="hero-grid-overlay" aria-hidden="true" />
      <motion.div
        className="section-wrap hero-content"
        style={reduceMotion ? undefined : { y, opacity, ...contentStyle }}
      >
        <div className="hero-identity">
          <img src="/assets/moses-avatar.png" alt="MOMOLILI TECH profile" />
          <span>Full-stack developer</span>
        </div>

        <motion.h1
          className="hero-title"
          style={reduceMotion ? undefined : { ...titleStyle }}
        >
          Build software
          <span>without limits.</span>
        </motion.h1>

        <motion.p
          className="hero-copy"
          style={reduceMotion ? undefined : { ...titleStyle }}
        >
          I turn clean architecture, expressive interfaces, and fast product loops into web
          systems that feel considered from first scroll to final deploy.
        </motion.p>

        <div className="hero-actions">
          <a href="#projects" className="button button-primary">
            View the work
            <ArrowRight size={18} />
          </a>
          <a
            href="https://github.com/MOSES-LEO-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-secondary"
          >
            <Github size={18} />
            GitHub
          </a>
        </div>
      </motion.div>

      <div className="hero-proof-strip" aria-label="Portfolio highlights">
        <span>React and TypeScript</span>
        <span>Supabase systems</span>
        <span>Animated product interfaces</span>
        <span>Deployed work</span>
      </div>

      <a href="#story" className="scroll-cue" aria-label="Scroll to story">
        <span />
      </a>
    </section>
  );
}

function SectionBridge({
  from,
  to,
  label,
}: {
  from: string;
  to: string;
  label: string;
}) {
  return (
    <div className="section-bridge" aria-hidden="true">
      <motion.div
        className="bridge-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="bridge-copy">
        <span>{from}</span>
        <strong>{label}</strong>
        <span>{to}</span>
      </div>
    </div>
  );
}

function StorySection() {
  return (
    <section id="story" className="chapter story-chapter">
      <div className="section-wrap sticky-layout">
        <Reveal className="sticky-copy">
          <p className="section-eyebrow">The constraint</p>
          <h2 className="section-title">
            A personal site should not feel like a resume wearing a template.
          </h2>
          <p className="section-lede">
            The layout now works like a product story: each section changes posture,
            then hands the viewer to the next idea with motion.
          </p>
        </Reveal>

        <div className="contrast-stack">
          <Reveal className="contrast-panel muted-panel">
            <span>Before</span>
            <h3>Static portfolio flow</h3>
            <p>Hero, cards, stack, contact. Useful, but predictable and easy to forget.</p>
            <div className="flat-wire" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </Reveal>

          <Reveal className="contrast-panel active-panel" delay={0.12}>
            <span>After</span>
            <h3>Animated story system</h3>
            <p>
              Sticky chapters, moving visual fields, project proof, and section bridges
              create a deliberate sense of progression.
            </p>
            <div className="flow-snapshot" aria-hidden="true">
              <b />
              <b />
              <b />
              <b />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MotionSection() {
  return (
    <section id="motion" className="chapter motion-chapter">
      <div className="section-wrap">
        <Reveal className="chapter-heading">
          <p className="section-eyebrow">Motion language</p>
          <h2 className="section-title">
            Transitions that make the layout feel engineered.
          </h2>
          <p className="section-lede">
            The animation system favors measured movement: reveal, handoff, focus, and
            momentum. It gives each chapter its own entrance without making the page noisy.
          </p>
        </Reveal>

        <div className="motion-showcase">
          <Reveal className="motion-console">
            <FlowField compact />
            <div className="console-topline">
              <span />
              <span />
              <span />
            </div>
            <div className="route-map" aria-hidden="true">
              <i className="node node-one" />
              <i className="node node-two" />
              <i className="node node-three" />
              <i className="node node-four" />
              <b className="moving-signal" />
            </div>
            <div className="console-caption">
              <strong>Scroll choreography</strong>
              <span>Identity to proof to action</span>
            </div>
          </Reveal>

          <div className="principle-grid">
            {motionPrinciples.map((item, index) => (
              <Reveal
                key={item.title}
                className="principle-card"
                delay={0.1 + index * 0.08}
              >
                <item.icon size={20} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="chapter projects-chapter">
      <div className="section-wrap">
        <Reveal className="chapter-heading">
          <p className="section-eyebrow">Proof in motion</p>
          <h2 className="section-title">The work becomes the visual system.</h2>
          <p className="section-lede">
            Project panels use staggered reveals and image frames so the portfolio feels
            closer to a product walkthrough than a directory.
          </p>
        </Reveal>

        <div className="featured-project">
          <Reveal className="project-preview">
            <div className="browser-frame">
              <div className="browser-bar">
                <span />
                <span />
                <span />
                <p>growth-forge-ai-44.vercel.app</p>
              </div>
              <img src={featured.image} alt={`${featured.title} GitHub preview`} />
            </div>
          </Reveal>

          <Reveal className="project-copy-panel" delay={0.12}>
            <span className="project-number">{featured.number}</span>
            <featured.icon size={26} />
            <h3>{featured.title}</h3>
            <p className="project-subtitle">{featured.subtitle}</p>
            <p>{featured.description}</p>
            <div className="tag-row">
              {featured.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="project-links">
              <a href={featured.github} target="_blank" rel="noopener noreferrer">
                <Github size={16} />
                Source
              </a>
              {featured.live && (
                <a href={featured.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                  Live
                </a>
              )}
            </div>
          </Reveal>
        </div>

        <div className="project-river">
          {rest.map((project, index) => (
            <Reveal
              key={project.title}
              className="project-card"
              delay={0.08 + index * 0.08}
            >
              <div
                className="project-accent"
                style={{ '--project-accent': project.accent } as CSSProperties}
              />
              <span className="project-number">{project.number}</span>
              <project.icon size={22} />
              <h3>{project.title}</h3>
              <p className="project-subtitle">{project.subtitle}</p>
              <p>{project.description}</p>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github size={16} />
                Source
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="chapter process-chapter">
      <div className="section-wrap sticky-layout process-layout">
        <Reveal className="sticky-copy">
          <p className="section-eyebrow">Operating model</p>
          <h2 className="section-title">
            From idea to deployed system, with fewer loose ends.
          </h2>
          <p className="section-lede">
            The process is laid out like a production line. Each tile has its own reveal,
            and the rail animates as the section enters the viewport.
          </p>
        </Reveal>

        <div className="process-rail">
          {processSteps.map((step, index) => (
            <Reveal
              key={step.number}
              className="process-step"
              delay={0.06 + index * 0.06}
            >
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StackSection() {
  return (
    <section className="chapter stack-chapter">
      <div className="section-wrap">
        <Reveal className="chapter-heading">
          <p className="section-eyebrow">Tooling</p>
          <h2 className="section-title">The stack supports the story.</h2>
        </Reveal>

        <div className="stack-grid">
          {stackGroups.map((group, index) => (
            <Reveal key={group.label} className="stack-panel" delay={0.08 + index * 0.08}>
              <group.icon size={22} />
              <h3>{group.label}</h3>
              <div>
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="chapter contact-chapter">
      <FlowField compact />
      <div className="section-wrap contact-layout">
        <Reveal>
          <p className="section-eyebrow">Build with MOMOLILI</p>
          <h2 className="contact-title">
            Let the next thing feel inevitable.
          </h2>
        </Reveal>

        <Reveal className="contact-panel" delay={0.12}>
          <div className="contact-metrics">
            <span>
              <Gauge size={18} />
              Fast iterations
            </span>
            <span>
              <Shield size={18} />
              Clean foundations
            </span>
            <span>
              <Rocket size={18} />
              Launch-ready
            </span>
            <span>
              <Sparkles size={18} />
              Motion-first polish
            </span>
          </div>
          <p>
            Have a project, collaboration, or idea that needs a polished web system?
            Start with the work, then make the experience memorable.
          </p>
          <div className="hero-actions">
            <a
              href="mailto:momolilitech@gmail.com"
              className="button button-primary"
            >
              <Mail size={18} />
              Email me
            </a>
            <a
              href="https://github.com/MOSES-LEO-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-secondary"
            >
              <Github size={18} />
              GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-inner">
        <p>&copy; {new Date().getFullYear()} MOMOLILI TECH. Build without limits.</p>
        <div>
          <a href="#home">Top</a>
          <a href="mailto:momolilitech@gmail.com">Email</a>
          <a
            href="https://github.com/MOSES-LEO-tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    if (!window.location.hash) return;

    const id = window.location.hash.slice(1);
    const target = document.getElementById(id);
    window.requestAnimationFrame(() => {
      target?.scrollIntoView({ block: 'start' });
    });
  }, []);

  return (
    <>
      <ScrollProgress />
      <BrandFloat />
      <NavCompact />
      <main>
        <Hero />
        <SectionBridge from="Identity" label="turn the page" to="Story" />
        <StorySection />
        <SectionBridge from="Story" label="add motion" to="System" />
        <MotionSection />
        <SectionBridge from="System" label="show proof" to="Projects" />
        <ProjectsSection />
        <SectionBridge from="Projects" label="make it repeatable" to="Process" />
        <ProcessSection />
        <StackSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
