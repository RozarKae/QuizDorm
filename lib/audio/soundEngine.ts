// Procedural Web Audio Synthesizer for QuizDorm Project Aurora
// Zero-latency, zero-asset in-browser audio engine conforming to browser autoplay policies

type SoundType =
  | "tap"
  | "hover"
  | "correct"
  | "error"
  | "tick"
  | "rank_swap"
  | "fanfare"
  | "toggle_on"
  | "toggle_off";

class ProceduralSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private enabled: boolean = true;
  private volume: number = 0.25;
  private initialized: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const storedEnabled = localStorage.getItem("quizdorm_sound_enabled");
      this.enabled = storedEnabled !== null ? storedEnabled === "true" : true;

      const storedVol = localStorage.getItem("quizdorm_sound_volume");
      this.volume = storedVol !== null ? parseFloat(storedVol) : 0.25;

      // Register gesture listener to resume audio context when user interacts
      const unlockAudio = () => {
        this.ensureContext();
        if (this.ctx && this.ctx.state === "suspended") {
          this.ctx.resume();
        }
        window.removeEventListener("click", unlockAudio);
        window.removeEventListener("keydown", unlockAudio);
        window.removeEventListener("touchstart", unlockAudio);
      };

      window.addEventListener("click", unlockAudio, { passive: true });
      window.addEventListener("keydown", unlockAudio, { passive: true });
      window.addEventListener("touchstart", unlockAudio, { passive: true });
    }
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === "undefined") return null;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
        this.initialized = true;
      }
    }

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  public isSoundEnabled(): boolean {
    return this.enabled;
  }

  public setSoundEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("quizdorm_sound_enabled", String(enabled));
      window.dispatchEvent(
        new CustomEvent("quizdorm-sound-state-change", { detail: { enabled, volume: this.volume } })
      );
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(vol: number): void {
    const clamped = Math.max(0, Math.min(1, vol));
    this.volume = clamped;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(clamped, this.ctx.currentTime);
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("quizdorm_sound_volume", String(clamped));
      window.dispatchEvent(
        new CustomEvent("quizdorm-sound-state-change", { detail: { enabled: this.enabled, volume: clamped } })
      );
    }
  }

  public play(type: SoundType): void {
    if (!this.enabled || typeof window === "undefined") return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;

      switch (type) {
        case "tap":
          this.synthesizeTap(ctx, now);
          break;
        case "hover":
          this.synthesizeHover(ctx, now);
          break;
        case "correct":
          this.synthesizeCorrect(ctx, now);
          break;
        case "error":
          this.synthesizeError(ctx, now);
          break;
        case "tick":
          this.synthesizeTick(ctx, now);
          break;
        case "rank_swap":
          this.synthesizeRankSwap(ctx, now);
          break;
        case "fanfare":
          this.synthesizeFanfare(ctx, now);
          break;
        case "toggle_on":
          this.synthesizeToggle(ctx, now, true);
          break;
        case "toggle_off":
          this.synthesizeToggle(ctx, now, false);
          break;
      }
    } catch {
      // Audio execution failure shouldn't disrupt UI state
    }
  }

  // 1. Subtle, crisp UI tap
  private synthesizeTap(ctx: AudioContext, t: number): void {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1050, t);
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.02);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(t);
    osc.stop(t + 0.022);
  }

  // 2. Faint high-tech hover blip
  private synthesizeHover(ctx: AudioContext, t: number): void {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(820, t);

    gain.gain.setValueAtTime(0.04, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.012);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(t);
    osc.stop(t + 0.014);
  }

  // 3. Luminous dual-harmonic chord (Correct Answer)
  private synthesizeCorrect(ctx: AudioContext, t: number): void {
    const notes = [523.25, 659.25, 1046.5]; // C5, E5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = t + idx * 0.04;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.16 / (idx + 1), startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  }

  // 4. Low sub-thud with low-pass dampening (Error / Incorrect Answer)
  private synthesizeError(ctx: AudioContext, t: number): void {
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(65, t + 0.16);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(220, t);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(t);
    osc.stop(t + 0.19);
  }

  // 5. Urgency countdown ticker (Last 5s heartbeat pulse)
  private synthesizeTick(ctx: AudioContext, t: number): void {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, t);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(t);
    osc.stop(t + 0.038);
  }

  // 6. Kinetic pitch sweep (Leaderboard rank swap)
  private synthesizeRankSwap(ctx: AudioContext, t: number): void {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(340, t);
    osc.frequency.exponentialRampToValueAtTime(720, t + 0.09);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(t);
    osc.stop(t + 0.105);
  }

  // 7. Ascending harmonic fanfare (Victory / Podium)
  private synthesizeFanfare(ctx: AudioContext, t: number): void {
    const chord = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteStart = t + idx * 0.08;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, noteStart);

      gain.gain.setValueAtTime(0.15, noteStart);
      gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.45);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(noteStart);
      osc.stop(noteStart + 0.48);
    });
  }

  // 8. Toggle state chirp
  private synthesizeToggle(ctx: AudioContext, t: number, isOn: boolean): void {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const startFreq = isOn ? 480 : 720;
    const endFreq = isOn ? 720 : 480;

    osc.type = "sine";
    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.04);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(t);
    osc.stop(t + 0.05);
  }
}

export const soundEngine = new ProceduralSoundEngine();
