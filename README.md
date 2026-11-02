# THE BREACH CARTEL // CASE ZERO: THE BLACKOUT
### Interactive 3D Noir Detective Investigation Experience

Welcome to the classified headquarters of **THE BREACH CARTEL**. This interactive 3D web experience transports visitors into a 1990s detective investigation room investigating **CASE ZERO: THE BLACKOUT** — the legendary October 24, 1999 metropolitan grid collapse and Federal Depository heist.

---

## 🔍 Features & Architecture

### 1. 3D Detective Environment (Three.js WebGL)
- **Investigation Corkboard**: Heavy mahogany wooden frame with realistic cork texture, pinned case folders, suspect polaroid mugshots, *Metropolitan Chronicle* newspaper clippings, $500,000 federal bounty notices, and wax-sealed evidence envelopes.
- **3D Red Strings**: Dynamic catenary curves linking suspects, evidence, operations, and timelines across the board.
- **Detective Desk**: Dark oak desk featuring a classic 1990s green Banker's Lamp (interactive click-to-toggle lighting), mechanical Remington typewriter, wiretap reel-to-reel cassette recorder with spinning spools, ashtray with smoldering ember, and coffee mug.
- **Atmospheric Lighting & Dust**: Volumetric lamp cone with 300 floating dust motes caught in the warm incandescent beam, slatted Venetian blinds projecting cool streetlamp shadows from the window, and subtle light flicker.

### 2. Cinematic Camera Waypoints
Seamlessly travel between clues with cinematic easing:
1. **[01] Home**: Wide atmospheric panoramic shot of the desk, lamp, and full investigation board.
2. **[02] The Story**: Extreme close-up on the central **CASE ZERO** manila dossier.
3. **[03] Operations**: Glides to the two classified operation folders (*Operation Overclock* & *Operation Phantom Drift*).
4. **[04] Timeline**: Sweeps right to read the chronological *Metropolitan Chronicle* clippings and police scanner dispatches.
5. **[05] The Commission**: Tilts up across the suspect rogues' gallery (*The Architect*, *Cipher*, *The Siren*, *The Broker*).
6. **[06] Awards**: Focuses on the $500,000 Federal Bounty and recovered magnetic disc assets.
7. **[07] Register**: Dives down onto the desk typewriter and sealed wax envelope.

### 3. Detective Dossier Experience (Physical Inspection)
- Physical manila folder with tabbed sections, coffee ring stains, classification watermarks, and paperclip attachments.
- **Interactive Stamp Tool**: Apply tactile `EVIDENCE VERIFIED` / `CLASSIFIED` stamps with deep rubber thud sounds.
- **Playable Wiretap Intercept**: Listen to intercepted Bell Atlantic frequency anomaly tape recordings with animated radio waves.
- **Operative Registration Telex**: Register your alias and field specialty to receive an official classified Operative ID Badge with printable credential.

### 4. Self-Contained Procedural Noir Audio Engine (Web Audio API)
- **100% Zero External File Dependencies**:
  - Melancholic 1990s noir jazz chord progressions (Rhodes minor 9ths).
  - Vinyl record crackle & pops at 33 RPM.
  - Distant rain on office glass.
  - Mechanical typewriter strikes and carriage bell dings.
  - Tactile paper rustle and folder slide acoustics.
  - Rubber stamp thuds, 35mm camera shutter snaps, and brass pushpin clicks.
- **Audio HUD**: Visible mute/unmute control, volume control, and animated retro LED VU meter.

---

## 🕹️ Controls & Navigation

| Control | Action |
| :--- | :--- |
| **Mouse Hover** | Highlights clues and targets with detective inspection reticle |
| **Click Clue** | Flies camera to evidence and opens detailed dossier inspection |
| **1 – 7 Keys** | Jump directly between camera waypoints |
| **D or Space** | Open / Close the physical Detective Dossier |
| **L Key** | Toggle Banker's Desk Lamp light |
| **M Key** | Toggle Noir Atmospheric Music & Vinyl Sound |
| **T Key** | Toggle Guided Cinematic Documentary Tour |
| **ESC** | Return to wide room view / Close modal |

---

## 🚀 Getting Started

```bash
# Navigate to project directory
cd "/home/tejaas/Desktop/tejaas/THE BREACH CARTEL"

# Install dependencies (already installed)
npm install

# Start Vite dev server
npm run dev

# Or run production preview
npm run preview
```
Open [http://localhost:5173](http://localhost:5173) in your browser.
