import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Section1PreDebut from './sections/Section1PreDebut';
import Section2TheJourney from './sections/Section2TheJourney';
import Section3Wrapped from './sections/Section3Wrapped';
import Section4Messages from './sections/Section4Messages';
import NavigationDots from './components/NavigationDots';
import { eras } from './utils/eras';
import './index.css';

function App() {
  const [currentEra, setCurrentEra] = useState('intro');

  useEffect(() => {
    // A simple observer to change background colors based on section in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const eraId = entry.target.dataset.era;
            if (eraId && eraId !== 'outro' && eraId !== 'predebut') {
              setCurrentEra(eraId);
              const eraData = eras.find(e => e.id === eraId);
              if (eraData) {
                document.documentElement.style.setProperty('--bg-color', eraData.colors.bg);
                document.documentElement.style.setProperty('--text-color', eraData.colors.text);
                document.documentElement.style.setProperty('--accent-color', eraData.colors.accent);
              }
            } else if (entry.target.id === 'section-predebut' || eraId === 'predebut') {
              setCurrentEra('predebut');
              document.documentElement.style.setProperty('--bg-color', '#000000');
              document.documentElement.style.setProperty('--text-color', '#ffffff');
            } else if (entry.target.id === 'section-wrapped' || entry.target.id === 'section-messages' || eraId === 'outro') {
              setCurrentEra('outro');
              document.documentElement.style.setProperty('--bg-color', '#0f0f11');
              document.documentElement.style.setProperty('--text-color', '#f4f4f5');
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "-10% 0px -20% 0px" }
    );

    const sections = document.querySelectorAll('.observe-section');
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="film-grain"></div>
      <NavigationDots currentEra={currentEra} eras={eras} />

      <main>
        <Section1PreDebut />
        <Section2TheJourney eras={eras} />
        <Section3Wrapped />
        <Section4Messages />
      </main>
    </>
  );
}

export default App;
