import * as THREE from 'three';

/**
 * Procedural Canvas Texture Generators for 1990s Detective Elements
 * Generates ultra-crisp, authentic vintage textures without external images
 */

export function createCorkTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Base warm cork color
  ctx.fillStyle = '#9c6f44';
  ctx.fillRect(0, 0, 1024, 1024);

  // Cork speckles and pores
  for (let i = 0; i < 40000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const size = Math.random() * 2.5 + 0.5;
    const tone = Math.random();
    
    if (tone < 0.35) {
      ctx.fillStyle = 'rgba(74, 48, 26, 0.45)'; // dark speck
    } else if (tone < 0.7) {
      ctx.fillStyle = 'rgba(184, 137, 92, 0.35)'; // light speck
    } else {
      ctx.fillStyle = 'rgba(125, 87, 52, 0.4)'; // medium speck
    }
    ctx.fillRect(x, y, size, size);
  }

  // Large subtle cork agglomerate patches
  for (let i = 0; i < 600; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const rx = Math.random() * 16 + 4;
    const ry = Math.random() * 16 + 4;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(70, 42, 20, 0.15)' : 'rgba(215, 168, 120, 0.12)';
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // Vignette
  const grad = ctx.createRadialGradient(512, 512, 300, 512, 512, 700);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, 'rgba(0,0,0,0.5)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function createWoodTexture(dark = false) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = dark ? '#1e110a' : '#321c10';
  ctx.fillRect(0, 0, 512, 512);

  // Wood grain lines
  ctx.strokeStyle = dark ? 'rgba(15, 8, 4, 0.6)' : 'rgba(25, 14, 8, 0.45)';
  for (let y = 0; y < 512; y += 2) {
    ctx.beginPath();
    ctx.lineWidth = Math.random() * 2 + 1;
    ctx.moveTo(0, y + (Math.random() - 0.5) * 3);
    for (let x = 50; x <= 512; x += 50) {
      ctx.lineTo(x, y + Math.sin(x * 0.02 + y * 0.05) * 4 + (Math.random() - 0.5) * 2);
    }
    ctx.stroke();
  }

  // Subtle wood knots
  for (let k = 0; k < 4; k++) {
    const kx = Math.random() * 400 + 50;
    const ky = Math.random() * 400 + 50;
    const grad = ctx.createRadialGradient(kx, ky, 2, kx, ky, 35);
    grad.addColorStop(0, dark ? '#0a0502' : '#180c06');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(kx, ky, 35, 18, Math.random() * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function createFolderTexture(color = '#b08b59', label = 'CASE ZERO', stamp = 'TOP SECRET') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 680;
  const ctx = canvas.getContext('2d');

  // Manila paper base
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 512, 680);

  // Tab shape at the top right
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, 512, 40);

  // Subtle paper grain
  for (let i = 0; i < 15000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 680;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  // Folder creasing & shadows
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(15, 0, 4, 680); // fold line

  // Printed border / label plate
  ctx.strokeStyle = 'rgba(50, 30, 15, 0.6)';
  ctx.lineWidth = 3;
  ctx.strokeRect(40, 70, 432, 540);
  ctx.strokeRect(45, 75, 422, 530);

  // Folder Label
  ctx.fillStyle = '#1c140d';
  ctx.font = 'bold 30px "Courier Prime", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SPECIAL INVESTIGATION', 256, 120);

  ctx.font = 'bold 22px "Courier Prime", monospace';
  ctx.fillText('FILE REF: #1999-NY-09B', 256, 155);

  ctx.strokeStyle = '#1c140d';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(70, 175);
  ctx.lineTo(442, 175);
  ctx.stroke();

  // Big Bold Title
  ctx.fillStyle = '#160f08';
  ctx.font = '900 36px "Special Elite", "Courier Prime", monospace';
  ctx.fillText(label, 256, 250);

  // Subtitle / Notes
  ctx.font = '16px "Courier Prime", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('DATE OF EVENT: OCT 24, 1999', 70, 310);
  ctx.fillText('PRIMARY JURISDICTION: METRO POWER & DEPOSIT', 70, 340);
  ctx.fillText('CLASSIFICATION LEVEL: FIVE (RESTRICTED)', 70, 370);
  ctx.fillText('STATUS: OPEN / RECURRING ANOMALY', 70, 400);

  // Red Stamp (e.g. TOP SECRET)
  ctx.save();
  ctx.translate(256, 490);
  ctx.rotate(-0.18);
  ctx.strokeStyle = 'rgba(185, 28, 28, 0.85)';
  ctx.lineWidth = 5;
  ctx.strokeRect(-160, -42, 320, 84);
  ctx.strokeRect(-154, -36, 308, 72);

  ctx.fillStyle = 'rgba(185, 28, 28, 0.88)';
  ctx.font = 'bold 44px "Cinzel", "Courier Prime", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(stamp, 0, 2);
  ctx.restore();

  // Coffee ring stain
  ctx.save();
  ctx.beginPath();
  ctx.arc(380, 200, 55, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(84, 52, 28, 0.35)';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = 'rgba(94, 60, 32, 0.08)';
  ctx.fill();
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function createNewspaperTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 680;
  const ctx = canvas.getContext('2d');

  // Aged newsprint paper
  ctx.fillStyle = '#e8dec5';
  ctx.fillRect(0, 0, 512, 680);

  // Yellowed edge patina
  const grad = ctx.createRadialGradient(256, 340, 200, 256, 340, 400);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, 'rgba(120, 80, 30, 0.35)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 680);

  // Newspaper Masthead
  ctx.fillStyle = '#111111';
  ctx.font = '900 38px "Playfair Display", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('THE METROPOLITAN', 256, 65);
  ctx.font = '700 24px "Playfair Display", Georgia, serif';
  ctx.fillText('CHRONICLE', 256, 95);

  ctx.font = '12px "Courier Prime", monospace';
  ctx.fillText('SPECIAL NIGHT EDITION — OCTOBER 25, 1999 — PRICE FIVE CENTS', 256, 120);

  ctx.strokeStyle = '#111111';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(30, 130);
  ctx.lineTo(482, 130);
  ctx.moveTo(30, 135);
  ctx.lineTo(482, 135);
  ctx.stroke();

  // Breaking Headline
  ctx.font = '900 34px "Playfair Display", Georgia, serif';
  ctx.fillText('GRID COLLAPSE!', 256, 185);
  ctx.font = 'bold 22px "Playfair Display", Georgia, serif';
  ctx.fillText('CITY SINKING INTO THE DARK', 256, 218);

  // Subheader
  ctx.font = 'italic 16px Georgia, serif';
  ctx.fillText('12 Substations Fail in Under 50 Seconds; Vault Breached', 256, 245);

  // Dual columns text simulation
  ctx.fillStyle = '#222222';
  ctx.font = '10px "Courier Prime", monospace';
  ctx.textAlign = 'left';

  const col1X = 40;
  const col2X = 270;
  const lines1 = [
    "MIDNIGHT — Power officials stood",
    "dumbfounded as transformer bank C",
    "at Substation 4 ignited with a blue",
    "electric flash visible for miles.",
    "",
    "Within moments, emergency alarms",
    "across Manhattan and Brooklyn fell",
    "silent. Telephone switchboards",
    "jammed as millions realized this",
    "was no routine brownout.",
    "",
    "'The sabotage was immediate,'",
    "stated an anonymous line engineer.",
    "'Every breaker tripped in sequence",
    "as if commanded by a master relay.'"
  ];

  const lines2 = [
    "RESERVE VAULT ALARMS WENT SILENT",
    "At precisely 23:45 EST, security",
    "forces at the Federal Depository",
    "reported pneumatic door failures.",
    "",
    "Witnesses report three shadowy",
    "figures entering through the storm",
    "drain access corridor beneath the",
    "conduit lines.",
    "",
    "Scotland Yard & FBI task forces",
    "have been activated. A reward of",
    "$500,000 has been sanctioned for",
    "information leading to 'THE CARTEL'."
  ];

  lines1.forEach((l, i) => ctx.fillText(l, col1X, 280 + i * 16));
  lines2.forEach((l, i) => ctx.fillText(l, col2X, 280 + i * 16));

  // Big Stamped "EVIDENCE" mark across bottom
  ctx.save();
  ctx.translate(256, 560);
  ctx.rotate(0.12);
  ctx.strokeStyle = 'rgba(185, 28, 28, 0.75)';
  ctx.lineWidth = 4;
  ctx.strokeRect(-140, -32, 280, 64);
  ctx.fillStyle = 'rgba(185, 28, 28, 0.8)';
  ctx.font = '900 36px "Cinzel", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('EVIDENCE #109', 0, 0);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function createPolaroidTexture(alias = 'SUSPECT', initials = 'TC', role = 'OPERATIVE') {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 480;
  const ctx = canvas.getContext('2d');

  // Polaroid white border
  ctx.fillStyle = '#f2efe9';
  ctx.fillRect(0, 0, 400, 480);

  // Subtle paper texture & aging
  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 400;
    const y = Math.random() * 480;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)';
    ctx.fillRect(x, y, 2, 2);
  }

  // Photo Area (Square)
  const photoX = 30;
  const photoY = 30;
  const photoSize = 340;

  // Dark noir photo background
  const pGrad = ctx.createRadialGradient(200, 180, 40, 200, 180, 200);
  pGrad.addColorStop(0, '#3a3430');
  pGrad.addColorStop(1, '#0c0a08');
  ctx.fillStyle = pGrad;
  ctx.fillRect(photoX, photoY, photoSize, photoSize);

  // Silhouette / Noir suspect portrait drawing
  ctx.fillStyle = '#161412';
  // Head & shoulders silhouette
  ctx.beginPath();
  ctx.arc(200, 160, 60, 0, Math.PI * 2); // head
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(200, 290, 110, 85, 0, 0, Math.PI * 2); // shoulders
  ctx.fill();

  // Trench coat collar / hat brim noir styling
  ctx.fillStyle = '#24201c';
  ctx.beginPath();
  ctx.ellipse(200, 125, 75, 18, 0, 0, Math.PI * 2); // fedora brim
  ctx.fill();
  ctx.fillRect(150, 80, 100, 50); // fedora crown

  // High contrast shadow eye band
  ctx.fillStyle = 'rgba(0,0,0,0.85)';
  ctx.fillRect(155, 140, 90, 25);

  // Monogram / Identifier in photo corner
  ctx.fillStyle = 'rgba(203, 163, 88, 0.4)';
  ctx.font = 'bold 24px "Cinzel", serif';
  ctx.textAlign = 'right';
  ctx.fillText(initials, 350, 355);

  // Surveillance date stamp in red digital font
  ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
  ctx.font = 'bold 16px "Courier Prime", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('10.24.99 // 23:43', 45, 355);

  // Polaroid Bottom handwritten label (looks handwritten in marker)
  ctx.fillStyle = '#1f1b18';
  ctx.font = '900 24px "Special Elite", "Courier Prime", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(alias, 200, 420);

  ctx.font = '14px "Courier Prime", monospace';
  ctx.fillStyle = '#b91c1c';
  ctx.fillText(`[${role}]`, 200, 448);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function createWantedPosterTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 680;
  const ctx = canvas.getContext('2d');

  // Aged parchment
  ctx.fillStyle = '#f3e8cb';
  ctx.fillRect(0, 0, 512, 680);

  // Dark ornate double border
  ctx.strokeStyle = '#1b130b';
  ctx.lineWidth = 5;
  ctx.strokeRect(25, 25, 462, 630);
  ctx.lineWidth = 2;
  ctx.strokeRect(32, 32, 448, 616);

  // WANTED Heading
  ctx.fillStyle = '#1b130b';
  ctx.font = '900 58px "Playfair Display", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('WANTED', 256, 105);

  ctx.font = 'bold 20px "Courier Prime", monospace';
  ctx.fillText('BY THE FEDERAL INVESTIGATIVE BUREAU', 256, 140);

  // Reward Banner
  ctx.fillStyle = '#7f1d1d';
  ctx.fillRect(50, 165, 412, 65);

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 42px "Playfair Display", serif';
  ctx.fillText('$500,000 REWARD', 256, 212);

  // Body text
  ctx.fillStyle = '#1f160e';
  ctx.font = 'bold 18px "Courier Prime", monospace';
  ctx.fillText('FOR CONSPIRACY & SABOTAGE', 256, 265);
  ctx.fillText('CASE ZERO: THE METROPOLITAN BLACKOUT', 256, 290);

  // Crime details
  ctx.font = '14px "Courier Prime", monospace';
  ctx.textAlign = 'left';
  const desc = [
    "Notice is hereby given for actionable intelligence",
    "identifying the underground syndicate known as",
    "THE BREACH CARTEL.",
    "",
    "CHARGES: High-voltage infrastructure sabotage,",
    "theft of federal bearer bonds, wire fraud, and",
    "unauthorized telecommunications interception.",
    "",
    "All information will be held in strictest secrecy.",
    "Submit credentials via telex or detective envelope."
  ];

  desc.forEach((line, i) => {
    ctx.fillText(line, 65, 335 + i * 22);
  });

  // Stamp at the bottom
  ctx.save();
  ctx.translate(350, 560);
  ctx.rotate(-0.1);
  ctx.strokeStyle = 'rgba(185, 28, 28, 0.85)';
  ctx.lineWidth = 4;
  ctx.strokeRect(-90, -30, 180, 60);
  ctx.fillStyle = 'rgba(185, 28, 28, 0.85)';
  ctx.font = '900 24px "Cinzel", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('BOUNTY ACTIVE', 0, 0);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function createEnvelopeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  // Manila envelope
  ctx.fillStyle = '#cbab75';
  ctx.fillRect(0, 0, 512, 360);

  // Envelope flap outline
  ctx.strokeStyle = 'rgba(60, 40, 20, 0.4)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(256, 170);
  ctx.lineTo(512, 0);
  ctx.stroke();

  // Red wax seal in center
  const sealGrad = ctx.createRadialGradient(256, 170, 5, 256, 170, 45);
  sealGrad.addColorStop(0, '#dc2626');
  sealGrad.addColorStop(0.8, '#991b1b');
  sealGrad.addColorStop(1, '#450a0a');
  ctx.fillStyle = sealGrad;
  ctx.beginPath();
  ctx.arc(256, 170, 42, 0, Math.PI * 2);
  ctx.fill();

  // Monogram on wax seal
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.font = '900 28px "Cinzel", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('BC', 256, 170);

  // Addressed to
  ctx.fillStyle = '#1c150c';
  ctx.font = 'bold 18px "Special Elite", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('CLASSIFIED OPERATIVE ENROLLMENT', 60, 270);
  ctx.font = '14px "Courier Prime", monospace';
  ctx.fillText('ATTN: SPECIAL BUREAU // SEALED EVIDENCE', 60, 300);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
