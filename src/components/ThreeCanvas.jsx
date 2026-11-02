import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CASE_DATA } from '../data/caseData';
import sound from '../audio/SoundSystem';
import {
  createCorkTexture,
  createWoodTexture,
  createFolderTexture,
  createNewspaperTexture,
  createPolaroidTexture,
  createWantedPosterTexture,
  createEnvelopeTexture,
} from '../utils/textureGenerator';

// Camera position & target waypoints for each section
const WAYPOINTS = {
  home: {
    pos: new THREE.Vector3(0, 0.35, 4.2),
    target: new THREE.Vector3(0, 0.15, 0),
    fov: 48
  },
  story: {
    pos: new THREE.Vector3(0, 0.38, 1.35),
    target: new THREE.Vector3(0, 0.38, 0),
    fov: 42
  },
  operations: {
    pos: new THREE.Vector3(-1.4, 0.25, 1.45),
    target: new THREE.Vector3(-1.4, 0.25, 0),
    fov: 44
  },
  timeline: {
    pos: new THREE.Vector3(1.35, 0.65, 1.4),
    target: new THREE.Vector3(1.35, 0.65, 0),
    fov: 42
  },
  commission: {
    pos: new THREE.Vector3(0, 0.85, 1.7),
    target: new THREE.Vector3(0, 0.85, 0),
    fov: 45
  },
  awards: {
    pos: new THREE.Vector3(1.35, -0.3, 1.4),
    target: new THREE.Vector3(1.35, -0.3, 0),
    fov: 42
  },
  register: {
    pos: new THREE.Vector3(0, -0.75, 1.8),
    target: new THREE.Vector3(0, -1.05, 0.2),
    fov: 45
  }
};

