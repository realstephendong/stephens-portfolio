import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { RAIL_EASE } from '../lib/career';

const CareerRail = ({
  items,
  activeIndex = 0,
  hoverIndex = null,
  rowHeight = 96,
  animateIn = false,
  showLabel = false,
  extendSpine = false,
  actionHint = 'jump to this role',
  onHoverItem,
  onSelectItem,
  className = ''
}) => {
  const reduce = useReducedMotion();
  const lit = hoverIndex ?? activeIndex;
  const litItem = items[lit];

  return (
    <div className={`relative ${className}`}>
      {/* The spine runs from the first tick down. In the hero it carries on
          past the last one, because the list does too. */}
      <motion.span
        aria-hidden="true"
        className="absolute right-0 w-px origin-top bg-foreground/20"
        style={{
          top: rowHeight / 2,
          height: (items.length - (extendSpine ? 0.5 : 1)) * rowHeight
        }}
        initial={animateIn && !reduce ? { scaleY: 0 } : false}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: RAIL_EASE, delay: 0.1 }}
      />

      {/* The rail's payoff: whoever is lit says their name, and the name rides
          down the spine as the reading position moves. */}
      {showLabel && litItem && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-[104px] top-0 hidden items-center justify-end whitespace-nowrap lg:flex"
          style={{ height: rowHeight }}
          initial={false}
          animate={{ y: lit * rowHeight }}
          transition={{ duration: 0.55, ease: RAIL_EASE }}
        >
          <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={litItem.id}
                className="block whitespace-nowrap text-right font-mono text-[clamp(1rem,1.45vw,1.375rem)] tracking-[-0.02em] text-foreground"
                initial={reduce ? false : { y: '112%' }}
                animate={{ y: 0 }}
                exit={reduce ? {} : { y: '-112%' }}
                transition={{ duration: 0.28, ease: RAIL_EASE }}
              >
                {litItem.shortCompany}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>
      )}

      {items.map((item, i) => {
        const isLit = i === lit;
        return (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => onSelectItem?.(i, item)}
            onMouseEnter={() => onHoverItem?.(i)}
            onMouseLeave={() => onHoverItem?.(null)}
            onFocus={() => onHoverItem?.(i)}
            onBlur={() => onHoverItem?.(null)}
            className="group relative flex w-full items-center justify-end gap-2 rounded-sm text-right outline-none focus-visible:ring-1 focus-visible:ring-primary/60 sm:gap-3"
            style={{ height: rowHeight }}
            initial={animateIn && !reduce ? { opacity: 0, x: 14 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: RAIL_EASE, delay: 0.2 + i * 0.07 }}
          >
            <span className="sr-only">{`${item.company}, ${item.year} — ${actionHint}`}</span>

            <span
              aria-hidden="true"
              className={`hidden w-10 font-mono text-[12px] tabular-nums transition-colors duration-500 sm:inline-block ${
                isLit ? 'text-foreground' : 'text-muted-foreground/70'
              }`}
            >
              {item.showYear ? item.year : ''}
            </span>

            <span
              aria-hidden="true"
              className={`h-px origin-right transition-all duration-500 ease-out ${
                isLit
                  ? 'w-8 bg-primary sm:w-10'
                  : 'w-3 bg-foreground/40 group-hover:w-6 group-hover:bg-foreground/70 group-focus-visible:w-6 sm:w-5'
              }`}
            />

            <span
              aria-hidden="true"
              className="absolute right-0 flex h-4 w-4 translate-x-1/2 items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all duration-500 ease-out ${
                  isLit
                    ? 'h-[9px] w-[9px] bg-primary'
                    : 'h-[5px] w-[5px] bg-foreground/45 group-hover:bg-foreground/80 group-focus-visible:bg-foreground/80'
                }`}
              />
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default CareerRail;
