/**
 * Web Audio API Procedural Noir Sound Engine
 * Generates realistic vintage detective office sound effects & noir atmospheric jazz
 * 100% self-contained, no external network dependencies or broken assets.
 */

class SoundSystem {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.musicGain = null;
    this.ambientGain = null;

    this.isMuted = true;
    this.ambientPlaying = false;
    this.volume = 0.6;
    this.sfxVolume = 0.8;

    // Generators
    this.rainNode = null;
    this.vinylNode = null;
    this.musicInterval = null;
    this.activeOscillators = [];

    // Analysis for retro VU meter
    this.analyser = null;
    this.analyserData = null;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.isMuted ? 0 : this.volume;

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = this.sfxVolume;
      this.sfxGain.connect(this.masterGain);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.45;
      this.musicGain.connect(this.masterGain);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.value = 0.35;
      this.ambientGain.connect(this.masterGain);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyserData = new Uint8Array(this.analyser.frequencyBinCount);

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  }

  ensureContext() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.ensureContext();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(
        this.isMuted ? 0 : this.volume,
        this.ctx.currentTime,
        0.08
      );
    }
    if (!this.isMuted && !this.ambientPlaying) {
      this.startAmbientNoir();
    }
    return this.isMuted;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (!this.isMuted && this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  getAudioLevel() {
    if (!this.analyser || !this.analyserData || this.isMuted) return 0;
    this.analyser.getByteFrequencyData(this.analyserData);
    let sum = 0;
    for (let i = 0; i < this.analyserData.length; i++) {
      sum += this.analyserData[i];
    }
    return sum / (this.analyserData.length * 255);
  }

  // --- SOUND EFFECTS ---

  playTypewriterKey() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    
    // Metallic punch (bandpass noise)
    const bufferSize = this.ctx.sampleRate * 0.04;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1600 + Math.random() * 600;
    filter.Q.value = 4.0;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    // Mechanical click body (short sine chirp)
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320 + Math.random() * 80, t);
    osc.frequency.exponentialRampToValueAtTime(110, t + 0.03);

    oscGain.gain.setValueAtTime(0.3, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.connect(oscGain);
    oscGain.connect(this.sfxGain);

    noise.start(t);
    osc.start(t);
    noise.stop(t + 0.05);
    osc.stop(t + 0.05);
  }

  playCarriageReturn() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;

    // Classic typewriter bell (bright brass bell)
    const osc = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2480, t);

    const overtone = this.ctx.createOscillator();
    const overtoneGain = this.ctx.createGain();
    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(4960, t);

    bellGain.gain.setValueAtTime(0.25, t);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);

    overtoneGain.gain.setValueAtTime(0.12, t);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);

    osc.connect(bellGain);
    overtone.connect(overtoneGain);
    bellGain.connect(this.sfxGain);
    overtoneGain.connect(this.sfxGain);

    osc.start(t);
    overtone.start(t);
    osc.stop(t + 0.85);
    overtone.stop(t + 0.45);
  }

  playPaperRustle() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const dur = 0.28;
    const bufferSize = this.ctx.sampleRate * dur;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, t);
    filter.frequency.exponentialRampToValueAtTime(1400, t + dur);
    filter.Q.value = 1.2;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.35, t + dur * 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(t);
    noise.stop(t + dur + 0.05);
  }

  playStamp() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    // Deep heavy stamp thud
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.12);

    oscGain.gain.setValueAtTime(0.7, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    // Surface slap noise
    const bufferSize = this.ctx.sampleRate * 0.06;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1100;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.5, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(oscGain);
    oscGain.connect(this.sfxGain);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);

    osc.start(t);
    noise.start(t);
    osc.stop(t + 0.25);
    noise.stop(t + 0.1);
  }

  playCameraShutter() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    
    // Quick double click of 35mm film shutter
    [0, 0.07].forEach((delay, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(idx === 0 ? 1200 : 800, t + delay);
      osc.frequency.exponentialRampToValueAtTime(200, t + delay + 0.025);

      gain.gain.setValueAtTime(0.3, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.03);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t + delay);
      osc.stop(t + delay + 0.04);
    });
  }

  playPinClick() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2800, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.04);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.06);
  }

  playLampClick() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.exponentialRampToValueAtTime(90, t + 0.08);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.1);
  }

  playTapeClick() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.07);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.09);
  }

  // --- AMBIENT NOIR & VINYL MUSIC GENERATOR ---

  startAmbientNoir() {
    this.ensureContext();
    if (!this.ctx || this.ambientPlaying) return;
    this.ambientPlaying = true;

    // 1. Vinyl Record Crackle Generator
    const vinylBufferSize = this.ctx.sampleRate * 2;
    const vinylBuffer = this.ctx.createBuffer(1, vinylBufferSize, this.ctx.sampleRate);
    const vinylData = vinylBuffer.getChannelData(0);
    for (let i = 0; i < vinylBufferSize; i++) {
      // Occasional needle pop / crackle
      if (Math.random() < 0.0015) {
        vinylData[i] = (Math.random() * 2 - 1) * 0.8;
      } else {
        vinylData[i] = (Math.random() * 2 - 1) * 0.015;
      }
    }
    this.vinylNode = this.ctx.createBufferSource();
    this.vinylNode.buffer = vinylBuffer;
    this.vinylNode.loop = true;

    const vinylFilter = this.ctx.createBiquadFilter();
    vinylFilter.type = 'bandpass';
    vinylFilter.frequency.value = 2400;
    vinylFilter.Q.value = 1.8;

    this.vinylNode.connect(vinylFilter);
    vinylFilter.connect(this.ambientGain);
    this.vinylNode.start();

    // 2. Distant Rain On Glass (warm band-passed noise)
    const rainBufferSize = this.ctx.sampleRate * 3;
    const rainBuffer = this.ctx.createBuffer(1, rainBufferSize, this.ctx.sampleRate);
    const rainData = rainBuffer.getChannelData(0);
    for (let i = 0; i < rainBufferSize; i++) {
      rainData[i] = (Math.random() * 2 - 1) * 0.12;
    }
    this.rainNode = this.ctx.createBufferSource();
    this.rainNode.buffer = rainBuffer;
    this.rainNode.loop = true;

    const rainFilter = this.ctx.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.value = 750;

    this.rainNode.connect(rainFilter);
    rainFilter.connect(this.ambientGain);
    this.rainNode.start();

    // 3. Melancholic 1990s Noir Rhodes / Muted Jazz Pad Chord Progression
    // Chords in D minor noir (Dm9 -> Bbmaj7#11 -> Gm9 -> A7b9)
    const noirChords = [
      [146.83, 220.00, 261.63, 311.13, 349.23], // Dm9 (D3, A3, C4, Eb4/E4, F4)
      [116.54, 174.61, 233.08, 293.66, 370.00], // Bbmaj7#11 (Bb2, F3, Bb3, D4, F#4)
      [98.00, 146.83, 196.00, 233.08, 293.66],  // Gm9 (G2, D3, G3, Bb3, D4)
      [110.00, 164.81, 207.65, 246.94, 329.63], // A7b9 (A2, E3, G#3, B3, E4)
    ];

    let chordIdx = 0;
    const playNextChord = () => {
      if (!this.ambientPlaying || !this.ctx) return;
      const t = this.ctx.currentTime;
      const chord = noirChords[chordIdx % noirChords.length];
      chordIdx++;

      chord.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        // Gentle vibrato / tape flutter
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.value = 4.5 + Math.random() * 0.5;
        lfoGain.gain.value = 1.2;
        lfo.connect(osc.frequency);
        lfo.start(t);
        lfo.stop(t + 7.5);

        // Low-pass warmth
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 650;

        // Long swell and gentle release
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(0.045 / (i + 1), t + 1.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 7.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);

        osc.start(t);
        osc.stop(t + 7.5);
      });
    };

    playNextChord();
    this.musicInterval = setInterval(playNextChord, 7000);
  }

  stopAmbientNoir() {
    this.ambientPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    if (this.vinylNode) {
      try { this.vinylNode.stop(); } catch (_) {}
      this.vinylNode = null;
    }
    if (this.rainNode) {
      try { this.rainNode.stop(); } catch (_) {}
      this.rainNode = null;
    }
  }
}

export const sound = new SoundSystem();
export default sound;
