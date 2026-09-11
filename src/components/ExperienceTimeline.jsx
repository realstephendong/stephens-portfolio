import { useCallback, useEffect, useRef, useState } from 'react';
import { compactRange } from '../lib/career';
import { prefersReducedMotion } from '../lib/gpu';

// Rows print in like lines arriving in a log: once, quickly, barely moving.
function useRevealOnce(delayMs = 0) {
  const [shown, setShown] = useState(
    () => prefersReducedMotion() || typeof IntersectionObserver === 'undefined'
  );
  const nodeRef = useRef(null);

  useEffect(() => {
    if (shown) return undefined;
    const el = nodeRef.current;
    if (!el) return undefined;

    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = setTimeout(() => setShown(true), delayMs);
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );
    observer.observe(el);

    // Content must never depend on an animation firing.
    const failsafe = setTimeout(() => setShown(true), 1600);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      clearTimeout(failsafe);
    };
  }, [delayMs, shown]);

  return [nodeRef, shown];
}

const ExperienceTimeline = ({
  experience,
  index = 0,
  isActive = false,
  registerRow,
  onHover
}) => {
  const { role, company, logo, website, location, project, dateRange, description } = experience;
  const [revealRef, shown] = useRevealOnce(index * 45);

  // One node, two jobs: the reveal observer and the section's scroll measurement.
  const setRefs = useCallback(
    (node) => {
      revealRef.current = node;
      registerRow?.(node);
    },
    [registerRow, revealRef]
  );

  const Name = website ? 'a' : 'span';
  const nameProps = website ? { href: website, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <li
      ref={setRefs}
      data-index={index}
      data-active={isActive ? 'true' : 'false'}
      onMouseEnter={() => onHover?.(index)}
      onMouseLeave={() => onHover?.(null)}
      className="group relative border-t border-foreground/10 py-6 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none"
      style={{ opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateY(5px)' }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[1.75rem] font-mono text-sm text-primary opacity-0 -translate-x-1
                   transition-all duration-200 ease-out
                   group-hover:opacity-100 group-hover:translate-x-0
                   group-focus-within:opacity-100 group-focus-within:translate-x-0
                   motion-reduce:transition-none"
      >
        &gt;
      </span>

      <div className="flex items-stretch gap-4 pl-5 sm:gap-6 sm:pl-7">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 sm:gap-4">
            <h3 className="min-w-0 font-mono text-xl leading-none tracking-tight sm:text-2xl md:text-[1.6rem]">
              <Name
                {...nameProps}
                className={`underline-offset-4 transition-colors duration-300 group-hover:text-primary focus-visible:text-primary focus-visible:underline focus-visible:outline-none motion-reduce:transition-none ${
                  isActive ? 'text-foreground' : 'text-foreground/75'
                }`}
              >
                {company}
              </Name>
            </h3>

            <span
              aria-hidden="true"
              className={`hidden h-px flex-1 transition-colors duration-500 sm:block motion-reduce:transition-none ${
                isActive ? 'bg-primary/25' : 'bg-foreground/10'
              }`}
            />

            <time className="ml-auto shrink-0 font-mono text-xs tabular-nums text-muted-foreground sm:ml-0 sm:text-sm">
              {compactRange(dateRange)}
            </time>
          </div>

          <div className="mt-2.5 flex flex-wrap items-baseline gap-x-5 gap-y-1 font-mono text-[0.8125rem] text-muted-foreground">
            <span>{role}</span>
            <span className="text-muted-foreground/50">{location}</span>
            {project && <span className="text-muted-foreground/50">{project}</span>}
          </div>

          {description && (
            <p
              className={`mt-3.5 max-w-[58ch] font-mono text-[0.875rem] leading-[1.65] transition-colors duration-500 sm:text-[0.9375rem] motion-reduce:transition-none ${
                isActive ? 'text-primary/90' : 'text-primary/60'
              }`}
            >
              {description}
            </p>
          )}
        </div>

        {/* Spans the whole row: the mark carries as much weight as the name. */}
        {logo && (
          <div className="aspect-square w-16 shrink-0 self-center sm:w-28 md:w-32 lg:w-36">
            <img
              src={logo}
              alt=""
              aria-hidden="true"
              width="256"
              height="256"
              loading="lazy"
              decoding="async"
              className={`h-full w-full rounded-lg object-cover transition duration-300 motion-reduce:transition-none ${
                isActive ? 'opacity-100 saturate-100' : 'opacity-65 saturate-[0.65]'
              } group-hover:opacity-100 group-hover:saturate-100`}
            />
          </div>
        )}
      </div>
    </li>
  );
};

export default ExperienceTimeline;
