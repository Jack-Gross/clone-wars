(function () {
  let audio = null;
  function getAudio() {
    if (!audio) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      audio = new AudioCtx();
    }
    if (audio.state === 'suspended') audio.resume();
    return audio;
  }

  function flap() {
    try {
      const context = getAudio();
      if (!context) return;
      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(900, now);
      oscillator.frequency.exponentialRampToValueAtTime(180, now + 0.12);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.12);
    } catch (error) {}
  }

  function score() {
    try {
      const context = getAudio();
      if (!context) return;
      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(220, now);
      oscillator.frequency.exponentialRampToValueAtTime(1300, now + 0.32);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.16, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.32);
    } catch (error) {}
  }

  function crash() {
    try {
      const context = getAudio();
      if (!context) return;
      const now = context.currentTime;
      const duration = 0.38;
      const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
      const samples = buffer.getChannelData(0);
      for (let i = 0; i < samples.length; i += 1) {
        samples[i] = (Math.random() * 2 - 1) * (1 - i / samples.length);
      }
      const source = context.createBufferSource();
      const gain = context.createGain();
      source.buffer = buffer;
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      source.connect(gain);
      gain.connect(context.destination);
      source.start(now);
      source.stop(now + duration);
    } catch (error) {}
  }

  window.SOUNDS = { flap: flap, score: score, crash: crash };
})();
