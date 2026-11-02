/**
 * CASE ZERO: THE BLACKOUT
 * Classified Dossier & Evidence Database
 */

export const CASE_DATA = {
  caseNumber: "CASE ZERO // 1999-NY-09B",
  codename: "THE BLACKOUT",
  classification: "TOP SECRET // LEVEL 5 EYES ONLY",
  investigator: "Det. Marcus Vance (Shield #4412, Special Cartel Bureau)",
  dateOpened: "October 24, 1999 - 23:42 EST",
  status: "ACTIVE UNRESOLVED",

  story: {
    title: "CASE ZERO: THE BLACKOUT",
    subtitle: "The Millennium Heist That Never Was Recorded",
    overview: `On the rainy midnight of October 24, 1999, the metropolitan electrical grid spanning twelve critical substations collapsed within forty-eight seconds. While emergency sirens wailed across the city and millions were plunged into pitch darkness, the automated surveillance systems and pneumatic time-locks of the Federal Gold & Data Depository went dead.`,
    investigationNotes: [
      "The blackout was not an accident or grid overload; it was surgical precision executed by an underground syndicate known only as THE BREACH CARTEL.",
      "In the 4 minutes and 12 seconds of total darkness, 14 gigabytes of classified financial records and 3,200 metric ounces of bearer bonds vanished without a single alarm trip.",
      "The perpetrators left behind only three clues: a spool of unspooled magnetic tape, a burned copper jumper wire at Substation 4, and a typewritten cipher signed 'THE COMMISSION'."
    ],
    detectiveLog: `\"I have been staring at this corkboard for four months. Every thread I pull leads back to someone who died ten years ago or never existed at all. They didn't just breach the power grid—they breached the system itself.\" — Det. Vance`,
    evidenceSnippets: [
      { id: "EV-01", label: "Melted copper jumper cable", location: "Substation 4" },
      { id: "EV-02", label: "Encrypted 8mm magnetic tape", location: "Depository Vault B" },
      { id: "EV-03", label: "Typewriter note on 1968 rag paper", location: "Grid Control Room" }
    ]
  },

  operations: [
    {
      id: "op-overclock",
      codename: "OPERATION OVERCLOCK",
      folderColor: "#4a0e17",
      classification: "CONFIDENTIAL // HARDWARE INTERCEPT",
      summary: "Phase 1: Physical sabotage of Substation 4 telecommunications loop.",
      target: "Metropolitan Power Grid - Sector 4 & 7",
      methodology: "Synchronized harmonic resonance pulse triggered via analog phone line splice. Overloaded the transformers, forcing failsafe relays to trip sequentially in a 48-second domino cascade.",
      leadOperative: "The Architect",
      status: "EXECUTED WITH ZERO CASUALTIES",
      dossierNotes: [
        "Jumper wire installed at 23:14 EST during scheduled line maintenance.",
        "Local emergency backup generators were bypassed using pre-programmed delay fuses.",
        "Radio communication frequencies 142.8MHz were jammed with continuous white noise."
      ],
      lootAssessed: "Substation infrastructure blinded; 12 city sectors plunged into dark."
    },
    {
      id: "op-phantom-drift",
      codename: "OPERATION PHANTOM DRIFT",
      folderColor: "#1b2838",
      classification: "EYES ONLY // FINANCIAL EXTRACTION",
      summary: "Phase 2: High-speed exfiltration of vault assets and digital debt ledgers.",
      target: "Federal Reserve Vault B & Telex Clearing Terminal",
      methodology: "Exploited the 4-minute blackout window. Physical safe-cracking team breached vault doors via thermal thermite paste while an off-site acoustic coupler routed encrypted SWIFT ledgers to Swiss numbered relays.",
      leadOperative: "Cipher & The Siren",
      status: "UNDETECTED UNTIL 04:30 AM",
      dossierNotes: [
        "Bearer bonds were extracted via the underground storm drain system.",
        "No digital audit log remained on the magnetic storage drums.",
        "A dummy telemetry signal was looped back to Scotland Yard and Interpol."
      ],
      lootAssessed: "$184,000,000 in untraceable bearer bonds & 14GB classified ledger discs."
    }
  ],

  timeline: [
    {
      time: "22:15 EST",
      date: "OCT 24, 1999",
      headline: "ANOMALOUS CARRIER SIGNAL DETECTED",
      source: "Bell Atlantic Dispatch Log",
      description: "Night switchboard operator reports high-frequency humming on trunk lines connecting Substation 4 to municipal grid command. Dismissed as line moisture from heavy rainfall.",
      stamp: "VERIFIED"
    },
    {
      time: "23:41 EST",
      date: "OCT 24, 1999",
      headline: "THE BREACH: SUBSTATION 4 OVERLOAD",
      source: "Metropolitan Fire Dispatch",
      description: "Transformer Bank C erupts in a blinding blue electric arc. High-voltage surge trips backup breakers across 6 boroughs in 14 seconds.",
      stamp: "INCIDENT"
    },
    {
      time: "23:43 EST",
      date: "OCT 24, 1999",
      headline: "THE CITY GOES BLIND",
      source: "Police Scanner Transcript",
      description: "All streetlamps, traffic signals, and municipal surveillance feeds shut down simultaneously. Citywide 911 dispatch switches to battery backup.",
      stamp: "BLACKOUT"
    },
    {
      time: "23:45 EST",
      date: "OCT 24, 1999",
      headline: "VAULT B DOOR PNEUMATIC RELEASE",
      source: "Depository Security Log (Recovered)",
      description: "Primary time-locks lose pressurization. Three unidentified figures in dark trench coats and gas masks breach the subterranean blast gates.",
      stamp: "EVIDENCE"
    },
    {
      time: "23:49 EST",
      date: "OCT 24, 1999",
      headline: "TELEX CLEARED // EXFILTRATION COMPLETE",
      source: "Swiss Telex Terminal Relay",
      description: "4-minute window closes as municipal auxiliary generators kick in. Vault is found empty; all security tapes wiped with high-intensity degaussing coils.",
      stamp: "CLASSIFIED"
    },
    {
      time: "04:30 EST",
      date: "OCT 25, 1999",
      headline: "CARTEL TELEGRAM RECEIVED AT HEADQUARTERS",
      source: "Courier Delivery to Precinct 1",
      description: "A sealed envelope containing a polaroid of the empty vault with the typewriter message: 'Case Closed before it began. Regards, The Commission.'",
      stamp: "SOLVED"
    }
  ],

  commission: [
    {
      id: "architect",
      alias: "THE ARCHITECT",
      realName: "Unknown // Purported: Julian Croft",
      role: "Mastermind & Civil Infrastructure Specialist",
      origin: "Berlin / London",
      clearance: "THREAT LEVEL: ALPHA",
      dossier: "Former chief electrical engineer for European power syndicates. Disappeared from Zurich in 1994 following the Euro-Grid audit. Specializes in structural sabotage, mechanical clockwork timers, and grid harmonics.",
      clues: ["Left blueprint fragment of Sector 4", "Known to use Montecristo cigars", "Left-handed"],
      status: "AT LARGE"
    },
    {
      id: "cipher",
      alias: "CIPHER",
      realName: "Elena V.",
      role: "Cryptographer & Signal Intercept Lead",
      origin: "Saint Petersburg",
      clearance: "THREAT LEVEL: ALPHA",
      dossier: "Prodigy in asymmetric encryption and mechanical telex interception. Credited with creating the one-time pad cipher that masked the depository's offshore telex routing.",
      clues: ["Custom Russian acoustic coupler", "Uses mechanical Olympia typewriter", "Intercepted radio log signature"],
      status: "AT LARGE"
    },
    {
      id: "siren",
      alias: "THE SIREN",
      realName: "Dominique Moreau",
      role: "Infiltration & Social Engineering",
      origin: "Paris / New York",
      clearance: "THREAT LEVEL: BRAVO",
      dossier: "Master of disguises and social manipulation. Posed as a Federal Energy Auditor 48 hours prior to the blackout, securing the master access keycards for the perimeter gates.",
      clues: ["Forged Department of Energy badge", "Traces of Guerlain Shalimar perfume at crime scene"],
      status: "AT LARGE"
    },
    {
      id: "broker",
      alias: "THE BROKER",
      realName: "Arthur Sterling",
      role: "Clandestine Asset Liquidation & Escrow",
      origin: "Cayman Islands / Hong Kong",
      clearance: "THREAT LEVEL: BRAVO",
      dossier: "Shadow financier with ties to offshore shell banks and private courier networks. Transferred $184 million in bearer bonds through seven dummy corporations in under six minutes.",
      clues: ["Swiss bank wire confirmations", "Numbered offshore account slips"],
      status: "UNDER INVESTIGATION"
    }
  ],

  awards: [
    {
      title: "FEDERAL REWARD NOTICE",
      amount: "$500,000 BOUNTY",
      issuer: "Federal Bureau of Investigation & Municipal Police",
      description: "For actionable intelligence leading to the arrest and conviction of the core syndicate members responsible for the 1999 Metropolitan Blackout.",
      terms: "Guaranteed absolute anonymity. Contact Secret Drop Box 904 or submit telegram wire.",
      stamp: "WANTED DEAD OR ALIVE"
    },
    {
      title: "RECOVERED EVIDENCE ASSET #404",
      amount: "14GB ENCRYPTED DISCS",
      issuer: "Evidence Locker B - Tag #9921",
      description: "High-density magnetic tape cartridge containing encrypted financial transactions. Decryption bounty offered to certified forensic analysts.",
      terms: "Classified evidence custody protocol enforced.",
      stamp: "SECURED"
    },
    {
      title: "SYNDICATE CITATION OF EXCELLENCE",
      amount: "HONORARY CARTEL BADGE",
      issuer: "The Commission // The Breach Cartel",
      description: "Awarded to operatives who crack the encrypted frequency and register into the classified syndicate ledger.",
      terms: "Permanent membership in the shadow archive.",
      stamp: "CLASSIFIED ORDER"
    }
  ],

  boardItems: [
    {
      id: "board-center",
      title: "CASE ZERO FOLDER",
      section: "story",
      type: "folder",
      position: [0, 0.4, 0.05],
      label: "CASE ZERO: THE BLACKOUT",
      description: "Central classified dossier detailing the 1999 blackout heist.",
      badge: "TOP SECRET"
    },
    {
      id: "board-op1",
      title: "OP: OVERCLOCK",
      section: "operations",
      type: "folder",
      position: [-1.4, 0.7, 0.04],
      label: "OPERATION: OVERCLOCK",
      description: "Substation 4 sabotage schematics & relay cascade plans.",
      badge: "PHASE 1"
    },
    {
      id: "board-op2",
      title: "OP: PHANTOM DRIFT",
      section: "operations",
      type: "folder",
      position: [-1.4, -0.2, 0.04],
      label: "OPERATION: PHANTOM DRIFT",
      description: "Depository vault penetration and telex clearance log.",
      badge: "PHASE 2"
    },
    {
      id: "board-timeline",
      title: "CHRONICLE CLIPPING",
      section: "timeline",
      type: "newspaper",
      position: [1.4, 0.65, 0.04],
      label: "OCT 24 TIMELINE",
      description: "Metropolitan Chronicle headlines and emergency dispatches.",
      badge: "NEWS ARCHIVE"
    },
    {
      id: "board-awards",
      title: "BOUNTY POSTER",
      section: "awards",
      type: "document",
      position: [1.4, -0.3, 0.04],
      label: "REWARD: $500,000",
      description: "Federal wanted bulletins & recovered evidence logs.",
      badge: "WANTED"
    },
    {
      id: "board-architect",
      title: "SUSPECT: THE ARCHITECT",
      section: "commission",
      type: "polaroid",
      position: [-0.65, 1.05, 0.05],
      label: "JULIAN CROFT // ARCHITECT",
      description: "Mastermind behind the grid harmonics overload.",
      badge: "SUSPECT #1"
    },
    {
      id: "board-cipher",
      title: "SUSPECT: CIPHER",
      section: "commission",
      type: "polaroid",
      position: [0.65, 1.05, 0.05],
      label: "ELENA V. // CIPHER",
      description: "Cryptographer responsible for encrypted telex routing.",
      badge: "SUSPECT #2"
    },
    {
      id: "board-siren",
      title: "SUSPECT: THE SIREN",
      section: "commission",
      type: "polaroid",
      position: [-0.65, -0.5, 0.05],
      label: "D. MOREAU // SIREN",
      description: "Social engineer who procured vault master keycards.",
      badge: "SUSPECT #3"
    },
    {
      id: "board-broker",
      title: "SUSPECT: THE BROKER",
      section: "commission",
      type: "polaroid",
      position: [0.65, -0.5, 0.05],
      label: "A. STERLING // BROKER",
      description: "Financier who cleared $184M in 4 minutes flat.",
      badge: "SUSPECT #4"
    },
    {
      id: "board-register",
      title: "ENVELOPE // REGISTER",
      section: "register",
      type: "envelope",
      position: [0, -1.05, 0.06],
      label: "CLASSIFIED REGISTRATION",
      description: "Sealed envelope & typewriter telegram: Submit your clearance.",
      badge: "SIGN IN"
    }
  ],

  // Red string connections between board pins
  stringConnections: [
    { from: "board-center", to: "board-op1", color: "#a31d1d" },
    { from: "board-center", to: "board-op2", color: "#a31d1d" },
    { from: "board-op1", to: "board-architect", color: "#a31d1d" },
    { from: "board-center", to: "board-cipher", color: "#a31d1d" },
    { from: "board-op2", to: "board-siren", color: "#a31d1d" },
    { from: "board-op2", to: "board-broker", color: "#a31d1d" },
    { from: "board-center", to: "board-timeline", color: "#a31d1d" },
    { from: "board-timeline", to: "board-awards", color: "#a31d1d" },
    { from: "board-center", to: "board-register", color: "#cba358" },
    { from: "board-architect", to: "board-cipher", color: "#8b0000" }
  ]
};
