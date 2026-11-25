import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../data/studioData';
import { EDITORIAL_EASE, fadeUpVariant, VIEWPORT_CONFIG } from '../utils/motion';

export default function DesignProcess() {
  return (
    <section
      id="process"
      className="bg-[#D8CFC4] text-[#141414] border-b border-[#141414]/15 py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pb-14"
        >
          <div>
            <p className="font-sans text-[11px] font-medium tracking-[0.26em] uppercase text-[#7A7267]">
              04 / Design Process
            </p>
            <h2 className="mt-4 font-serif text-3xl font-light tracking-tight text-[#141414] sm:text-5xl">
              From first sketch to final quietude.
            </h2>
          </div>
          <p className="max-w-sm font-sans text-xs sm:text-sm leading-relaxed text-[#141414]/75 font-light">
            A structured four-phase methodology ensuring clarity, craft discipline, and tranquil execution.
          </p>
        </motion.div>

        {/* Minimal 4-Column Hairline-Bordered Grid */}
        <div className="grid grid-cols-1 border border-[#141414]/15 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#141414]/15 bg-[#F6F4F0]/35">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{
                duration: 0.75,
                delay: index * 0.08,
                ease: EDITORIAL_EASE,
              }}
              className={`flex flex-col justify-between p-8 sm:p-9 lg:min-h-[310px] ${
                index >= 2 ? 'sm:border-t lg:border-t-0 border-[#141414]/15' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs font-medium tracking-[0.22em] text-[#7A7267]">
                  {step.number}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#141414]/35" />
              </div>

              <div className="mt-12 sm:mt-16">
                <h3 className="font-serif text-2xl sm:text-[1.7rem] font-normal tracking-tight text-[#141414]">
                  {step.title}
                </h3>
                <p className="mt-4 font-sans text-xs sm:text-[13px] leading-[1.8] text-[#141414]/75 font-light">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
