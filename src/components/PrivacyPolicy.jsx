import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin } from 'lucide-react';
import { STUDIO_CONTACT } from '../config/leadFormConfig';
import { EDITORIAL_EASE } from '../utils/motion';

const POLICY_SECTIONS = [
  {
    title: '01. Information We Collect',
    body: 'When you submit a consultation request through our website, Meta Lead Ads, or direct messaging channels, we collect the details you voluntarily provide: your full name, phone or WhatsApp number, email address, project typology, city/site location, approximate area, and indicative budget range.',
  },
  {
    title: '02. How We Use Your Information',
    body: 'Your information is used strictly to evaluate project fit, prepare preliminary architectural or interior design consultation notes, schedule discovery calls, and communicate with you regarding your inquiry. Atelier Sixteen never sells, rents, or trades client contact details to third-party marketers.',
  },
  {
    title: '03. Data Storage & Third-Party Processors',
    body: 'Consultation submissions may be securely routed through encrypted form-processing services (such as Web3Forms or Google Workspace spreadsheets) and direct communication platforms (such as WhatsApp Business or Meta Platforms) solely for studio client-relationship management.',
  },
  {
    title: '04. Data Retention & Your Rights',
    body: `You may request access to, correction of, or deletion of your personal inquiry records at any time by writing to ${STUDIO_CONTACT.email}. We retain inquiry records only for as long as necessary to support active or prospective architectural consultations.`,
  },
  {
    title: '05. Cookies & Analytics',
    body: 'This website prioritizes quiet, minimal data collection. Essential browser storage or anonymized traffic insights may be used to ensure reliable site performance and measure inquiry campaign effectiveness.',
  },
];

export default function PrivacyPolicy({ onBackHome }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EDITORIAL_EASE }}
      className="min-h-[85vh] bg-[#F6F4F0] text-[#141414] pt-36 pb-24 sm:pb-32"
    >
      <div className="mx-auto max-w-[920px] px-6 sm:px-10">
        <button
          type="button"
          onClick={onBackHome}
          className="cursor-pointer inline-flex items-center gap-2 font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#7A7267] hover:text-[#141414] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          Return to Atelier Sixteen
        </button>

        <div className="mt-10 pb-10 border-b border-[#141414]/15">
          <p className="font-sans text-[10px] font-medium tracking-[0.26em] uppercase text-[#7A7267]">
            Legal & Meta Lead Ads Compliance
          </p>
          <h1 className="mt-4 font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#141414]">
            Privacy Policy
          </h1>
          <p className="mt-4 font-sans text-xs tracking-[0.14em] uppercase text-[#7A7267]">
            Effective Date: January 1, 2026 · {STUDIO_CONTACT.brandName}
          </p>
        </div>

        <div className="divide-y divide-[#141414]/15">
          {POLICY_SECTIONS.map((sec) => (
            <section key={sec.title} className="py-8 sm:py-10">
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#141414]">
                {sec.title}
              </h2>
              <p className="mt-4 font-sans text-sm leading-[1.85] text-[#7A7267] font-light">
                {sec.body}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-8 border border-[#141414]/15 bg-[#D8CFC4]/35 p-6 sm:p-8 space-y-4">
          <span className="block font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#7A7267]">
            Privacy Contact
          </span>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {STUDIO_CONTACT.addresses.map((loc) => (
              <div key={loc.label}>
                <span className="block font-sans text-[10px] tracking-[0.18em] uppercase text-[#7A7267]">
                  {loc.label}
                </span>
                <a
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-1 inline-flex items-start gap-1.5 font-sans text-xs leading-relaxed text-[#141414]"
                >
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7A7267] group-hover:text-[#141414] transition-colors" strokeWidth={1.5} />
                  <span className="underline underline-offset-4 decoration-[#141414]/25 group-hover:decoration-[#141414]/70 transition-colors">
                    {loc.line}
                  </span>
                </a>
              </div>
            ))}
          </div>
          <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-[#141414]">
            <a
              href={`mailto:${STUDIO_CONTACT.email}`}
              className="underline underline-offset-4 decoration-[#141414]/35"
            >
              {STUDIO_CONTACT.email}
            </a>
            <a href={`tel:${STUDIO_CONTACT.phoneDisplay.replace(/\s+/g, '')}`}>
              {STUDIO_CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
