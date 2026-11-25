import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { DISCIPLINES_DATA } from '../data/studioData';
import { EDITORIAL_EASE, fadeUpVariant, VIEWPORT_CONFIG } from '../utils/motion';

export default function DisciplinesShowcase({ onSelectDiscipline }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDiscipline = DISCIPLINES_DATA[activeIndex];

  return (
    <section
      id="disciplines"
      className="bg-[#D8CFC4] text-[#141414] border-b border-[#141414]/15 py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pb-12 border-b border-[#141414]/15"
        >
          <div>
            <p className="font-sans text-[11px] font-medium tracking-[0.26em] uppercase text-[#7A7267]">
              02 / Disciplines
            </p>
            <h2 className="mt-4 font-serif text-3xl font-light tracking-tight text-[#141414] sm:text-5xl">
              An integrated studio practice.
            </h2>
          </div>
          <p className="max-w-sm font-sans text-xs sm:text-sm leading-relaxed text-[#141414]/75 font-light">
            Hover or select a discipline to preview our architectural language and explore related commissions.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Interactive Numbered Rows */}
          <div className="lg:col-span-7 divide-y divide-[#141414]/15 border-b border-[#141414]/15">
            {DISCIPLINES_DATA.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{
                    duration: 0.75,
                    delay: idx * 0.08,
                    ease: EDITORIAL_EASE,
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  onClick={() => onSelectDiscipline?.(item.filterCategory)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectDiscipline?.(item.filterCategory);
                    }
                  }}
                  className="group cursor-pointer py-8 sm:py-10 transition-colors focus:outline-none"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-baseline gap-5 sm:gap-8">
                      <span
                        className={`font-sans text-xs tracking-[0.2em] transition-colors duration-300 ${
                          isActive ? 'text-[#141414]' : 'text-[#7A7267]'
                        }`}
                      >
                        {item.number}
                      </span>
                      <div>
                        <h3
                          className={`font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-light tracking-tight transition-transform duration-500 ease-out ${
                            isActive
                              ? 'translate-x-2 text-[#141414]'
                              : 'text-[#141414]/75 group-hover:translate-x-2 group-hover:text-[#141414]'
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p className="mt-2 font-sans text-xs sm:text-sm text-[#141414]/70 font-light">
                          {item.subtitle}
                        </p>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.4, ease: EDITORIAL_EASE }}
                              className="overflow-hidden"
                            >
                              <p className="mt-4 max-w-xl font-sans text-xs sm:text-sm leading-relaxed text-[#141414]/80 font-light">
                                {item.description}
                              </p>
                              <div className="mt-4 flex flex-wrap gap-2">
                                {item.deliverables.map((tag) => (
                                  <span
                                    key={tag}
                                    className="border border-[#141414]/20 px-2.5 py-1 font-sans text-[10px] tracking-[0.16em] uppercase text-[#141414]/80"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <span
                      className={`mt-2 inline-flex h-9 w-9 shrink-0 items-center justify-center border border-[#141414]/20 transition-all duration-300 ${
                        isActive
                          ? 'bg-[#141414] text-[#F6F4F0]'
                          : 'bg-transparent text-[#141414] group-hover:bg-[#141414] group-hover:text-[#F6F4F0]'
                      }`}
                    >
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </div>

                  {/* Mobile Image Preview */}
                  {isActive && (
                    <div className="mt-6 overflow-hidden lg:hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="aspect-[16/10] w-full object-cover"
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Desktop Hover Image Reveal Canvas */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F6F4F0]/40 border border-[#141414]/15">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDiscipline.number}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: EDITORIAL_EASE }}
                  className="absolute inset-0"
                >
                  <img
                    src={activeDiscipline.image}
                    alt={activeDiscipline.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/55 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[#F6F4F0]">
                    <div>
                      <span className="font-sans text-[10px] tracking-[0.24em] uppercase text-[#F6F4F0]/75">
                        Discipline {activeDiscipline.number}
                      </span>
                      <p className="mt-1 font-serif text-2xl font-light">
                        {activeDiscipline.title}
                      </p>
                    </div>
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase border-b border-[#F6F4F0]/60 pb-0.5">
                      View Works
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
