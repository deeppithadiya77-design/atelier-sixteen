import React from 'react';
import { motion } from 'framer-motion';
import { PHILOSOPHY_DATA } from '../data/studioData';
import { EDITORIAL_EASE, fadeUpVariant, VIEWPORT_CONFIG } from '../utils/motion';

export default function StudioPhilosophy() {
  return (
    <section
      id="studio"
      className="bg-[#F6F4F0] text-[#141414] border-b border-[#141414]/15 py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Asymmetric Column: Manifesto & Narrative */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            className="lg:col-span-7 lg:pr-10"
          >
            <p className="font-sans text-[11px] font-medium tracking-[0.26em] uppercase text-[#7A7267]">
              {PHILOSOPHY_DATA.eyebrow}
            </p>

            <h2 className="mt-6 font-serif text-3xl font-light leading-[1.14] tracking-tight text-[#141414] sm:text-5xl lg:text-[3.35rem]">
              {PHILOSOPHY_DATA.heading}
            </h2>

            <blockquote className="mt-10 border-l border-[#141414]/25 pl-6 sm:pl-8 font-serif text-xl sm:text-2xl font-normal leading-relaxed text-[#141414]/90 italic">
              “{PHILOSOPHY_DATA.manifesto}”
            </blockquote>

            <p className="mt-8 max-w-2xl font-sans text-sm sm:text-[15px] leading-[1.85] text-[#7A7267] font-light">
              {PHILOSOPHY_DATA.supportingNote}
            </p>

            {/* Hairline Studio Metrics */}
            <div className="mt-14 grid grid-cols-3 border-t border-[#141414]/15 pt-8 gap-6">
              {PHILOSOPHY_DATA.metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="font-serif text-2xl sm:text-3xl font-normal text-[#141414]">
                    {metric.value}
                  </div>
                  <div className="mt-1.5 font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#7A7267]">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Asymmetric Column: Editorial Frame */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.95, delay: 0.12, ease: EDITORIAL_EASE }}
            className="lg:col-span-5 lg:mt-14"
          >
            <div className="overflow-hidden bg-[#D8CFC4]/40">
              <img
                src={PHILOSOPHY_DATA.image}
                alt="Minimalist tactile living space with natural stone and oak joinery"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-1000 ease-out hover:scale-[1.03]"
              />
            </div>
            <p className="mt-4 font-sans text-[11px] tracking-[0.14em] text-[#7A7267]">
              {PHILOSOPHY_DATA.caption}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
