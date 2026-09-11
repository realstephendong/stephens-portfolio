import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CareerRail from './CareerRail';
import ExperienceTimeline from './ExperienceTimeline';
import { groupByYear } from '../lib/career';

// Where down the viewport a role counts as "the one being read".
const READING_LINE = 0.42;

const ExperienceSection = ({ experiences, railItems = [] }) => {
  const groups = useMemo(() => groupByYear(experiences), [experiences]);
  const total = experiences.length;

  const rowNodes = useRef([]);
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(null);

  const registerRow = useCallback(
    (index) => (node) => {
      rowNodes.current[index] = node;
    },
    []
  );

  // Whichever row sits closest to the reading line owns the rail.
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const line = window.innerHeight * READING_LINE;
      let best = 0;
      let bestDistance = Infinity;
      rowNodes.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - line);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      setActive(best);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [total]);

  const scrollToRow = useCallback((index) => {
    const node = rowNodes.current[index];
    if (!node) return;
    const navbar = document.querySelector('header');
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
    const top = node.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 48;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const lit = hover ?? active;
  let row = 0;

  return (
    <section id="experience" className="py-10 sm:py-16">
      <div className="flex items-baseline gap-5">
        <h2 className="font-mono text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
          experience
        </h2>
        <span aria-hidden="true" className="h-px flex-1 -translate-y-2 bg-foreground/10" />
        <span className="font-mono text-xs tabular-nums text-muted-foreground">{total} roles</span>
      </div>

      <div className="mt-10 flex gap-10 lg:gap-16">
        <div className="min-w-0 flex-1">
          {groups.map((group) => (
            <section key={group.year} aria-label={String(group.year)}>
              {/* The year rides along with its own roles, so the reader always
                  knows which one they are inside without a second column. */}
              <div className="sticky top-[94px] z-20 -mx-2 flex items-center bg-background/90 px-2 py-2 backdrop-blur-sm">
                <span className="font-mono text-sm tabular-nums text-primary">{group.year}/</span>
              </div>

              <ul className="list-none pl-0">
                {group.items.map((experience) => {
                  const index = row++;
                  return (
                    <ExperienceTimeline
                      key={experience.id}
                      experience={experience}
                      index={index}
                      isActive={lit === index}
                      registerRow={registerRow(index)}
                      onHover={setHover}
                    />
                  );
                })}
              </ul>
            </section>
          ))}
          <span aria-hidden="true" className="block h-px w-full bg-foreground/10" />
        </div>

        {/* The hero's rail, carried down and pinned. */}
        {railItems.length > 0 && (
          <aside className="hidden w-[104px] shrink-0 lg:block">
            <div className="sticky top-[28vh]">
              <CareerRail
                items={railItems}
                activeIndex={active}
                hoverIndex={hover}
                rowHeight={46}
                onHoverItem={setHover}
                onSelectItem={scrollToRow}
              />
            </div>
          </aside>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
