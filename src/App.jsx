import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StudioPhilosophy from './components/StudioPhilosophy';
import DisciplinesShowcase from './components/DisciplinesShowcase';
import SelectedWorks from './components/SelectedWorks';
import DesignProcess from './components/DesignProcess';
import ConsultationForm from './components/ConsultationForm';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';

function getIsPrivacyPath() {
  if (typeof window === 'undefined') return false;
  return window.location.pathname.replace(/\/+$/, '') === '/privacy-policy';
}

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isPrivacyRoute, setIsPrivacyRoute] = useState(getIsPrivacyPath);
  const [workCategory, setWorkCategory] = useState('All');
  const [preselectState, setPreselectState] = useState({ type: '', version: 0 });

  useEffect(() => {
    const handlePopState = () => {
      setIsPrivacyRoute(getIsPrivacyPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const scrollNow = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (getIsPrivacyPath()) {
      window.history.pushState({}, '', '/');
      setIsPrivacyRoute(false);
      setTimeout(scrollNow, 80);
    } else {
      scrollNow();
    }
  }, []);

  const handleNavigateHome = useCallback(() => {
    if (getIsPrivacyPath()) {
      window.history.pushState({}, '', '/');
      setIsPrivacyRoute(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleOpenPrivacy = useCallback(() => {
    if (!getIsPrivacyPath()) {
      window.history.pushState({}, '', '/privacy-policy');
      setIsPrivacyRoute(true);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectDiscipline = useCallback(
    (category) => {
      setWorkCategory(category);
      scrollToSection('work');
    },
    [scrollToSection]
  );

  const handleInquireSimilar = useCallback(
    (inquiryType) => {
      setPreselectState((prev) => ({
        type: inquiryType,
        version: prev.version + 1,
      }));
      setTimeout(() => scrollToSection('consultation'), 120);
    },
    [scrollToSection]
  );

  return (
    <div className="min-h-screen bg-[#F6F4F0] text-[#141414] font-sans">
      <AnimatePresence>
        {showPreloader && (
          <Preloader onComplete={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>

      <Navbar
        isPrivacyRoute={isPrivacyRoute}
        onNavigateHome={handleNavigateHome}
        onNavigateSection={scrollToSection}
      />

      {isPrivacyRoute ? (
        <PrivacyPolicy onBackHome={handleNavigateHome} />
      ) : (
        <main>
          <Hero
            onExploreWorks={() => scrollToSection('work')}
            onBookConsultation={() => scrollToSection('consultation')}
          />
          <StudioPhilosophy />
          <DisciplinesShowcase onSelectDiscipline={handleSelectDiscipline} />
          <SelectedWorks
            activeCategory={workCategory}
            onCategoryChange={setWorkCategory}
            onInquireSimilar={handleInquireSimilar}
          />
          <DesignProcess />
          <ConsultationForm
            key={preselectState.version}
            preselectedType={preselectState.type}
          />
        </main>
      )}

      <Footer
        onNavigateSection={scrollToSection}
        onOpenPrivacy={handleOpenPrivacy}
      />
    </div>
  );
}
