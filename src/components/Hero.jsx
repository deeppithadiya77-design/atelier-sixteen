import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { HERO_DATA } from '../data/studioData';
import { EDITORIAL_EASE } from '../utils/motion';

export default function Hero({ onExploreWorks, onBookConsultation }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-[#141414] text-[#F6F4F0]"
    >
      {/* Curated Minimalist Interior Backdrop */}
      <motion.div
        initial={{ scale: 1.07, opacity: 0.85 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: EDITORIAL_EASE }}
        className="absolute inset-0"
      >
        <img
          src={HERO_DATA.backgroundImage}
          alt="Minimalist architectural living room bathed in natural daylight"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/60 via-[#141414]/35 to-[#141414]/80" />
      </motion.div>

      {/* Editorial Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-14 pt-36 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EDITORIAL_EASE }}
              className="mb-5 font-sans text-[10px] sm:text-[11px] font-medium tracking-[0.3em] uppercase text-[#F6F4F0]/80"
            >
              {HERO_DATA.eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.25, ease: EDITORIAL_EASE }}
              className="font-serif text-4xl font-light leading-[1.06] tracking-[-0.015em] text-[#F6F4F0] sm:text-6xl lg:text-[4.5rem]"
            >
              Spaces that feel <span className="italic font-normal">timeless</span>, intentional, and refined.
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: EDITORIAL_EASE }}
            className="lg:col-span-4 lg:pb-2"
          >
            <p className="font-sans text-sm leading-relaxed text-[#F6F4F0]/80 font-light">
              {HERO_DATA.subcopy}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreWorks}
                className="cursor-pointer inline-flex items-center gap-2.5 bg-[#F6F4F0] px-6 py-3.5 font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-[#141414] transition-colors duration-300 hover:bg-[#D8CFC4]"
              >
                {HERO_DATA.primaryCta}
                <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>

              <button
                type="button"
                onClick={onBookConsultation}
                className="cursor-pointer inline-flex items-center gap-2 border border-[#F6F4F0]/60 px-6 py-3.5 font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-[#F6F4F0] transition-colors duration-300 hover:bg-[#F6F4F0]/10 hover:border-[#F6F4F0]"
              >
                {HERO_DATA.secondaryCta}
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
