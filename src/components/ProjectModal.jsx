import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { EDITORIAL_EASE } from '../utils/motion';

export default function ProjectModal({ project, onClose, onInquireSimilar }) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-detail-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EDITORIAL_EASE }}
          className="fixed inset-0 z-50 overflow-y-auto bg-[#F6F4F0] text-[#141414]"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          {/* Sticky Modal Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#141414]/15 bg-[#F6F4F0]/95 px-6 py-5 backdrop-blur-md sm:px-10 lg:px-16">
            <div className="flex items-center gap-4">
              <span className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-[#7A7267]">
                Selected Works / {project.category}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer inline-flex items-center gap-2 border border-[#141414]/20 px-4 py-2 font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#141414] transition-colors hover:bg-[#141414] hover:text-[#F6F4F0]"
            >
              Close
              <X className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Modal Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EDITORIAL_EASE }}
            className="mx-auto max-w-[1320px] px-6 py-12 sm:px-10 sm:py-16 lg:px-16"
          >
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="font-sans text-[11px] font-medium tracking-[0.24em] uppercase text-[#7A7267]">
                  {project.location}
                </p>
                <h2 className="mt-3 font-serif text-4xl font-light tracking-tight text-[#141414] sm:text-6xl">
                  {project.title}
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="font-sans text-sm leading-relaxed text-[#7A7267] font-light">
                  {project.summary}
                </p>
              </div>
            </div>

            {/* Project Specifications Bar */}
            <div className="mt-10 grid grid-cols-2 gap-6 border-y border-[#141414]/15 py-6 sm:grid-cols-4">
              <div>
                <span className="block font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#7A7267]">
                  Location
                </span>
                <span className="mt-1.5 block font-serif text-xl text-[#141414]">
                  {project.location}
                </span>
              </div>
              <div>
                <span className="block font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#7A7267]">
                  Area
                </span>
                <span className="mt-1.5 block font-serif text-xl text-[#141414]">
                  {project.area}
                </span>
              </div>
              <div>
                <span className="block font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#7A7267]">
                  Year
                </span>
                <span className="mt-1.5 block font-serif text-xl text-[#141414]">
                  {project.year}
                </span>
              </div>
              <div>
                <span className="block font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#7A7267]">
                  Discipline
                </span>
                <span className="mt-1.5 block font-serif text-xl text-[#141414]">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Main & Secondary Visual Plates */}
            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8 overflow-hidden bg-[#D8CFC4]/40">
                <img
                  src={project.gallery?.[0] || project.image}
                  alt={project.title}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <div className="lg:col-span-4 flex flex-col justify-between gap-8">
                {project.gallery?.[1] && (
                  <div className="overflow-hidden bg-[#D8CFC4]/40">
                    <img
                      src={project.gallery[1]}
                      alt={`${project.title} material detail`}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                )}

                <div className="border-t border-[#141414]/15 pt-6">
                  <span className="block font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#7A7267]">
                    Material Palette
                  </span>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.materialPalette.map((material) => (
                      <li
                        key={material}
                        className="border border-[#141414]/20 bg-[#D8CFC4]/30 px-3 py-1.5 font-sans text-[11px] tracking-[0.12em] text-[#141414]"
                      >
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Narrative + CTA */}
            <div className="mt-12 grid grid-cols-1 gap-8 border-t border-[#141414]/15 pt-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <span className="block font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#7A7267]">
                  Architectural Notes
                </span>
                <p className="mt-3 max-w-3xl font-sans text-sm sm:text-base leading-[1.85] text-[#141414]/85 font-light">
                  {project.description}
                </p>
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <button
                  type="button"
                  onClick={() => onInquireSimilar(project)}
                  className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#141414] px-7 py-4 font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-[#F6F4F0] transition-colors hover:bg-[#141414]/85"
                >
                  Inquire About a Similar Project
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
