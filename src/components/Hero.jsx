import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import HeroField from './HeroField';
import CareerRail from './CareerRail';
import { RAIL_EASE } from '../lib/career';

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (!element) return;
  const navbar = document.querySelector('header');
  const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
  const top = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
  window.scrollTo({ top, behavior: 'smooth' });
};

const HeroLink = ({ label, sectionId }) => (
  <button
    type="button"
    onClick={() => scrollToSection(sectionId)}
    className="group relative font-mono text-sm text-foreground/70 outline-none transition-colors duration-300 hover:text-primary focus-visible:text-primary"
  >
    {label}
    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
  </button>
);

// A terse readout in place of two paragraphs of prose.
const FACTS = [
  ['now', 'shopify, collections engine'],
  ['prev', 'medme health, uwaterloo sirrl, wat.ai'],
  ['study', 'computer engineering, waterloo']
];

const Hero = ({ railItems = [] }) => {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(null);
  const [viewportHeight, setViewportHeight] = useState(
    () => (typeof window === 'undefined' ? 900 : window.innerHeight)
  );

  useEffect(() => {
    const onResize = () => setViewportHeight(window.innerHeight);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // The rail starts a third of the way down and is spaced across six gaps, so
  // its last tick always lands past the fold whatever the viewport height.
  // That overflow is the scroll cue — no bouncing chevron required.
  const railTop = Math.round(viewportHeight * 0.3);
  const rowHeight = Math.max(72, Math.round((viewportHeight - railTop) / 6));

  // Scrubbing the hero walks the rail, so the first scroll gesture visibly
  // moves a tick and swaps the company beside it.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!railItems.length) return;
    const next = Math.min(
      railItems.length - 1,
      Math.max(0, Math.floor(v * railItems.length * 1.25))
    );
    setActive(next);
  });

  const rise = (delay) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, ease: RAIL_EASE, delay }
        };

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden">
      <HeroField />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-12 md:px-16 lg:px-20">
        <div className="flex min-h-[100svh] flex-col justify-center pb-[14vh] pt-[22vh]">
          <div className="pr-14 sm:pr-20 md:pr-0">
            <h1 className="m-0 p-0 pb-[0.08em] font-mono text-[clamp(2.5rem,8vw,7rem)] font-medium leading-[0.9] tracking-[-0.045em] text-foreground">
              <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <motion.span
                  className="block lg:whitespace-nowrap"
                  initial={reduce ? false : { y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: RAIL_EASE, delay: 0.1 }}
                >
                  stephen dong
                </motion.span>
              </span>
            </h1>

            <motion.p
              className="mt-7 max-w-[34ch] text-[clamp(1.0625rem,1.7vw,1.3125rem)] leading-[1.45] text-foreground/90"
              {...rise(0.3)}
            >
              i enjoy working on scalable backend systems.
            </motion.p>

            <motion.dl
              className="mt-10 grid max-w-[52ch] grid-cols-[3.5rem_1fr] gap-x-5 gap-y-2 font-mono text-[0.8125rem] sm:text-sm"
              {...rise(0.4)}
            >
              {FACTS.map(([key, value]) => (
                <React.Fragment key={key}>
                  <dt className="text-primary/70">{key}</dt>
                  <dd className="m-0 text-muted-foreground">{value}</dd>
                </React.Fragment>
              ))}
            </motion.dl>
          </div>

          <motion.nav
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3"
            aria-label="jump to section"
            {...rise(0.48)}
          >
            <HeroLink label="experience" sectionId="experience" />
            <HeroLink label="projects" sectionId="projects" />
          </motion.nav>
        </div>
      </div>

      {/* Rail layer. Absolute so it can run past the bottom edge and be clipped
          by the section, instead of being politely contained inside it. */}
      {railItems.length > 0 && (
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="mx-auto h-full max-w-7xl px-6 sm:px-12 md:px-16 lg:px-20">
            <div className="relative h-full">
              <div className="pointer-events-auto absolute right-0 w-[150px]" style={{ top: railTop }}>
                <CareerRail
                  items={railItems}
                  activeIndex={active}
                  hoverIndex={hover}
                  rowHeight={rowHeight}
                  animateIn
                  showLabel
                  extendSpine
                  actionHint="go to experience"
                  onHoverItem={setHover}
                  onSelectItem={() => scrollToSection('experience')}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Softens only the last inch of the rail, so the cut at the fold reads as
          "continues" rather than "ends". */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-background to-transparent"
      />
    </section>
  );
};

export default Hero;
