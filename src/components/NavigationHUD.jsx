import React, { useState, useEffect } from 'react';
import sound from '../audio/SoundSystem';
import {
  Volume2,
  VolumeX,
  Compass,
  FileSearch,
  Lightbulb,
  Eye,
  Play,
  Pause,
  HelpCircle,
  FolderOpen
} from 'lucide-react';

export default function NavigationHUD({
  currentSection,
  onSelectSection,
  onOpenDossier,
  isLampOn,
  onToggleLamp,
  reducedMotion,
  onToggleReducedMotion,
  isTouring,
  onToggleTour
}) {
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [vuLevel, setVuLevel] = useState(0);
  const [showHelp, setShowHelp] = useState(false);

  // Monitor audio levels for retro VU indicator
  useEffect(() => {
    let animId;
    const updateVU = () => {
      setVuLevel(sound.getAudioLevel());
      animId = requestAnimationFrame(updateVU);
    };
    animId = requestAnimationFrame(updateVU);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const navItems = [
    { id: 'home', label: 'HOME', number: '01' },
    { id: 'story', label: 'THE STORY', number: '02' },
    { id: 'operations', label: 'OPERATIONS', number: '03' },
    { id: 'timeline', label: 'TIMELINE', number: '04' },
    { id: 'commission', label: 'THE COMMISSION', number: '05' },
    { id: 'awards', label: 'AWARDS', number: '06' },
    { id: 'register', label: 'REGISTER', number: '07' }
  ];

  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-noir-950/90 via-noir-950/70 to-transparent p-3 sm:p-5 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Classification Title */}
          <div className="pointer-events-auto flex items-center space-x-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded border-2 border-brass/70 bg-noir-900/90 flex items-center justify-center shadow-noir backdrop-blur">
              <span className="font-classified text-brass font-black text-sm sm:text-base">BC</span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-typewriter text-[10px] tracking-widest text-evidence-stamp uppercase font-bold">
                  CASE ZERO // THE BLACKOUT
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-evidence-stamp animate-ping" />
              </div>
              <h1 className="font-classified text-base sm:text-xl font-bold tracking-widest text-parchment-100 uppercase">
                THE BREACH CARTEL
              </h1>
            </div>
          </div>

          {/* Quick Controls: Audio, Lamp, Tour, Help */}
          <div className="pointer-events-auto flex items-center space-x-2 sm:space-x-3">
            
            {/* Guided Tour Mode Toggle */}
            <button
              onClick={onToggleTour}
              title="Cinematic Case Tour"
              className={`px-3 py-1.5 rounded border text-xs font-typewriter tracking-wider uppercase flex items-center space-x-1.5 shadow-sm transition-all ${
                isTouring
                  ? 'bg-evidence-stamp text-parchment-100 border-red-500 animate-pulse'
                  : 'bg-noir-900/90 text-parchment-200 border-brass/40 hover:bg-noir-800'
              }`}
            >
              {isTouring ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{isTouring ? 'PAUSE TOUR' : 'CINEMATIC TOUR'}</span>
            </button>

            {/* Lamp Toggle */}
            <button
              onClick={() => {
                sound.playLampClick();
                onToggleLamp();
              }}
              title={isLampOn ? 'Turn Off Desk Lamp' : 'Turn On Desk Lamp'}
              className={`p-2 rounded border transition-colors ${
                isLampOn
                  ? 'bg-brass text-noir-950 border-brass shadow-lamp'
                  : 'bg-noir-900/90 text-parchment-400 border-noir-700 hover:text-parchment-100'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
            </button>

            {/* Audio Toggle with VU Bar */}
            <div className="flex items-center bg-noir-900/90 border border-brass/40 rounded px-2 py-1 space-x-2">
              <button
                onClick={handleToggleMute}
                title={isMuted ? 'Unmute Noir Audio' : 'Mute Audio'}
                className="text-brass hover:text-brass-light transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-noir-500" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Retro VU Meter Display */}
              <div className="hidden sm:flex items-center space-x-0.5 h-3 w-8">
                {[0.1, 0.3, 0.5, 0.7, 0.9].map((thresh, i) => (
                  <div
                    key={i}
                    className={`w-1 h-full rounded-xs transition-colors duration-75 ${
                      !isMuted && vuLevel > thresh
                        ? i >= 3
                          ? 'bg-evidence-stamp'
                          : 'bg-brass'
                        : 'bg-noir-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Open Dossier Button */}
            <button
              onClick={() => {
                sound.playPaperRustle();
                onOpenDossier(currentSection === 'home' ? 'story' : currentSection);
              }}
              title="Inspect Detective Dossier"
              className="px-3 py-1.5 bg-burgundy-900 hover:bg-burgundy-800 border border-burgundy-600 text-parchment-100 font-typewriter text-xs tracking-wider uppercase rounded flex items-center space-x-1.5 shadow-md transition-all"
            >
              <FolderOpen className="w-3.5 h-3.5 text-brass" />
              <span className="hidden sm:inline">READ DOSSIER</span>
            </button>

            {/* Help / Guide */}
            <button
              onClick={() => setShowHelp(prev => !prev)}
              title="Help & Investigation Controls"
              className="p-2 bg-noir-900/90 text-parchment-300 hover:text-parchment-100 border border-noir-700 rounded transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Bottom Navigation Bar (Camera Travel Hub) */}
      <nav className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-5xl w-[94vw] bg-noir-950/90 border border-brass/50 rounded-xl shadow-noir backdrop-blur-md p-1.5 sm:p-2.5">
        <div className="flex items-center justify-between overflow-x-auto scrollbar-none gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playPaperRustle();
                  onSelectSection(item.id);
                }}
                className={`relative flex-1 min-w-[70px] sm:min-w-[100px] py-1.5 sm:py-2 px-2 rounded font-typewriter text-xs tracking-wider uppercase transition-all duration-200 text-center ${
                  isActive
                    ? 'bg-brass text-noir-950 font-black shadow-md scale-[1.03]'
                    : 'text-parchment-300 hover:text-parchment-100 hover:bg-noir-800/80'
                }`}
              >
                <span className="block text-[9px] opacity-75 font-mono mb-0.5">
                  [{item.number}]
                </span>
                <span className="block truncate text-[11px] sm:text-xs font-bold">
                  {item.label}
                </span>

                {isActive && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-evidence-stamp shadow-sm" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-noir-900 border-2 border-brass/60 rounded-lg max-w-md w-full p-6 text-parchment-200 shadow-noir font-typewriter text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-brass/30 pb-2">
              <h3 className="font-classified text-sm font-bold text-brass uppercase">
                INVESTIGATION ROOM MANUAL
              </h3>
              <button
                onClick={() => setShowHelp(false)}
                className="text-parchment-400 hover:text-parchment-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-serif text-sm">
              <p>
                Welcome to the classified headquarters investigating <strong>CASE ZERO: THE BLACKOUT</strong>.
              </p>
              <ul className="space-y-2 list-disc list-inside font-typewriter text-xs text-parchment-300">
                <li><strong>Click Navigation (1-7):</strong> Camera moves in 3D to each clue area on the board.</li>
                <li><strong>Click Clues Directly:</strong> Click any pinned folder, photo, or clipping on the board to examine.</li>
                <li><strong>Banker's Lamp:</strong> Click the lamp or top switch to toggle office lighting.</li>
                <li><strong>Dossier Mode:</strong> Click "READ DOSSIER" to read physical case documents, turn pages, and stamp files.</li>
                <li><strong>Noir Music:</strong> Click the speaker icon to enable vinyl rain & jazz noir atmosphere.</li>
                <li><strong>Keyboard Shortcuts:</strong> Press 1 to 7 to navigate sections, ESC to return to home, M to toggle sound.</li>
              </ul>
            </div>

            <div className="pt-2 border-t border-brass/30 flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={onToggleReducedMotion}
                  className="accent-brass"
                />
                <span className="text-[11px] text-parchment-300">Reduced Motion Mode</span>
              </label>

              <button
                onClick={() => setShowHelp(false)}
                className="px-4 py-1.5 bg-brass text-noir-950 font-bold rounded hover:bg-brass-light"
              >
                DISMISS
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