export default function ThreeCanvas({
  currentSection = 'home',
  onSelectSection,
  onOpenDossier,
  isLampOn = true,
  onToggleLamp,
  reducedMotion = false
}) {
  const mountRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  // References to keep across renders
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const lampLightRef = useRef(null);
  const lampBulbRef = useRef(null);
  const cassetteSpoolsRef = useRef([]);
  const dustParticlesRef = useRef(null);
  const smokeParticlesRef = useRef(null);
  const interactiveMeshesRef = useRef([]);

  // Camera lerp targets
  const targetCamPos = useRef(new THREE.Vector3().copy(WAYPOINTS.home.pos));
  const targetCamLook = useRef(new THREE.Vector3().copy(WAYPOINTS.home.target));
  const currentCamLook = useRef(new THREE.Vector3().copy(WAYPOINTS.home.target));
  const mouseParallax = useRef({ x: 0, y: 0 });

  // Update target camera waypoint when currentSection changes
  useEffect(() => {
    const wp = WAYPOINTS[currentSection] || WAYPOINTS.home;
    targetCamPos.current.copy(wp.pos);
    targetCamLook.current.copy(wp.target);
    sound.playPaperRustle();
  }, [currentSection]);

  // Update lamp state
  useEffect(() => {
    if (lampLightRef.current && lampBulbRef.current) {
      lampLightRef.current.intensity = isLampOn ? 2.6 : 0.05;
      lampBulbRef.current.material.emissiveIntensity = isLampOn ? 1.0 : 0.02;
    }
  }, [isLampOn]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#0a0807');
    scene.fog = new THREE.FogExp2('#0a0807', 0.12);

    // --- CAMERA SETUP ---
    const camera = new THREE.PerspectiveCamera(
      WAYPOINTS.home.fov,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.copy(WAYPOINTS.home.pos);
    camera.lookAt(WAYPOINTS.home.target);
    cameraRef.current = camera;

    // --- RENDERER SETUP ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // --- LIGHTING ---
    // 1. Ambient Noir Fill
    const ambientLight = new THREE.AmbientLight('#261b14', 0.85);
    scene.add(ambientLight);

    // 2. Desk Banker's Lamp (Warm glow point light)
    const lampLight = new THREE.PointLight('#ffe4a0', isLampOn ? 2.6 : 0.05, 5, 1.4);
    lampLight.position.set(0.9, -0.65, 0.7);
    lampLight.castShadow = true;
    lampLight.shadow.mapSize.width = 1024;
    lampLight.shadow.mapSize.height = 1024;
    lampLight.shadow.bias = -0.001;
    scene.add(lampLight);
    lampLightRef.current = lampLight;

    // 3. Investigation Board Spotlight
    const boardSpotlight = new THREE.SpotLight('#f8ecd4', 2.2, 8, Math.PI / 3, 0.4, 1.2);
    boardSpotlight.position.set(0, 1.5, 3.2);
    boardSpotlight.target.position.set(0, 0.3, 0);
    boardSpotlight.castShadow = true;
    scene.add(boardSpotlight);
    scene.add(boardSpotlight.target);

    // 4. Cool Street Lamp filter through Venetian Blinds
    const windowLight = new THREE.DirectionalLight('#4a688a', 0.75);
    windowLight.position.set(-4, 2, 2.5);
    windowLight.target.position.set(0, 0, 0);
    scene.add(windowLight);
    scene.add(windowLight.target);

    // --- ROOM WALLS & BLINDS ---
    // Back wall (dark mahogany wainscoting)
    const wallGeo = new THREE.PlaneGeometry(12, 8);
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#120b07',
      roughness: 0.9,
      metalness: 0.05
    });
    const backWall = new THREE.Mesh(wallGeo, wallMat);
    backWall.position.set(0, 0.5, -0.1);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Venetian Blinds effect mesh (left side window slats casting shadow)
    const blindGroup = new THREE.Group();
    blindGroup.position.set(-3.2, 1.2, 1.2);
    blindGroup.rotation.y = Math.PI / 3;
    for (let b = 0; b < 14; b++) {
      const slatGeo = new THREE.BoxGeometry(1.6, 0.06, 0.01);
      const slatMat = new THREE.MeshStandardMaterial({ color: '#16110d', roughness: 0.8 });
      const slat = new THREE.Mesh(slatGeo, slatMat);
      slat.position.y = (b - 7) * 0.14;
      slat.rotation.x = 0.4;
      slat.castShadow = true;
      blindGroup.add(slat);
    }
    scene.add(blindGroup);

    // --- CORK INVESTIGATION BOARD ---
    const boardGroup = new THREE.Group();
    boardGroup.position.set(0, 0.3, 0);
    scene.add(boardGroup);

    // Cork Surface
    const corkTex = createCorkTexture();
    const boardGeo = new THREE.BoxGeometry(4.4, 2.7, 0.04);
    const boardMat = new THREE.MeshStandardMaterial({
      map: corkTex,
      roughness: 0.95,
      metalness: 0.0
    });
    const boardMesh = new THREE.Mesh(boardGeo, boardMat);
    boardMesh.receiveShadow = true;
    boardGroup.add(boardMesh);

    // Board Wooden Frame
    const woodTex = createWoodTexture(true);
    const frameMat = new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.7,
      metalness: 0.1
    });

    // Top / Bottom frame rails
    const railHGeo = new THREE.BoxGeometry(4.56, 0.1, 0.08);
    const topRail = new THREE.Mesh(railHGeo, frameMat);
    topRail.position.set(0, 1.4, 0.02);
    topRail.castShadow = true;
    boardGroup.add(topRail);

    const btmRail = new THREE.Mesh(railHGeo, frameMat);
    btmRail.position.set(0, -1.4, 0.02);
    btmRail.castShadow = true;
    boardGroup.add(btmRail);

    // Left / Right frame rails
    const railVGeo = new THREE.BoxGeometry(0.1, 2.7, 0.08);
    const leftRail = new THREE.Mesh(railVGeo, frameMat);
    leftRail.position.set(-2.25, 0, 0.02);
    leftRail.castShadow = true;
    boardGroup.add(leftRail);

    const rightRail = new THREE.Mesh(railVGeo, frameMat);
    rightRail.position.set(2.25, 0, 0.02);
    rightRail.castShadow = true;
    boardGroup.add(rightRail);

    // --- PINNED EVIDENCE ITEMS ON BOARD ---
    const interactiveMeshes = [];
    const itemPositions = {};

    // 1. Central Folder: Case Zero
    const caseFolderTex = createFolderTexture('#b48e58', 'CASE ZERO', 'TOP SECRET');
    const folderGeo = new THREE.PlaneGeometry(0.85, 1.15);
    const folderMat = new THREE.MeshStandardMaterial({
      map: caseFolderTex,
      roughness: 0.8,
      metalness: 0.05
    });
    const caseMesh = new THREE.Mesh(folderGeo, folderMat);
    caseMesh.position.set(0, 0.38, 0.035);
    caseMesh.castShadow = true;
    caseMesh.receiveShadow = true;
    caseMesh.userData = { id: 'board-center', section: 'story', label: 'CASE ZERO: THE BLACKOUT' };
    boardGroup.add(caseMesh);
    interactiveMeshes.push(caseMesh);
    itemPositions['board-center'] = new THREE.Vector3(0, 0.38, 0.035);

    // 2. Op 1: Overclock Folder
    const op1Tex = createFolderTexture('#4e1218', 'OP: OVERCLOCK', 'CONFIDENTIAL');
    const op1Mat = new THREE.MeshStandardMaterial({ map: op1Tex, roughness: 0.85 });
    const op1Mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 0.95), op1Mat);
    op1Mesh.position.set(-1.4, 0.65, 0.035);
    op1Mesh.rotation.z = 0.06;
    op1Mesh.castShadow = true;
    op1Mesh.userData = { id: 'board-op1', section: 'operations', label: 'OPERATION OVERCLOCK' };
    boardGroup.add(op1Mesh);
    interactiveMeshes.push(op1Mesh);
    itemPositions['board-op1'] = new THREE.Vector3(-1.4, 0.65, 0.035);

    // 3. Op 2: Phantom Drift Folder
    const op2Tex = createFolderTexture('#182538', 'OP: PHANTOM DRIFT', 'EYES ONLY');
    const op2Mat = new THREE.MeshStandardMaterial({ map: op2Tex, roughness: 0.85 });
    const op2Mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 0.95), op2Mat);
    op2Mesh.position.set(-1.4, -0.32, 0.035);
    op2Mesh.rotation.z = -0.04;
    op2Mesh.castShadow = true;
    op2Mesh.userData = { id: 'board-op2', section: 'operations', label: 'OPERATION PHANTOM DRIFT' };
    boardGroup.add(op2Mesh);
    interactiveMeshes.push(op2Mesh);
    itemPositions['board-op2'] = new THREE.Vector3(-1.4, -0.32, 0.035);

    // 4. Newspaper Clipping: Metropolitan Chronicle
    const newsTex = createNewspaperTexture();
    const newsMat = new THREE.MeshStandardMaterial({ map: newsTex, roughness: 0.9 });
    const newsMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 1.15), newsMat);
    newsMesh.position.set(1.4, 0.58, 0.035);
    newsMesh.rotation.z = -0.05;
    newsMesh.castShadow = true;
    newsMesh.userData = { id: 'board-timeline', section: 'timeline', label: 'OCT 24 TIMELINE' };
    boardGroup.add(newsMesh);
    interactiveMeshes.push(newsMesh);
    itemPositions['board-timeline'] = new THREE.Vector3(1.4, 0.58, 0.035);

    // 5. Bounty / Wanted Poster
    const bountyTex = createWantedPosterTexture();
    const bountyMat = new THREE.MeshStandardMaterial({ map: bountyTex, roughness: 0.9 });
    const bountyMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.78, 1.05), bountyMat);
    bountyMesh.position.set(1.4, -0.45, 0.035);
    bountyMesh.rotation.z = 0.03;
    bountyMesh.castShadow = true;
    bountyMesh.userData = { id: 'board-awards', section: 'awards', label: 'REWARD: $500,000' };
    boardGroup.add(bountyMesh);
    interactiveMeshes.push(bountyMesh);
    itemPositions['board-awards'] = new THREE.Vector3(1.4, -0.45, 0.035);

    // 6. Suspect Polaroids (4 Rogues Gallery)
    const suspectConfigs = [
      { id: 'board-architect', alias: 'THE ARCHITECT', init: 'JC', role: 'MASTERMIND', pos: [-0.62, 1.05, 0.04], rot: -0.04 },
      { id: 'board-cipher', alias: 'CIPHER', init: 'EV', role: 'CRYPTOGRAPHER', pos: [0.62, 1.05, 0.04], rot: 0.05 },
      { id: 'board-siren', alias: 'THE SIREN', init: 'DM', role: 'INFILTRATOR', pos: [-0.62, -0.32, 0.04], rot: 0.06 },
      { id: 'board-broker', alias: 'THE BROKER', init: 'AS', role: 'FINANCIER', pos: [0.62, -0.32, 0.04], rot: -0.05 },
    ];

    suspectConfigs.forEach(s => {
      const polTex = createPolaroidTexture(s.alias, s.init, s.role);
      const polMat = new THREE.MeshStandardMaterial({ map: polTex, roughness: 0.75 });
      const polMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 0.58), polMat);
      polMesh.position.set(s.pos[0], s.pos[1], s.pos[2]);
      polMesh.rotation.z = s.rot;
      polMesh.castShadow = true;
      polMesh.userData = { id: s.id, section: 'commission', label: s.alias };
      boardGroup.add(polMesh);
      interactiveMeshes.push(polMesh);
      itemPositions[s.id] = new THREE.Vector3(s.pos[0], s.pos[1], s.pos[2]);
    });

    // 7. Sealed Envelope (Registration)
    const envTex = createEnvelopeTexture();
    const envMat = new THREE.MeshStandardMaterial({ map: envTex, roughness: 0.8 });
    const envMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 0.52), envMat);
    envMesh.position.set(0, -0.88, 0.04);
    envMesh.rotation.z = 0.02;
    envMesh.castShadow = true;
    envMesh.userData = { id: 'board-register', section: 'register', label: 'CLASSIFIED REGISTRATION' };
    boardGroup.add(envMesh);
    interactiveMeshes.push(envMesh);
    itemPositions['board-register'] = new THREE.Vector3(0, -0.88, 0.04);

    // Add Brass Pushpins at the top of each item
    Object.keys(itemPositions).forEach(k => {
      const pos = itemPositions[k];
      const pinGroup = new THREE.Group();
      pinGroup.position.set(pos.x, pos.y + 0.22, pos.z + 0.02);

      // Pin Head (Red plastic or brass)
      const isRedPin = Math.random() > 0.3;
      const headGeo = new THREE.CylinderGeometry(0.02, 0.015, 0.025, 12);
      const headMat = new THREE.MeshStandardMaterial({
        color: isRedPin ? '#b91c1c' : '#cba358',
        metalness: isRedPin ? 0.3 : 0.85,
        roughness: 0.3
      });
      const pinHead = new THREE.Mesh(headGeo, headMat);
      pinHead.rotation.x = Math.PI / 2;
      pinGroup.add(pinHead);

      // Pin Needle
      const needleGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.03, 8);
      const needleMat = new THREE.MeshStandardMaterial({ color: '#cccccc', metalness: 0.9, roughness: 0.2 });
      const pinNeedle = new THREE.Mesh(needleGeo, needleMat);
      pinNeedle.position.z = -0.015;
      pinNeedle.rotation.x = Math.PI / 2;
      pinGroup.add(pinNeedle);

      boardGroup.add(pinGroup);
    });

    // --- 3D RED STRINGS CONNECTING CLUES ---
    CASE_DATA.stringConnections.forEach(conn => {
      const p1 = itemPositions[conn.from];
      const p2 = itemPositions[conn.to];
      if (!p1 || !p2) return;

      // Create a hanging catenary curve between pins
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2 - 0.06; // slight gravity sag
      const midZ = Math.max(p1.z, p2.z) + 0.035;

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(p1.x, p1.y + 0.2, p1.z + 0.02),
        new THREE.Vector3(midX, midY, midZ),
        new THREE.Vector3(p2.x, p2.y + 0.2, p2.z + 0.02)
      ]);

      const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.005, 6, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: conn.color || '#b91c1c',
        roughness: 0.6,
        metalness: 0.1
      });
      const stringMesh = new THREE.Mesh(tubeGeo, tubeMat);
      stringMesh.castShadow = true;
      boardGroup.add(stringMesh);
    });

    // --- DETECTIVE DESK FOREGROUND ---
    const deskGroup = new THREE.Group();
    deskGroup.position.set(0, -1.3, 0.85);
    scene.add(deskGroup);

    // Heavy Oak Desktop
    const deskTopGeo = new THREE.BoxGeometry(4.8, 0.12, 1.8);
    const deskTopMat = new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.6,
      metalness: 0.15
    });
    const deskTop = new THREE.Mesh(deskTopGeo, deskTopMat);
    deskTop.receiveShadow = true;
    deskTop.castShadow = true;
    deskGroup.add(deskTop);

    // Leather Desk Pad / Blotter
    const padGeo = new THREE.BoxGeometry(2.4, 0.015, 1.1);
    const padMat = new THREE.MeshStandardMaterial({
      color: '#1a221a', // dark green leather
      roughness: 0.85
    });
    const deskPad = new THREE.Mesh(padGeo, padMat);
    deskPad.position.set(0, 0.065, 0.05);
    deskPad.receiveShadow = true;
    deskGroup.add(deskPad);

    // --- 1990S BANKER'S DESK LAMP ---
    const lampGroup = new THREE.Group();
    lampGroup.position.set(0.9, 0.06, 0.1);
    deskGroup.add(lampGroup);

    // Brass Base
    const lampBaseGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.04, 24);
    const brassMat = new THREE.MeshStandardMaterial({
      color: '#cba358',
      metalness: 0.85,
      roughness: 0.25
    });
    const lampBase = new THREE.Mesh(lampBaseGeo, brassMat);
    lampBase.castShadow = true;
    lampGroup.add(lampBase);

    // Brass Stem
    const stemGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.46, 16);
    const lampStem = new THREE.Mesh(stemGeo, brassMat);
    lampStem.position.set(0, 0.24, 0);
    lampStem.castShadow = true;
    lampGroup.add(lampStem);

    // Emerald Green Glass Hood
    const hoodGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.28, 16, 1, false, 0, Math.PI);
    const hoodMat = new THREE.MeshStandardMaterial({
      color: '#084825',
      roughness: 0.2,
      metalness: 0.3,
      side: THREE.DoubleSide
    });
    const lampHood = new THREE.Mesh(hoodGeo, hoodMat);
    lampHood.position.set(0, 0.46, 0);
    lampHood.rotation.z = Math.PI / 2;
    lampHood.rotation.x = Math.PI / 2;
    lampHood.castShadow = true;
    lampGroup.add(lampHood);

    // Bulb Mesh
    const bulbGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const bulbMat = new THREE.MeshStandardMaterial({
      color: '#ffe5b4',
      emissive: '#ffb950',
      emissiveIntensity: isLampOn ? 1.0 : 0.02
    });
    const lampBulb = new THREE.Mesh(bulbGeo, bulbMat);
    lampBulb.position.set(0, 0.42, 0);
    lampGroup.add(lampBulb);
    lampBulbRef.current = lampBulb;

    // Pull Chain hanging down
    const chainGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.16, 8);
    const lampChain = new THREE.Mesh(chainGeo, brassMat);
    lampChain.position.set(0.08, 0.34, 0);
    lampGroup.add(lampChain);

    // Make lamp interactive (click to toggle light)
    lampHood.userData = { id: 'lamp', isInteractive: true, label: 'BANKER\'S DESK LAMP' };
    interactiveMeshes.push(lampHood);

    // --- VINTAGE MECHANICAL TYPEWRITER ---
    const typewriterGroup = new THREE.Group();
    typewriterGroup.position.set(-0.25, 0.12, 0.1);
    deskGroup.add(typewriterGroup);

    // Typewriter Body (Cast black enamel)
    const twBodyGeo = new THREE.BoxGeometry(0.65, 0.12, 0.55);
    const twBodyMat = new THREE.MeshStandardMaterial({
      color: '#1a1a1c',
      metalness: 0.6,
      roughness: 0.4
    });
    const twBody = new THREE.Mesh(twBodyGeo, twBodyMat);
    twBody.castShadow = true;
    twBody.receiveShadow = true;
    typewriterGroup.add(twBody);

    // Sloped keyboard face
    const kbGeo = new THREE.BoxGeometry(0.55, 0.06, 0.28);
    const kbFace = new THREE.Mesh(kbGeo, twBodyMat);
    kbFace.position.set(0, 0.03, 0.15);
    kbFace.rotation.x = 0.25;
    kbFace.castShadow = true;
    typewriterGroup.add(kbFace);

    // Carriage & Roller
    const rollerGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.62, 16);
    const rollerMat = new THREE.MeshStandardMaterial({ color: '#2a2a2a', roughness: 0.7 });
    const roller = new THREE.Mesh(rollerGeo, rollerMat);
    roller.position.set(0, 0.14, -0.12);
    roller.rotation.z = Math.PI / 2;
    roller.castShadow = true;
    typewriterGroup.add(roller);

    // Paper sticking out of typewriter
    const twPaperGeo = new THREE.PlaneGeometry(0.38, 0.3);
    const twPaperMat = new THREE.MeshStandardMaterial({ color: '#f3eedb', roughness: 0.9, side: THREE.DoubleSide });
    const twPaper = new THREE.Mesh(twPaperGeo, twPaperMat);
    twPaper.position.set(0, 0.26, -0.15);
    twPaper.rotation.x = -0.3;
    twPaper.castShadow = true;
    typewriterGroup.add(twPaper);

    typewriterGroup.userData = { id: 'typewriter', isInteractive: true, label: 'REMINGTON TYPEWRITER' };
    twBody.userData = typewriterGroup.userData;
    interactiveMeshes.push(twBody);

    // --- WIRETAP CASSETTE RECORDER ---
    const recorderGroup = new THREE.Group();
    recorderGroup.position.set(-1.1, 0.09, 0.15);
    deskGroup.add(recorderGroup);

    const recBodyGeo = new THREE.BoxGeometry(0.48, 0.07, 0.35);
    const recBodyMat = new THREE.MeshStandardMaterial({ color: '#2b2a26', metalness: 0.4, roughness: 0.5 });
    const recBody = new THREE.Mesh(recBodyGeo, recBodyMat);
    recBody.castShadow = true;
    recorderGroup.add(recBody);

    // Two spools for cassette
    [-0.08, 0.08].forEach(spoolX => {
      const spoolGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.015, 16);
      const spoolMat = new THREE.MeshStandardMaterial({ color: '#dedede', metalness: 0.8, roughness: 0.3 });
      const spool = new THREE.Mesh(spoolGeo, spoolMat);
      spool.position.set(spoolX, 0.04, 0);
      recorderGroup.add(spool);
      cassetteSpoolsRef.current.push(spool);
    });

    recorderGroup.userData = { id: 'recorder', isInteractive: true, label: 'WIRETAP RECORDER #09' };
    recBody.userData = recorderGroup.userData;
    interactiveMeshes.push(recBody);

    // --- COFFEE MUG WITH DRIED COFFEE ---
    const mugGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.12, 16);
    const mugMat = new THREE.MeshStandardMaterial({ color: '#dcd7c9', roughness: 0.6 });
    const mug = new THREE.Mesh(mugGeo, mugMat);
    mug.position.set(0.6, 0.12, 0.35);
    mug.castShadow = true;
    deskGroup.add(mug);

    // --- ASHTRAY WITH SMOLDERING EMBER ---
    const ashGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.03, 16);
    const ashMat = new THREE.MeshStandardMaterial({ color: '#9e7d3b', metalness: 0.8, roughness: 0.4 });
    const ashtray = new THREE.Mesh(ashGeo, ashMat);
    ashtray.position.set(0.85, 0.075, 0.38);
    ashtray.castShadow = true;
    deskGroup.add(ashtray);

    interactiveMeshesRef.current = interactiveMeshes;

    // --- DUST PARTICLES (FLOATING IN WARM LIGHT CONE) ---
    const dustCount = 300;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustVelocities = [];

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 3.5;
      dustPositions[i * 3 + 1] = Math.random() * 2.2 - 0.5;
      dustPositions[i * 3 + 2] = Math.random() * 2.5 + 0.3;
      dustVelocities.push({
        x: (Math.random() - 0.5) * 0.0015,
        y: Math.random() * 0.0015 + 0.0005,
        z: (Math.random() - 0.5) * 0.0015,
        seed: Math.random() * 100
      });
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: '#ffe5aa',
      size: 0.022,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);
    dustParticlesRef.current = { points: dustParticles, velocities: dustVelocities };

    // --- RAYCASTER FOR MOUSE INTERACTIONS ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Parallax in home overview view
      if (!reducedMotion) {
        mouseParallax.current.x = mouse.x * 0.15;
        mouseParallax.current.y = mouse.y * 0.12;
      }

      // Raycast against interactive items
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshesRef.current, false);

      if (intersects.length > 0) {
        const item = intersects[0].object;
        container.style.cursor = 'pointer';
        setHoveredItem(item.userData);
      } else {
        container.style.cursor = 'default';
        setHoveredItem(null);
      }
    };

    const onPointerDown = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshesRef.current, false);

      if (intersects.length > 0) {
        const item = intersects[0].object;
        const data = item.userData;

        // Lamp clicked
        if (data.id === 'lamp') {
          sound.playLampClick();
          onToggleLamp?.();
          return;
        }

        // Typewriter clicked
        if (data.id === 'typewriter') {
          sound.playTypewriterKey();
          onSelectSection?.('register');
          return;
        }

        // Recorder clicked
        if (data.id === 'recorder') {
          sound.playTapeClick();
          onOpenDossier?.('story');
          return;
        }

        // Investigation board item clicked
        if (data.section) {
          sound.playPinClick();
          onSelectSection?.(data.section);
          onOpenDossier?.(data.section);
        }
      }
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerdown', onPointerDown);

    // --- RESIZE LISTENER ---
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // --- ANIMATION LOOP ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // 1. Smooth Camera Interpolation (Damped Lerp)
      const lerpSpeed = reducedMotion ? 0.08 : 0.045;
      
      const desiredPos = targetCamPos.current.clone();
      if (currentSection === 'home' && !reducedMotion) {
        desiredPos.x += mouseParallax.current.x;
        desiredPos.y += mouseParallax.current.y;
      }

      camera.position.lerp(desiredPos, lerpSpeed);
      currentCamLook.current.lerp(targetCamLook.current, lerpSpeed);
      camera.lookAt(currentCamLook.current);

      // 2. Animate Dust Motes
      if (dustParticlesRef.current && !reducedMotion) {
        const { points, velocities } = dustParticlesRef.current;
        const positions = points.geometry.attributes.position.array;
        for (let i = 0; i < dustCount; i++) {
          const v = velocities[i];
          positions[i * 3] += Math.sin(elapsedTime * 0.8 + v.seed) * 0.001;
          positions[i * 3 + 1] += v.y;
          positions[i * 3 + 2] += Math.cos(elapsedTime * 0.8 + v.seed) * 0.001;

          // Recycle particle if it drifts too high
          if (positions[i * 3 + 1] > 2.0) {
            positions[i * 3 + 1] = -0.5;
          }
        }
        points.geometry.attributes.position.needsUpdate = true;
      }

      // 3. Rotate Cassette Spools
      if (sound.ambientPlaying && cassetteSpoolsRef.current.length > 0) {
        cassetteSpoolsRef.current.forEach(spool => {
          spool.rotation.y += 0.02;
        });
      }

      // 4. Subtle Lamp Bulb Flicker
      if (lampLightRef.current && isLampOn && !reducedMotion) {
        const noise = (Math.sin(elapsedTime * 18) * 0.02) + (Math.sin(elapsedTime * 42) * 0.015);
        lampLightRef.current.intensity = 2.6 + noise;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div ref={mountRef} className="w-full h-full" />

      {/* Floating Interactive Hover Tooltip */}
      {hoveredItem && (
        <div className="pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 bg-noir-900/95 border border-brass/50 text-parchment-100 px-4 py-2 rounded shadow-noir backdrop-blur-md transition-all duration-200 animate-pulse-subtle flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-evidence-stamp animate-ping inline-block" />
          <span className="font-typewriter text-xs tracking-wider uppercase">
            [EXAMINE]: <strong className="text-brass">{hoveredItem.label}</strong>
          </span>
          <span className="text-[10px] bg-evidence-stamp/20 text-evidence-stamp px-1.5 py-0.5 rounded font-mono border border-evidence-stamp/40">
            CLICK TO INSPECT
          </span>
        </div>
      )}
    </div>
  );
}
