import React, { useState, useEffect, useRef } from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import DossierModal from './components/DossierModal';
import NavigationHUD from './components/NavigationHUD';
import FilmOverlay from './components/FilmOverlay';
import InteractiveTypewriterModal from './components/InteractiveTypewriterModal';
import sound from './audio/SoundSystem';
import { CASE_DATA } from './data/caseData';
import { Volume2, ChevronRight, Info } from 'lucide-react';

const TOUR_SECTIONS = ['home', 'story', 'operations', 'timeline', 'commission', 'awards', 'register'];

const TOUR_CAPTIONS = {
  home: "DETECTIVE ROOM // HEADQUARTERS: The investigation into the 1999 Millennium Blackout begins here.",
  story: "CASE ZERO // THE BRIEFING: 12 substations sabotaged in 48 seconds. $184M in assets vanished.",
  operations: "CLASSIFIED OPERATIONS: Operation Overclock (Grid Sabotage) and Operation Phantom Drift (Vault Sweep).",
  timeline: "OCTOBER 24 TIMELINE: Reconstructed police dispatches and Metropolitan Chronicle news clippings.",
  commission: "THE COMMISSION: Four shadow operatives identified—The Architect, Cipher, The Siren, and The Broker.",
  awards: "FEDERAL BOUNTY: $500,000 reward for actionable intelligence leading to syndicate conviction.",
  register: "SEALED REGISTRATION: Submit your operative credentials to enter the classified ledger."
};

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [dossierTab, setDossierTab] = useState('story');
  const [isLampOn, setIsLampOn] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouring, setIsTouring] = useState(false);
  const [isTypewriterOpen, setIsTypewriterOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Guided Tour Interval
  const tourIndexRef = useRef(0);
  useEffect(() => {
    let intervalId;
    if (isTouring) {
      intervalId = setInterval(() => {
        tourIndexRef.current = (tourIndexRef.current + 1) % TOUR_SECTIONS.length;
        const nextSec = TOUR_SECTIONS[tourIndexRef.current];
        setCurrentSection(nextSec);
      }, 7000);
    }
    return () => clearInterval(intervalId);
  }, [isTouring]);

  // Keyboard Navigation Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept when user is typing in form inputs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      switch (e.key) {
        case '1':
          setCurrentSection('home');
          break;
        case '2':
          setCurrentSection('story');
          break;
        case '3':
          setCurrentSection('operations');
          break;
        case '4':
          setCurrentSection('timeline');
          break;
        case '5':
          setCurrentSection('commission');
          break;
        case '6':
          setCurrentSection('awards');
          break;
        case '7':
          setCurrentSection('register');
          break;
        case 'm':
        case 'M':
          sound.toggleMute();
          break;
        case 'l':
        case 'L':
          sound.playLampClick();
          setIsLampOn(prev => !prev);
          break;
        case 't':
        case 'T':
          setIsTouring(prev => !prev);
          break;
        case 'd':
        case 'D':
        case ' ':
          e.preventDefault();
          setIsDossierOpen(true);
          setDossierTab(currentSection === 'home' ? 'story' : currentSection);
          break;
        case 'Escape':
          if (isDossierOpen) setIsDossierOpen(false);
          else if (isTypewriterOpen) setIsTypewriterOpen(false);
          else if (currentSection !== 'home') setCurrentSection('home');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, isDossierOpen, isTypewriterOpen]);

  const handleSelectSection = (sectionId) => {
    if (isTouring) setIsTouring(false);
    setCurrentSection(sectionId);
    if (!hasInteracted) setHasInteracted(true);
  };

  const handleOpenDossier = (tabId = 'story') => {
    setDossierTab(tabId);
    setIsDossierOpen(true);
    if (!hasInteracted) setHasInteracted(true);
  };

  const handleEnterExperience = () => {
    setHasInteracted(true);
    sound.toggleMute(); // starts atmospheric noir jazz & rain crackle
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-noir-950 font-sans">
      
      {/* 3D WebGL Investigation Room Canvas */}
      <ThreeCanvas
        currentSection={currentSection}
        onSelectSection={handleSelectSection}
        onOpenDossier={handleOpenDossier}
        isLampOn={isLampOn}
        onToggleLamp={() => setIsLampOn(prev => !prev)}
        reducedMotion={reducedMotion}
      />

      {/* 1990s Film Grain & Cinematic Noir Lens Vignette */}
      <FilmOverlay reducedMotion={reducedMotion} />

      {/* Cinematic Tour Caption Bar */}
      {isTouring && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[90vw] bg-noir-950/95 border-2 border-evidence-stamp px-4 py-2.5 rounded-lg shadow-noir text-center animate-fadeIn">
          <div className="flex items-center justify-center space-x-2 text-evidence-stamp text-[11px] font-typewriter font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-evidence-stamp animate-ping" />
            <span>CINEMATIC CASE TOUR IN PROGRESS</span>
          </div>
          <p className="font-serif text-xs text-parchment-200 mt-1 leading-snug">
            {TOUR_CAPTIONS[currentSection] || TOUR_CAPTIONS.home}
          </p>
        </div>
      )}

      {/* Navigation HUD & Controls */}
      <NavigationHUD
        currentSection={currentSection}
        onSelectSection={handleSelectSection}
        onOpenDossier={handleOpenDossier}
        isLampOn={isLampOn}
        onToggleLamp={() => setIsLampOn(prev => !prev)}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(prev => !prev)}
        isTouring={isTouring}
        onToggleTour={() => setIsTouring(prev => !prev)}
      />

      {/* Full Physical Detective Dossier Modal */}
      {isDossierOpen && (
        <DossierModal
          activeTab={dossierTab}
          onClose={() => setIsDossierOpen(false)}
          onChangeTab={(tab) => setDossierTab(tab)}
        />
      )}

      {/* Interactive Typewriter Modal */}
      <InteractiveTypewriterModal
        isOpen={isTypewriterOpen}
        onClose={() => setIsTypewriterOpen(false)}
      />

      {/* First-load Noir Atmosphere Audio Banner */}
      {!hasInteracted && (
        <div className="fixed bottom-24 right-4 sm:right-8 z-40 bg-noir-900/95 border border-brass/60 p-4 rounded-lg shadow-noir max-w-xs animate-fadeIn backdrop-blur">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-brass/20 text-brass rounded">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-classified text-xs font-bold text-parchment-100 uppercase">
                ATMOSPHERIC SOUND
              </h4>
              <p className="font-serif text-xs text-parchment-300 mt-0.5 leading-tight">
                Enable 1990s noir jazz, rain on glass, and typewriter sound design.
              </p>
              <div className="mt-2.5 flex items-center space-x-2">
                <button
                  onClick={handleEnterExperience}
                  className="px-3 py-1 bg-brass hover:bg-brass-light text-noir-950 font-typewriter text-xs font-bold rounded shadow transition-colors"
                >
                  ENABLE AUDIO
                </button>
                <button
                  onClick={() => setHasInteracted(true)}
                  className="px-2 py-1 text-parchment-400 hover:text-parchment-100 font-typewriter text-xs"
                >
                  MUTE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
