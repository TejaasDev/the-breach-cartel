import React from 'react';

export default function FilmOverlay({ reducedMotion = false }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 select-none overflow-hidden">
      {/* Heavy Cinematic Noir Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, transparent 40%, rgba(10, 8, 7, 0.45) 75%, rgba(6, 5, 4, 0.88) 100%)'
        }}
      />

      {/* Atmospheric Warm Tint Gradient (1990s incandescent glow) */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background:
            'linear-gradient(135deg, rgba(203, 163, 88, 0.12) 0%, transparent 60%, rgba(74, 14, 23, 0.25) 100%)'
        }}
      />

      {/* Film Grain Noise Overlay via SVG Data URL */}
      {!reducedMotion && (
        <div
          className="absolute inset-0 opacity-[0.065] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        />
      )}

      {/* Subtle Scanlines effect */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.6) 2px, rgba(0, 0, 0, 0.6) 4px)'
        }}
      />
    </div>
  );
}
