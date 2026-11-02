import React, { useState, useEffect, useRef } from 'react';
import sound from '../audio/SoundSystem';
import { X, Printer, RotateCcw } from 'lucide-react';

export default function InteractiveTypewriterModal({ isOpen, onClose }) {
  const [typedText, setTypedText] = useState(
    'THE BREACH CARTEL // CASE ZERO\nOCTOBER 24, 1999 — 23:42 EST\n\nINVESTIGATOR LOG: SUBSTATION 4 BREACHED.\n'
  );
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sound.playCarriageReturn();
    } else if (e.key.length === 1 || e.key === 'Backspace') {
      sound.playTypewriterKey();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#1e1e22] border-4 border-[#3a3a40] rounded-xl shadow-noir p-6 text-parchment-100 flex flex-col">
        
        {/* Typewriter Top Plate */}
        <div className="flex items-center justify-between border-b border-noir-700 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-600 shadow-sm" />
            <span className="font-classified text-xs font-bold text-brass tracking-wider">
              REMINGTON NOIR-1999 MECHANICAL TYPEWRITER
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-parchment-400 hover:text-parchment-100 p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Paper Sheet in Carriage */}
        <div className="relative bg-[#f8f3e3] text-noir-950 rounded p-6 shadow-inner border border-[#d6cca8] min-h-[320px] flex flex-col">
          <div className="text-right font-typewriter text-[10px] text-noir-500 mb-2">
            CONFIDENTIAL NOTEPAD // CASE #1999-NY-09B
          </div>

          <textarea
            ref={textareaRef}
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your detective notes or telegram here..."
            className="w-full flex-1 bg-transparent resize-none border-none outline-none font-typewriter text-sm text-noir-900 leading-relaxed custom-dossier-scroll"
          />

          <div className="mt-4 pt-3 border-t border-noir-300/60 flex items-center justify-between text-xs font-typewriter text-noir-600">
            <span>TYPE ON YOUR KEYBOARD TO HEAR MECHANICAL KEYS</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  sound.playPaperRustle();
                  setTypedText('');
                }}
                className="px-2 py-1 bg-noir-200 hover:bg-noir-300 rounded flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>CLEAR PAPER</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-2 py-1 bg-noir-900 text-parchment-100 rounded flex items-center space-x-1"
              >
                <Printer className="w-3 h-3" />
                <span>PRINT</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
