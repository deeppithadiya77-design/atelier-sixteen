import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../config/leadFormConfig';
import { EDITORIAL_EASE } from '../utils/motion';

export default function WhatsAppFloatButton() {
  return (
    <motion.a
      href={buildWhatsAppUrl({})}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat directly on WhatsApp with Atelier Sixteen"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: EDITORIAL_EASE }}
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-30 inline-flex items-center gap-2.5 border border-[#F6F4F0]/25 bg-[#141414] px-4 py-3 sm:px-5 sm:py-3.5 text-[#F6F4F0] shadow-lg transition-all duration-300 hover:bg-[#F6F4F0] hover:text-[#141414] hover:border-[#141414]"
    >
      <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.6} />
      <span className="font-sans text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase">
        WhatsApp Us
      </span>
      <ArrowUpRight className="hidden sm:block h-3.5 w-3.5" strokeWidth={1.5} />
    </motion.a>
  );
}
