import React, { useState } from 'react';
import { CASE_DATA } from '../data/caseData';
import sound from '../audio/SoundSystem';
import confetti from 'canvas-confetti';
import {
  X,
  FileText,
  Shield,
  Clock,
  Users,
  Award,
  Send,
  Volume2,
  VolumeX,
  Printer,
  Stamp,
  CheckCircle2,
  ExternalLink,
  Lock,
  Radio,
  FileSearch
} from 'lucide-react';

export default function DossierModal({
  activeTab = 'story',
  onClose,
  onChangeTab
}) {
  const [stampedSolved, setStampedSolved] = useState(false);
  const [isWiretapPlaying, setIsWiretapPlaying] = useState(false);
  const [activeOp, setActiveOp] = useState(0); // 0: Overclock, 1: Phantom Drift
  const [activeSuspect, setActiveSuspect] = useState(0);

  // Registration Form State
  const [regForm, setRegForm] = useState({
    callsign: '',
    specialty: 'Cryptanalysis & Signals',
    clearance: 'Level 4 - Field Agent',
    statement: '',
    agreed: false
  });
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [operativeId, setOperativeId] = useState('');

  const handleTabChange = (tabId) => {
    sound.playPaperRustle();
    onChangeTab(tabId);
  };

  const handleStampAction = () => {
    sound.playStamp();
    setStampedSolved(prev => !prev);
  };

  const toggleWiretap = () => {
    sound.playTapeClick();
    setIsWiretapPlaying(prev => !prev);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regForm.callsign.trim()) return;

    sound.playStamp();
    const generatedId = `BC-${Math.floor(1000 + Math.random() * 9000)}-${regForm.callsign.slice(0, 3).toUpperCase()}`;
    setOperativeId(generatedId);
    setRegSubmitted(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#cba358', '#b91c1c', '#f5eee6']
      });
    } catch (_) {}
  };

  const tabs = [
    { id: 'story', label: '01. CASE ZERO', icon: FileText },
    { id: 'operations', label: '02. OPERATIONS', icon: Shield },
    { id: 'timeline', label: '03. TIMELINE', icon: Clock },
    { id: 'commission', label: '04. THE COMMISSION', icon: Users },
    { id: 'awards', label: '05. AWARDS', icon: Award },
    { id: 'register', label: '06. REGISTER', icon: Send }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-noir-950/85 backdrop-blur-md animate-fadeIn">
      {/* Dossier Outer Manila Shell */}
      <div className="relative w-full max-w-5xl h-[88vh] bg-[#bfa175] rounded-lg shadow-dossier border-2 border-[#8e6e44] flex flex-col overflow-hidden text-noir-900 transition-all duration-300">
        
        {/* Manila Folder Top Tab Bar */}
        <div className="bg-[#a88a5e] border-b border-[#7d5d36] px-4 pt-3 flex items-center justify-between flex-wrap gap-2 select-none">
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-t-md text-xs font-typewriter tracking-wider uppercase transition-all duration-150 ${
                    isActive
                      ? 'bg-parchment-100 text-noir-950 font-bold border-t-2 border-l-2 border-r-2 border-[#7d5d36] shadow-sm -mb-px'
                      : 'bg-[#987b50] text-parchment-100/90 hover:bg-[#a28458]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dossier Action Buttons */}
          <div className="flex items-center space-x-2 pb-1">
            <button
              onClick={handleStampAction}
              title="Apply Case Stamp"
              className="flex items-center space-x-1 px-2.5 py-1 text-xs font-classified uppercase bg-evidence-stamp/20 text-evidence-stamp border border-evidence-stamp/40 rounded hover:bg-evidence-stamp/30 transition-colors"
            >
              <Stamp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{stampedSolved ? 'STAMPED' : 'STAMP FILE'}</span>
            </button>

            <button
              onClick={onClose}
              title="Close Dossier"
              className="p-1.5 bg-[#8e6e44] hover:bg-burgundy-700 text-parchment-100 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dossier Inner Parchment Container */}
        <div className="relative flex-1 bg-parchment-100 overflow-y-auto p-4 sm:p-8 font-serif select-text custom-dossier-scroll">
          
          {/* Watermark & Stamp Overlays */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5 select-none overflow-hidden">
            <span className="font-classified text-8xl md:text-9xl font-black text-noir-950 tracking-widest -rotate-45">
              CLASSIFIED
            </span>
          </div>

          {/* Stamped Evidence Seal if clicked */}
          {stampedSolved && (
            <div className="pointer-events-none absolute top-12 right-12 border-4 border-evidence-stamp border-double px-6 py-2 rounded-md -rotate-12 animate-pulse-subtle z-20">
              <span className="font-classified text-xl sm:text-2xl font-black text-evidence-stamp tracking-wider block text-center">
                EVIDENCE VERIFIED
              </span>
              <span className="font-typewriter text-[10px] text-evidence-stamp block text-center">
                SPECIAL CARTEL BUREAU // VANCE
              </span>
            </div>
          )}

          {/* Dossier Header */}
          <div className="border-b-2 border-noir-900/30 pb-4 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-noir-900 text-parchment-100 text-[10px] font-typewriter px-2 py-0.5 rounded tracking-widest uppercase">
                  CLASSIFICATION: LEVEL 5 RESTRICTED
                </span>
                <span className="text-evidence-stamp text-xs font-mono font-bold tracking-widest">
                  CASE REF: #1999-NY-09B
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-headline font-black text-noir-950 mt-1 uppercase tracking-tight">
                {activeTab === 'story' && 'CASE ZERO: THE METROPOLITAN BLACKOUT'}
                {activeTab === 'operations' && 'CARTEL OPERATIONS DOSSIER'}
                {activeTab === 'timeline' && 'OCTOBER 24, 1999 // DISPATCH TIMELINE'}
                {activeTab === 'commission' && 'THE COMMISSION // ROGUES GALLERY'}
                {activeTab === 'awards' && 'FEDERAL BOUNTY & RECOVERED EVIDENCE'}
                {activeTab === 'register' && 'CLASSIFIED OPERATIVE REGISTRATION'}
              </h1>
            </div>

            <div className="text-right font-typewriter text-xs text-noir-700">
              <p>INVESTIGATOR: <strong className="text-noir-950">DET. M. VANCE</strong></p>
              <p>STATUS: <span className="text-evidence-stamp font-bold">UNRESOLVED</span></p>
            </div>
          </div>

          {/* TAB 1: STORY / CASE ZERO */}
          {activeTab === 'story' && (
            <div className="space-y-6">
              <div className="p-4 bg-parchment-200/60 rounded border-l-4 border-noir-900 font-typewriter text-sm sm:text-base leading-relaxed text-noir-900">
                <p className="font-bold text-noir-950 mb-2">CASE BRIEFING // MEMORANDUM FOR RECORD:</p>
                <p>{CASE_DATA.story.overview}</p>
              </div>

              {/* Wiretap Audio Intercept Player */}
              <div className="p-4 bg-noir-900 text-parchment-100 rounded-md shadow-noir border border-brass/40 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${isWiretapPlaying ? 'bg-evidence-stamp animate-pulse' : 'bg-noir-800 border border-brass/30'}`}>
                    <Radio className="w-6 h-6 text-parchment-100" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono text-brass font-bold">WIRETAP TAPE #09 [BELL ATLANTIC REEL]</span>
                      {isWiretapPlaying && (
                        <span className="text-[10px] bg-evidence-stamp px-1.5 py-0.2 rounded text-white font-mono uppercase tracking-widest animate-pulse">
                          PLAYING
                        </span>
                      )}
                    </div>
                    <p className="font-typewriter text-xs text-parchment-300 mt-0.5">
                      "Frequency modulation detected at Substation 4... wait, did the line just drop?"
                    </p>
                  </div>
                </div>

                <button
                  onClick={toggleWiretap}
                  className="px-4 py-2 bg-brass hover:bg-brass-light text-noir-950 font-typewriter text-xs font-bold rounded flex items-center space-x-2 transition-colors whitespace-nowrap"
                >
                  {isWiretapPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isWiretapPlaying ? 'STOP WIRETAP' : 'LISTEN TO INTERCEPT'}</span>
                </button>
              </div>

              {/* Investigation Notes & Evidence List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <h3 className="font-typewriter text-sm font-bold tracking-wider text-noir-900 border-b border-noir-300 pb-1 mb-3 uppercase">
                    PRIMARY DETECTIVE NOTES
                  </h3>
                  <ul className="space-y-3 font-serif text-sm text-noir-800 list-disc list-inside">
                    {CASE_DATA.story.investigationNotes.map((note, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {note}
                      </li>
                    ))}
                  </ul>

                  <blockquote className="mt-5 p-3 italic bg-parchment-300/40 border-l-2 border-brass-dark font-serif text-xs text-noir-900">
                    {CASE_DATA.story.detectiveLog}
                  </blockquote>
                </div>

                <div>
                  <h3 className="font-typewriter text-sm font-bold tracking-wider text-noir-900 border-b border-noir-300 pb-1 mb-3 uppercase">
                    PHYSICAL EVIDENCE CATALOG
                  </h3>
                  <div className="space-y-2.5">
                    {CASE_DATA.story.evidenceSnippets.map((ev) => (
                      <div key={ev.id} className="p-3 bg-parchment-200/70 border border-noir-300/60 rounded flex items-start justify-between">
                        <div>
                          <span className="font-typewriter text-xs font-bold text-evidence-stamp">{ev.id}</span>
                          <h4 className="font-serif font-bold text-sm text-noir-950">{ev.label}</h4>
                          <p className="text-xs font-typewriter text-noir-700">RECOVERED: {ev.location}</p>
                        </div>
                        <span className="text-[10px] bg-noir-800 text-parchment-200 font-mono px-2 py-0.5 rounded">
                          EVIDENCE LOCKER B
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OPERATIONS */}
          {activeTab === 'operations' && (
            <div className="space-y-6">
              {/* Operations Sub-Tabs */}
              <div className="flex space-x-3 border-b border-noir-300 pb-2">
                {CASE_DATA.operations.map((op, idx) => (
                  <button
                    key={op.id}
                    onClick={() => {
                      sound.playPaperRustle();
                      setActiveOp(idx);
                    }}
                    className={`px-4 py-2 rounded font-typewriter text-xs tracking-wider uppercase transition-all ${
                      activeOp === idx
                        ? 'bg-noir-900 text-parchment-100 font-bold shadow-md'
                        : 'bg-parchment-200 text-noir-800 hover:bg-parchment-300'
                    }`}
                  >
                    {op.codename}
                  </button>
                ))}
              </div>

              {/* Active Operation Dossier */}
              {(() => {
                const op = CASE_DATA.operations[activeOp];
                return (
                  <div className="p-6 bg-parchment-200/80 rounded border-2 border-noir-400 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-noir-400 pb-3 gap-2">
                      <div>
                        <span className="text-xs font-typewriter text-evidence-stamp font-bold">
                          {op.classification}
                        </span>
                        <h2 className="text-2xl font-headline font-black text-noir-950">{op.codename}</h2>
                      </div>
                      <span className="px-3 py-1 bg-noir-800 text-brass text-xs font-mono font-bold rounded">
                        {op.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-serif text-sm">
                      <div>
                        <h4 className="font-typewriter text-xs font-bold uppercase text-noir-900">PRIMARY TARGET:</h4>
                        <p className="text-noir-800 mt-0.5 font-bold">{op.target}</p>
                      </div>
                      <div>
                        <h4 className="font-typewriter text-xs font-bold uppercase text-noir-900">LEAD OPERATIVE:</h4>
                        <p className="text-evidence-stamp font-typewriter font-bold mt-0.5">{op.leadOperative}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-typewriter text-xs font-bold uppercase text-noir-900 mb-1">
                        EXECUTION METHODOLOGY:
                      </h4>
                      <p className="font-serif text-sm leading-relaxed text-noir-900 bg-parchment-100 p-3 rounded border border-noir-300">
                        {op.methodology}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-typewriter text-xs font-bold uppercase text-noir-900 mb-2">
                        DOSSIER LOG ENTRIES:
                      </h4>
                      <ul className="space-y-1.5 list-disc list-inside font-typewriter text-xs text-noir-800">
                        {op.dossierNotes.map((note, nIdx) => (
                          <li key={nIdx}>{note}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-noir-400/50 flex items-center justify-between">
                      <span className="font-typewriter text-xs text-noir-700">ASSESSED IMPACT:</span>
                      <span className="font-typewriter text-xs font-bold text-evidence-stamp">{op.lootAssessed}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 3: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <p className="font-typewriter text-xs text-noir-700 uppercase tracking-wider mb-2">
                RECONSTRUCTED CHRONOLOGY // DISPATCH LOG & NEWSPAPER ARCHIVE
              </p>

              <div className="relative border-l-2 border-noir-800 ml-4 sm:ml-8 pl-4 sm:pl-6 space-y-6">
                {CASE_DATA.timeline.map((entry, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timestamp Dot */}
                    <div className="absolute -left-[27px] sm:-left-[35px] top-1 w-4 h-4 rounded-full bg-noir-900 border-2 border-parchment-100 group-hover:bg-evidence-stamp transition-colors" />

                    <div className="p-4 bg-parchment-200/90 rounded border border-noir-300 shadow-sm transition-all hover:bg-parchment-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-typewriter text-xs font-bold bg-noir-900 text-parchment-100 px-2 py-0.5 rounded">
                            {entry.time}
                          </span>
                          <span className="font-typewriter text-xs text-noir-600 font-bold">{entry.date}</span>
                        </div>
                        <span className="font-classified text-xs font-bold text-evidence-stamp border border-evidence-stamp px-2 py-0.5 rounded uppercase">
                          {entry.stamp}
                        </span>
                      </div>

                      <h3 className="font-headline text-lg font-bold text-noir-950 mt-1">{entry.headline}</h3>
                      <p className="font-serif text-sm text-noir-800 mt-1.5 leading-relaxed">{entry.description}</p>
                      <div className="mt-2 pt-2 border-t border-noir-300/50 font-typewriter text-[11px] text-noir-600">
                        SOURCE RECORD: {entry.source}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: THE COMMISSION */}
          {activeTab === 'commission' && (
            <div className="space-y-6">
              {/* Suspect Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CASE_DATA.commission.map((suspect, idx) => (
                  <button
                    key={suspect.id}
                    onClick={() => {
                      sound.playCameraShutter();
                      setActiveSuspect(idx);
                    }}
                    className={`p-3 rounded border text-left transition-all ${
                      activeSuspect === idx
                        ? 'bg-noir-900 text-parchment-100 border-brass shadow-md'
                        : 'bg-parchment-200 text-noir-900 border-noir-300 hover:bg-parchment-300'
                    }`}
                  >
                    <div className="font-classified text-xs font-bold tracking-widest text-evidence-stamp">
                      SUSPECT #{idx + 1}
                    </div>
                    <div className="font-typewriter text-xs font-black truncate mt-1">{suspect.alias}</div>
                    <div className="font-typewriter text-[10px] text-parchment-300/70 truncate">{suspect.role}</div>
                  </button>
                ))}
              </div>

              {/* Detailed Suspect Dossier Card */}
              {(() => {
                const s = CASE_DATA.commission[activeSuspect];
                return (
                  <div className="p-6 bg-parchment-200/90 rounded border-2 border-noir-800 shadow-noir grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Simulated Polaroid Mugshot */}
                    <div className="bg-[#f0ebe0] p-4 rounded shadow-md border border-noir-300 text-center flex flex-col items-center">
                      <div className="w-full aspect-square bg-noir-950 rounded flex items-center justify-center p-4 relative overflow-hidden">
                        <Users className="w-20 h-20 text-noir-700" />
                        <span className="absolute bottom-2 left-2 text-[10px] font-mono text-evidence-stamp">
                          REC: 10/24/99 23:43
                        </span>
                      </div>
                      <p className="font-typewriter font-bold text-sm text-noir-950 mt-3">{s.alias}</p>
                      <p className="font-typewriter text-xs text-evidence-stamp uppercase">{s.clearance}</p>
                      <p className="font-mono text-[10px] text-noir-600 mt-1">STATUS: {s.status}</p>
                    </div>

                    {/* Suspect Information */}
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <span className="text-xs font-typewriter text-evidence-stamp font-bold">CLASSIFIED DOSSIER</span>
                        <h2 className="text-2xl font-headline font-black text-noir-950">{s.alias}</h2>
                        <p className="text-xs font-typewriter text-noir-700">REAL IDENTITY: {s.realName}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 font-typewriter text-xs">
                        <div className="p-2 bg-parchment-100 rounded border border-noir-300">
                          <span className="text-noir-600 block">ROLE:</span>
                          <strong className="text-noir-950">{s.role}</strong>
                        </div>
                        <div className="p-2 bg-parchment-100 rounded border border-noir-300">
                          <span className="text-noir-600 block">ORIGIN / BASE:</span>
                          <strong className="text-noir-950">{s.origin}</strong>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-typewriter text-xs font-bold uppercase text-noir-900 mb-1">
                          OPERATIONAL PROFILE:
                        </h4>
                        <p className="font-serif text-sm text-noir-900 leading-relaxed bg-parchment-100 p-3 rounded border border-noir-300">
                          {s.dossier}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-typewriter text-xs font-bold uppercase text-noir-900 mb-1">
                          KNOWN EVIDENCE & CLUES:
                        </h4>
                        <ul className="space-y-1 list-disc list-inside font-typewriter text-xs text-noir-800">
                          {s.clues.map((c, cIdx) => (
                            <li key={cIdx}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 5: AWARDS */}
          {activeTab === 'awards' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CASE_DATA.awards.map((award, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-parchment-200/90 rounded border-2 border-noir-800 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="border-b border-noir-300 pb-2 mb-3">
                        <span className="text-[10px] font-typewriter text-noir-600 uppercase block">
                          {award.issuer}
                        </span>
                        <h3 className="font-headline text-lg font-black text-noir-950 mt-0.5">{award.title}</h3>
                      </div>

                      <div className="my-3 py-2 px-3 bg-burgundy-900 text-parchment-100 rounded text-center">
                        <span className="font-classified text-xl font-bold tracking-wider">{award.amount}</span>
                      </div>

                      <p className="font-serif text-xs text-noir-800 leading-relaxed">{award.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-noir-300 flex items-center justify-between">
                      <span className="font-typewriter text-[10px] text-noir-600">TERMS: {award.terms}</span>
                      <span className="font-classified text-[11px] font-bold text-evidence-stamp uppercase border border-evidence-stamp px-1.5 py-0.5 rounded">
                        {award.stamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: REGISTER / CLASSIFIED OPERATIVE REGISTRATION */}
          {activeTab === 'register' && (
            <div className="max-w-2xl mx-auto">
              {!regSubmitted ? (
                <form onSubmit={handleRegisterSubmit} className="space-y-5 bg-parchment-200/90 p-6 rounded border-2 border-noir-800 shadow-noir">
                  <div className="border-b border-noir-400 pb-3">
                    <span className="text-xs font-typewriter text-evidence-stamp font-bold">
                      ENROLLMENT // TELEGRAM PROTOCOL #1999
                    </span>
                    <h2 className="text-2xl font-headline font-black text-noir-950">
                      SUBMIT OPERATIVE CREDENTIALS
                    </h2>
                    <p className="font-serif text-xs text-noir-700 mt-1">
                      Register your alias into THE BREACH CARTEL archive. Successful applicants will receive an authorized operative clearance credential.
                    </p>
                  </div>

                  <div>
                    <label className="block font-typewriter text-xs font-bold text-noir-900 uppercase mb-1">
                      OPERATIVE CALLSIGN / ALIAS *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. PHANTOM, SHADOW_09, VANGUARD"
                      value={regForm.callsign}
                      onChange={(e) => setRegForm({ ...regForm, callsign: e.target.value })}
                      onKeyDown={() => sound.playTypewriterKey()}
                      className="w-full px-3 py-2 bg-parchment-50 border-2 border-noir-600 rounded font-typewriter text-sm text-noir-950 focus:outline-none focus:border-evidence-stamp shadow-inner"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-typewriter text-xs font-bold text-noir-900 uppercase mb-1">
                        FIELD SPECIALTY
                      </label>
                      <select
                        value={regForm.specialty}
                        onChange={(e) => setRegForm({ ...regForm, specialty: e.target.value })}
                        className="w-full px-3 py-2 bg-parchment-50 border-2 border-noir-600 rounded font-typewriter text-xs text-noir-950 focus:outline-none"
                      >
                        <option>Cryptanalysis & Signals</option>
                        <option>Physical Infrastructure & Lockout</option>
                        <option>Social Engineering & Infiltration</option>
                        <option>Financial Forensics & Clearing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-typewriter text-xs font-bold text-noir-900 uppercase mb-1">
                        REQUESTED CLEARANCE LEVEL
                      </label>
                      <select
                        value={regForm.clearance}
                        onChange={(e) => setRegForm({ ...regForm, clearance: e.target.value })}
                        className="w-full px-3 py-2 bg-parchment-50 border-2 border-noir-600 rounded font-typewriter text-xs text-noir-950 focus:outline-none"
                      >
                        <option>Level 3 - Informant / Wire</option>
                        <option>Level 4 - Field Agent</option>
                        <option>Level 5 - Cartel Special Envoy</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-typewriter text-xs font-bold text-noir-900 uppercase mb-1">
                      EVIDENCE SUBMISSION / ACTION STATEMENT
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Detail your findings regarding Substation 4 or the Depository Vault..."
                      value={regForm.statement}
                      onChange={(e) => setRegForm({ ...regForm, statement: e.target.value })}
                      onKeyDown={() => sound.playTypewriterKey()}
                      className="w-full px-3 py-2 bg-parchment-50 border-2 border-noir-600 rounded font-typewriter text-xs text-noir-950 focus:outline-none focus:border-evidence-stamp shadow-inner"
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="agree"
                      required
                      checked={regForm.agreed}
                      onChange={(e) => setRegForm({ ...regForm, agreed: e.target.checked })}
                      className="accent-evidence-stamp w-4 h-4 rounded"
                    />
                    <label htmlFor="agree" className="font-typewriter text-xs text-noir-800">
                      I solemnly affirm fidelity to the classified investigation of CASE ZERO.
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-evidence-stamp hover:bg-red-800 text-parchment-100 font-typewriter text-sm font-bold tracking-widest uppercase rounded shadow-md transition-all flex items-center justify-center space-x-2"
                    >
                      <Stamp className="w-4 h-4" />
                      <span>SIGN & STAMP OPERATIVE DOSSIER</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Authenticated Operative ID Card */
                <div className="bg-parchment-50 p-6 rounded-lg border-4 border-double border-noir-900 shadow-noir text-noir-950 space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b-2 border-noir-900 pb-3">
                    <div>
                      <span className="font-typewriter text-[10px] tracking-widest uppercase text-evidence-stamp font-bold">
                        OFFICIAL CLEARANCE CREDENTIAL
                      </span>
                      <h3 className="font-headline text-2xl font-black">THE BREACH CARTEL</h3>
                    </div>
                    <div className="border-2 border-evidence-stamp px-3 py-1 -rotate-6">
                      <span className="font-classified text-sm font-black text-evidence-stamp tracking-wider">
                        APPROVED
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-typewriter text-xs py-2">
                    <div>
                      <span className="text-noir-600 block">OPERATIVE CALLSIGN:</span>
                      <strong className="text-base text-noir-950">{regForm.callsign.toUpperCase()}</strong>
                    </div>
                    <div>
                      <span className="text-noir-600 block">ID IDENTIFIER:</span>
                      <strong className="text-base text-evidence-stamp font-mono">{operativeId}</strong>
                    </div>
                    <div>
                      <span className="text-noir-600 block">SPECIALTY:</span>
                      <strong>{regForm.specialty}</strong>
                    </div>
                    <div>
                      <span className="text-noir-600 block">CLEARANCE TIER:</span>
                      <strong>{regForm.clearance}</strong>
                    </div>
                  </div>

                  <p className="font-serif italic text-xs text-noir-800 border-t border-noir-300 pt-3">
                    "Welcome to the investigation, operative. The city will remember what transpired on October 24, 1999."
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => setRegSubmitted(false)}
                      className="font-typewriter text-xs text-noir-700 underline hover:text-noir-950"
                    >
                      SUBMIT ANOTHER DOSSIER
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 bg-noir-900 text-parchment-100 font-typewriter text-xs font-bold rounded flex items-center space-x-1.5 hover:bg-noir-800 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>PRINT DOSSIER BADGE</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dossier Footer Information Bar */}
        <div className="bg-[#a88a5e] border-t border-[#7d5d36] px-6 py-2.5 flex items-center justify-between text-xs font-typewriter text-noir-950">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-evidence-stamp inline-block" />
            <span>CASE ARCHIVE: DETECTIVE ROOM // 1999</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <span>PRESS [ESC] TO CLOSE</span>
            <span>PRESS [M] TO TOGGLE AUDIO</span>
          </div>
        </div>

      </div>
    </div>
  );
}
