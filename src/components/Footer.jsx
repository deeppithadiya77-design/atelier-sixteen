import React from 'react';
import { ArrowUpRight, MapPin, MessageCircle } from 'lucide-react';
import AtelierLogo from './AtelierLogo';
import { buildWhatsAppUrl, STUDIO_CONTACT } from '../config/leadFormConfig';

const CURRENT_YEAR = new Date().getFullYear();

function InstagramIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer({ onNavigateSection, onOpenPrivacy }) {
  const handlePrivacyClick = (e) => {
    e.preventDefault();
    onOpenPrivacy?.();
  };

  return (
    <footer className="bg-[#141414] text-[#F6F4F0] border-t border-[#F6F4F0]/15">
      <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 pb-14 border-b border-[#F6F4F0]/15">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <AtelierLogo tone="light" size={34} />
            <p className="mt-6 max-w-sm font-sans text-xs sm:text-sm leading-relaxed text-[#F6F4F0]/65 font-light">
              Architecture, interior design, and landscape practice shaping calm, enduring environments across residential and boutique commercial spaces.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3">
            <span className="block font-sans text-[10px] font-medium tracking-[0.24em] uppercase text-[#F6F4F0]/50">
              Practice
            </span>
            <ul className="mt-5 space-y-3">
              {[
                { label: 'Selected Works', id: 'work' },
                { label: 'Disciplines', id: 'disciplines' },
                { label: 'Design Process', id: 'process' },
                { label: 'Studio Philosophy', id: 'studio' },
                { label: 'Book Consultation', id: 'consultation' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigateSection(link.id)}
                    className="cursor-pointer font-sans text-xs tracking-[0.12em] text-[#F6F4F0]/80 hover:text-[#F6F4F0] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social Column */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="block font-sans text-[10px] font-medium tracking-[0.24em] uppercase text-[#F6F4F0]/50">
                Studio & Inquiries
              </span>
              <div className="mt-4 space-y-4 font-sans text-xs text-[#F6F4F0]/80 font-light">
                {STUDIO_CONTACT.addresses.map((loc) => (
                  <div key={loc.label}>
                    <span className="block font-sans text-[10px] tracking-[0.18em] uppercase text-[#F6F4F0]/50">
                      {loc.label}
                    </span>
                    <a
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-1 inline-flex items-start gap-2 leading-relaxed text-[#F6F4F0]/80 hover:text-[#F6F4F0] transition-colors"
                    >
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F6F4F0]/50 group-hover:text-[#F6F4F0] transition-colors" strokeWidth={1.5} />
                      <span className="underline underline-offset-4 decoration-[#F6F4F0]/20 group-hover:decoration-[#F6F4F0]/70 transition-colors">
                        {loc.line}
                      </span>
                    </a>
                  </div>
                ))}

                <div className="pt-1 space-y-1.5">
                  <p>
                    <a
                      href={`mailto:${STUDIO_CONTACT.email}`}
                      className="hover:text-[#F6F4F0] underline underline-offset-4 decoration-[#F6F4F0]/30 transition-colors"
                    >
                      {STUDIO_CONTACT.email}
                    </a>
                  </p>
                  <p>
                    <a
                      href={`tel:${STUDIO_CONTACT.phoneDisplay.replace(/\s+/g, '')}`}
                      className="hover:text-[#F6F4F0] transition-colors"
                    >
                      Call / WhatsApp: {STUDIO_CONTACT.phoneDisplay}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <span className="block font-sans text-[10px] font-medium tracking-[0.24em] uppercase text-[#F6F4F0]/50">
                Connect & Follow
              </span>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a
                  href={buildWhatsAppUrl({})}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-[#F6F4F0] bg-[#F6F4F0] px-4 py-2.5 font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-[#141414] transition-colors hover:bg-transparent hover:text-[#F6F4F0]"
                >
                  <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.6} />
                  WhatsApp Direct
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>

                <a
                  href={STUDIO_CONTACT.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-[#F6F4F0]/20 px-4 py-2.5 font-sans text-[11px] tracking-[0.18em] uppercase text-[#F6F4F0] transition-colors hover:bg-[#F6F4F0] hover:text-[#141414]"
                >
                  <InstagramIcon className="h-3.5 w-3.5" />
                  {STUDIO_CONTACT.instagramHandle}
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-sans text-[11px] text-[#F6F4F0]/55">
          <p>© {CURRENT_YEAR} {STUDIO_CONTACT.brandName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="/privacy-policy"
              onClick={handlePrivacyClick}
              className="hover:text-[#F6F4F0] underline underline-offset-4 decoration-[#F6F4F0]/25 transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-[#F6F4F0]/30">|</span>
            <span className="tracking-[0.14em] uppercase text-[10px]">
              {STUDIO_CONTACT.tagline}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
