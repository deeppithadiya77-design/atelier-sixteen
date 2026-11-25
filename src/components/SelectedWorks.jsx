import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECT_CATEGORIES, PROJECTS } from '../data/projects';
import { EDITORIAL_EASE, fadeUpVariant, VIEWPORT_CONFIG } from '../utils/motion';
import ProjectModal from './ProjectModal';

function getAspectClass(aspect, index) {
  // Creates an asymmetric architectural editorial cadence across columns
  if (aspect === 'tall') return 'aspect-[4/5]';
  if (aspect === 'landscape') return 'aspect-[16/11]';
  return index % 2 === 0 ? 'aspect-square' : 'aspect-[4/5]';
}

export default function SelectedWorks({
  activeCategory,
  onCategoryChange,
  onInquireSimilar,
}) {
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleInquireFromModal = (project) => {
    setSelectedProject(null);
    onInquireSimilar?.(project.inquiryType);
  };

  return (
    <section
      id="work"
      className="bg-[#F6F4F0] text-[#141414] border-b border-[#141414]/15 py-24 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        {/* Header + Filter Bar */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="flex flex-col gap-8 pb-12 border-b border-[#141414]/15 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="font-sans text-[11px] font-medium tracking-[0.26em] uppercase text-[#7A7267]">
              03 / Selected Works
            </p>
            <h2 className="mt-4 font-serif text-3xl font-light tracking-tight text-[#141414] sm:text-5xl">
              Curated spaces & built forms.
            </h2>
          </div>

          <div
            className="flex flex-wrap items-center gap-2 sm:gap-3"
            role="tablist"
            aria-label="Filter projects by discipline"
          >
            {PROJECT_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onCategoryChange(category)}
                  className={`cursor-pointer px-4 py-2 font-sans text-[10px] sm:text-[11px] font-medium tracking-[0.22em] uppercase transition-all duration-300 border ${
                    isSelected
                      ? 'border-[#141414] bg-[#141414] text-[#F6F4F0]'
                      : 'border-[#141414]/20 bg-transparent text-[#7A7267] hover:border-[#141414]/50 hover:text-[#141414]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Asymmetric Masonry Grid */}
        <motion.div
          layout
          className="mt-14 columns-1 gap-8 md:columns-2 lg:gap-12 space-y-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.05,
                  ease: EDITORIAL_EASE,
                }}
                className={`break-inside-avoid group cursor-pointer ${
                  index % 2 === 1 ? 'md:pt-10' : ''
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden bg-[#D8CFC4]/40">
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.location}`}
                    loading="lazy"
                    className={`w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035] ${getAspectClass(
                      project.aspect,
                      index
                    )}`}
                  />
                  <div className="absolute inset-0 bg-[#141414]/0 transition-colors duration-500 group-hover:bg-[#141414]/10" />
                  <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center bg-[#F6F4F0]/90 text-[#141414] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="mt-5 flex items-start justify-between gap-4 border-b border-[#141414]/15 pb-5">
                  <div>
                    <span className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-[#7A7267]">
                      {project.category} · {project.location}
                    </span>
                    <h3 className="mt-1.5 font-serif text-2xl sm:text-3xl font-normal text-[#141414] transition-opacity group-hover:opacity-75">
                      {project.title}
                    </h3>
                  </div>
                  <span className="mt-1 font-sans text-[11px] tracking-[0.16em] text-[#7A7267]">
                    {project.year}
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Full-Screen Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquireSimilar={handleInquireFromModal}
      />
    </section>
  );
}
