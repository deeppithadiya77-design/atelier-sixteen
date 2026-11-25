import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import AtelierLogo from './AtelierLogo';
import { STUDIO_CONTACT } from '../config/leadFormConfig';
import { EDITORIAL_EASE } from '../utils/motion';

const NAV_LINKS = [
  { label: 'Work', targetId: 'work' },
  { label: 'Disciplines', targetId: 'disciplines' },
  { label: 'Process', targetId: 'process' },
  { label: 'Studio', targetId: 'studio' },
];

export default function Navbar({ isPrivacyRoute, onNavigateHome, onNavigateSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 48);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const solid = isScrolled || isPrivacyRoute;
  const tone = solid ? 'dark' : 'light';

  const handleLinkClick = (targetId) => {
    setMobileOpen(false);
    onNavigateSection(targetId);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          solid
            ? 'bg-[#F6F4F0]/95 backdrop-blur-md border-b border-[#141414]/15 text-[#141414]'
            : 'bg-transparent border-b border-transparent text-[#F6F4F0]'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 sm:px-10 lg:px-16">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onNavigateHome();
            }}
            className="cursor-pointer focus:outline-none"
            aria-label="Atelier Sixteen Home"
          >
            <AtelierLogo tone={tone} size={32} />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10" aria-label="Primary navigation">
            {NAV_LINKS.map((item) => (
              <button
                key={item.targetId}
                type="button"
                onClick={() => handleLinkClick(item.targetId)}
                className={`group relative cursor-pointer font-sans text-[11px] font-medium tracking-[0.22em] uppercase transition-colors duration-300 ${
                  solid
                    ? 'text-[#141414]/80 hover:text-[#141414]'
                    : 'text-[#F6F4F0]/85 hover:text-[#F6F4F0]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full ${
                    solid ? 'bg-[#141414]' : 'bg-[#F6F4F0]'
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <button
              type="button"
              onClick={() => handleLinkClick('consultation')}
              className={`cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 font-sans text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 border ${
                solid
                  ? 'border-[#141414] bg-[#141414] text-[#F6F4F0] hover:bg-transparent hover:text-[#141414]'
                  : 'border-[#F6F4F0]/70 bg-transparent text-[#F6F4F0] hover:bg-[#F6F4F0] hover:text-[#141414]'
              }`}
            >
              Book Consultation
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={`lg:hidden cursor-pointer p-2 transition-colors ${
              solid ? 'text-[#141414]' : 'text-[#F6F4F0]'
            }`}
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EDITORIAL_EASE }}
            className="fixed inset-0 z-50 lg:hidden bg-[#141414]/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
              onClick={(e) => e.stopPropagation()}
              className="ml-auto flex h-full w-full max-w-sm flex-col justify-between bg-[#F6F4F0] px-7 py-7 text-[#141414] border-l border-[#141414]/15"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#141414]/15">
                  <AtelierLogo tone="dark" size={28} showTagline={false} />
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="cursor-pointer p-1.5 text-[#141414]"
                    aria-label="Close navigation menu"
                  >
                    <X className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                </div>

                <nav className="mt-10 flex flex-col divide-y divide-[#141414]/15" aria-label="Mobile navigation">
                  {NAV_LINKS.map((item, idx) => (
                    <button
                      key={item.targetId}
                      type="button"
                      onClick={() => handleLinkClick(item.targetId)}
                      className="cursor-pointer flex items-center justify-between py-5 text-left group"
                    >
                      <span className="font-serif text-3xl font-normal tracking-tight text-[#141414] group-hover:translate-x-1.5 transition-transform duration-300">
                        {item.label}
                      </span>
                      <span className="font-sans text-[11px] tracking-[0.2em] text-[#7A7267]">
                        0{idx + 1}
                      </span>
                    </button>
                  ))}
                </nav>

                <button
                  type="button"
                  onClick={() => handleLinkClick('consultation')}
                  className="mt-8 w-full cursor-pointer inline-flex items-center justify-center gap-2 bg-[#141414] px-6 py-4 font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-[#F6F4F0] hover:bg-[#141414]/90 transition-colors"
                >
                  Book Consultation
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              <div className="pt-6 border-t border-[#141414]/15 flex flex-col gap-2 text-xs text-[#7A7267]">
                <span className="font-sans tracking-[0.18em] uppercase text-[10px]">
                  Studio Inquiries
                </span>
                <a
                  href={`mailto:${STUDIO_CONTACT.email}`}
                  className="text-[#141414] hover:opacity-70 transition-opacity"
                >
                  {STUDIO_CONTACT.email}
                </a>
                <a
                  href={STUDIO_CONTACT.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#7A7267] hover:text-[#141414] transition-colors"
                >
                  Instagram {STUDIO_CONTACT.instagramHandle}
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
