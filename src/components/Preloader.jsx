import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogoGridMark } from './AtelierLogo';
import { EDITORIAL_EASE } from '../utils/motion';

export default function Preloader({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      key="atelier-preloader"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.65, ease: EDITORIAL_EASE },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F6F4F0] text-[#141414]"
      aria-label="Loading Atelier Sixteen"
    >
      <div className="flex flex-col items-center gap-6">
        <LogoGridMark size={52} tone="dark" animated />

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: EDITORIAL_EASE }}
          className="flex flex-col items-center text-center"
        >
          <span className="font-sans text-xs font-medium tracking-[0.34em] uppercase text-[#141414]">
            ATELIER SIXTEEN
          </span>
          <span className="mt-2 font-sans text-[9px] tracking-[0.26em] uppercase text-[#7A7267]">
            INTERIOR | ARCHITECTURE | LANDSCAPE
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
