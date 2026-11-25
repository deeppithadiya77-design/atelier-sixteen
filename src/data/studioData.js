/**
 * Atelier Sixteen — Editorial Copy, Disciplines, Process & Form Options
 */

export const HERO_DATA = {
  eyebrow: 'INTERIOR | ARCHITECTURE | LANDSCAPE',
  headline: 'Spaces that feel timeless, intentional, and refined.',
  subcopy:
    'An architectural and interior design studio shaping quiet, tactile environments rooted in proportion, natural light, and enduring materiality.',
  backgroundImage:
    'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=2000&q=85',
  primaryCta: 'Explore Selected Works',
  secondaryCta: 'Book Consultation',
};

export const PHILOSOPHY_DATA = {
  eyebrow: '01 / Studio Philosophy',
  heading: 'Architecture as quiet atmosphere, felt before it is noticed.',
  manifesto:
    'Atelier Sixteen is built around the idea that good design is not only visual, but experiential. Every space should respond to the people who inhabit it through thoughtful planning, materiality, detail, and atmosphere.',
  supportingNote:
    'Working across private residences, boutique commercial spaces, and contemplative landscapes, we approach every commission with restraint—allowing raw stone, timber, shadow, and proportion to speak without excess.',
  image:
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
  caption: 'Material honesty — Travertine, smoked oak, and hand-troweled lime plaster.',
  metrics: [
    { label: 'Disciplines', value: '03' },
    { label: 'Approach', value: 'Bespoke' },
    { label: 'Ethos', value: 'Timeless' },
  ],
};

export const DISCIPLINES_DATA = [
  {
    number: '01',
    title: 'Interior Design',
    subtitle: 'Spatial curation, bespoke joinery & tactile materiality',
    description:
      'Complete interior architecture for private residences and refined commercial spaces—balancing natural light, custom furniture, acoustic calm, and enduring surfaces.',
    deliverables: ['Spatial Planning', 'Bespoke Millwork', 'FF&E Curation', 'Lighting Design'],
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85',
    filterCategory: 'Interior',
  },
  {
    number: '02',
    title: 'Architecture',
    subtitle: 'Ground-up residences, structural clarity & climate response',
    description:
      'Context-driven architectural design rooted in site topography, passive cooling, and honest structural expression—from urban townhouses to coastal villas.',
    deliverables: ['Concept Architecture', 'Structural Coordination', 'Facade & Envelope', 'Site Supervision'],
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
    filterCategory: 'Architecture',
  },
  {
    number: '03',
    title: 'Landscape & Concept',
    subtitle: 'Courtyards, native ecology & outdoor living sanctuaries',
    description:
      'Quiet outdoor environments that blur the boundary between built form and nature—integrating local stone, water elements, and seasonal botanical compositions.',
    deliverables: ['Masterplanning', 'Courtyard Gardens', 'Hardscape Detailing', 'Planting Strategy'],
    image:
      'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=1000&q=85',
    filterCategory: 'Landscape',
  },
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'Deep listening, site immersion, and lifestyle mapping to establish clear spatial priorities, architectural constraints, and project scope.',
  },
  {
    number: '02',
    title: 'Concept & Materiality',
    description:
      'Translating intent into spatial layouts, light studies, 3D volumes, and curated tactile material boards of stone, timber, and textiles.',
  },
  {
    number: '03',
    title: 'Detailing',
    description:
      'Rigorous technical drawings, custom joinery specifications, MEP coordination, and artisan prototyping to safeguard design integrity on site.',
  },
  {
    number: '04',
    title: 'Handover',
    description:
      'Curated execution reviews, final styling, bespoke object placement, and an effortless transition into a space ready to be lived in.',
  },
];

export const FORM_OPTIONS = {
  projectTypes: [
    {
      id: 'Apartment',
      label: 'Apartment',
      note: 'Penthouses, city residences & bespoke renovations',
    },
    {
      id: 'Villa/Bungalow',
      label: 'Villa / Bungalow',
      note: 'Ground-up homes, holiday retreats & estates',
    },
    {
      id: 'Commercial',
      label: 'Commercial',
      note: 'Boutique hospitality, galleries & flagship studios',
    },
    {
      id: 'Landscape',
      label: 'Landscape',
      note: 'Courtyards, terrace gardens & masterplanning',
    },
  ],
  budgetRanges: [
    '₹35L – ₹60L',
    '₹60L – ₹1.2 Cr',
    '₹1.2 Cr – ₹2.5 Cr',
    '₹2.5 Cr+',
  ],
  areaPresets: ['Under 1,500', '1,500 – 3,000', '3,000 – 5,000', '5,000+'],
};
