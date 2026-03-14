"use client";

import Link from "next/link";
import { useRef, useEffect, useCallback } from "react";

const INSTRUMENTS = [
  { id: "kick", label: "Kick" },
  { id: "snare", label: "Snare" },
  { id: "hihat", label: "Hi-Hat" },
  { id: "open", label: "Open HH" },
  { id: "clap", label: "Clap" },
];
const STEPS = 16;
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function noteFreq(note, octave) {
  const semitone = NOTES.indexOf(note);
  return 440 * Math.pow(2, (semitone - 9) / 12 + (octave - 4));
}

export default function DrumMachine() {
  const containerRef = useRef(null);
  const stateRef = useRef(null);

  const initMachine = useCallback((el) => {
    if (!el || stateRef.current) return;
    containerRef.current = el;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const pattern = INSTRUMENTS.map(() => new Array(STEPS).fill(false));
    const bassPattern = new Array(STEPS).fill(-1);
    let bassOctave = 2;
    let playing = false;
    let currentStep = 0;
    let timerID = null;
    let nextNoteTime = 0;
    const scheduleAhead = 0.1;
    const lookAhead = 25;

    function synth(id, time) {
      switch (id) {
        case "kick": {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(150, time);
          osc.frequency.exponentialRampToValueAtTime(30, time + 0.12);
          gain.gain.setValueAtTime(1, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
          osc.connect(gain).connect(ctx.destination);
          osc.start(time);
          osc.stop(time + 0.3);
          break;
        }
        case "snare": {
          const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
          const data = buf.getChannelData(0);
          for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
          const noise = ctx.createBufferSource();
          noise.buffer = buf;
          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(0.6, time);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
          const hp = ctx.createBiquadFilter();
          hp.type = "highpass";
          hp.frequency.value = 1000;
          noise.connect(hp).connect(noiseGain).connect(ctx.destination);
          noise.start(time);
          noise.stop(time + 0.15);
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(200, time);
          osc.frequency.exponentialRampToValueAtTime(80, time + 0.06);
          oscGain.gain.setValueAtTime(0.5, time);
          oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
          osc.connect(oscGain).connect(ctx.destination);
          osc.start(time);
          osc.stop(time + 0.08);
          break;
        }
        case "hihat": {
          const buf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
          const data = buf.getChannelData(0);
          for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
          const src = ctx.createBufferSource();
          src.buffer = buf;
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.3, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
          const hp = ctx.createBiquadFilter();
          hp.type = "highpass";
          hp.frequency.value = 7000;
          src.connect(hp).connect(gain).connect(ctx.destination);
          src.start(time);
          src.stop(time + 0.05);
          break;
        }
        case "open": {
          const buf = ctx.createBuffer(1, ctx.sampleRate * 0.25, ctx.sampleRate);
          const data = buf.getChannelData(0);
          for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
          const src = ctx.createBufferSource();
          src.buffer = buf;
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.3, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
          const bp = ctx.createBiquadFilter();
          bp.type = "bandpass";
          bp.frequency.value = 8000;
          bp.Q.value = 1.5;
          src.connect(bp).connect(gain).connect(ctx.destination);
          src.start(time);
          src.stop(time + 0.25);
          break;
        }
        case "clap": {
          for (let n = 0; n < 3; n++) {
            const offset = n * 0.01;
            const buf = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
            const data = buf.getChannelData(0);
            for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
            const src = ctx.createBufferSource();
            src.buffer = buf;
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.4, time + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, time + offset + 0.1);
            const bp = ctx.createBiquadFilter();
            bp.type = "bandpass";
            bp.frequency.value = 2500;
            bp.Q.value = 0.8;
            src.connect(bp).connect(gain).connect(ctx.destination);
            src.start(time + offset);
            src.stop(time + offset + 0.1);
          }
          break;
        }
      }
    }

    function synthBass(noteIdx, octave, time) {
      const freq = noteFreq(NOTES[noteIdx], octave);
      const duration = 0.2;
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, time);
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(freq * 4, time);
      filter.frequency.exponentialRampToValueAtTime(freq * 1.5, time + duration);
      filter.Q.value = 2;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, time);
      gain.gain.setValueAtTime(0.4, time + duration * 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
      osc.connect(filter).connect(gain).connect(ctx.destination);
      osc.start(time);
      osc.stop(time + duration);
    }

    // Build DOM
    el.innerHTML = `
      <style>
        .dm-machine { background: #16213e; border-radius: 12px; padding: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.4); width: 100%; max-width: 820px; }
        .dm-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
        .dm-header h2 { font-size: 20px; font-weight: 700; letter-spacing: 1px; color: #e94560; margin: 0; }
        .dm-controls { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .dm-btn { background: #0f3460; color: #e0e0e0; border: none; border-radius: 6px; padding: 8px 18px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
        .dm-btn:hover { background: #1a4a7a; }
        .dm-btn.playing { background: #e94560; }
        .dm-bpm { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #e0e0e0; }
        .dm-bpm input[type="range"] { width: 100px; accent-color: #e94560; }
        .dm-bpm-val { font-weight: 700; width: 32px; text-align: right; font-variant-numeric: tabular-nums; }
        .dm-grid { display: flex; flex-direction: column; gap: 4px; }
        .dm-row { display: flex; align-items: center; gap: 4px; }
        .dm-row-label { width: 80px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #8a8a9a; flex-shrink: 0; cursor: pointer; padding: 4px 0; transition: color 0.15s; }
        .dm-row-label:hover { color: #e0e0e0; }
        .dm-steps { display: flex; gap: 3px; flex: 1; }
        .dm-step { flex: 1; aspect-ratio: 1; max-height: 40px; border-radius: 4px; background: #0f3460; cursor: pointer; transition: background 0.1s, transform 0.1s; position: relative; }
        .dm-step:hover { background: #1a4a7a; }
        .dm-step.active { transform: scale(1.05); }
        .dm-step.beat-marker { background: #122a50; }
        .dm-step.playhead { box-shadow: inset 0 0 0 2px rgba(255,255,255,0.4); }
        .dm-row[data-inst="kick"] .dm-step.active { background: #e94560; }
        .dm-row[data-inst="snare"] .dm-step.active { background: #f5a623; }
        .dm-row[data-inst="hihat"] .dm-step.active { background: #00c9a7; }
        .dm-row[data-inst="open"] .dm-step.active { background: #4fc3f7; }
        .dm-row[data-inst="clap"] .dm-step.active { background: #bb86fc; }
        .dm-row[data-inst="bass"] .dm-step.active { background: #e94560; }
        .dm-divider { height: 1px; background: #1a3a6a; margin: 10px 0 6px; }
        .dm-section-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #4a5a7a; margin-bottom: 6px; }
        .dm-note-label { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #fff; pointer-events: none; opacity: 0; }
        .dm-step.active .dm-note-label { opacity: 1; }
        .dm-octave { display: flex; align-items: center; gap: 6px; margin-left: 80px; margin-bottom: 6px; }
        .dm-octave span { font-size: 11px; color: #8a8a9a; font-weight: 600; }
        .dm-oct-btn { padding: 2px 8px; font-size: 12px; font-weight: 700; border-radius: 4px; min-width: 0; background: #0f3460; color: #e0e0e0; border: none; cursor: pointer; }
        .dm-oct-btn:hover { background: #1a4a7a; }
        .dm-oct-val { font-variant-numeric: tabular-nums; width: 16px; text-align: center; font-size: 12px; font-weight: 700; color: #e0e0e0; }
        .dm-step::-webkit-scrollbar { display: none; }
      </style>
      <div class="dm-machine">
        <div class="dm-header">
          <h2>DR-808</h2>
          <div class="dm-controls">
            <div class="dm-bpm">
              <span>BPM</span>
              <input type="range" id="dm-bpm" min="60" max="180" value="120">
              <span class="dm-bpm-val" id="dm-bpmVal">120</span>
            </div>
            <button class="dm-btn" id="dm-playBtn">Play</button>
            <button class="dm-btn" id="dm-clearBtn">Clear</button>
          </div>
        </div>
        <div class="dm-grid" id="dm-grid"></div>
      </div>
    `;

    const gridEl = el.querySelector("#dm-grid");
    const stepEls = [];

    INSTRUMENTS.forEach((inst, row) => {
      const rowEl = document.createElement("div");
      rowEl.className = "dm-row";
      rowEl.dataset.inst = inst.id;
      const label = document.createElement("div");
      label.className = "dm-row-label";
      label.textContent = inst.label;
      label.addEventListener("click", () => synth(inst.id, ctx.currentTime));
      rowEl.appendChild(label);
      const stepsEl = document.createElement("div");
      stepsEl.className = "dm-steps";
      stepEls[row] = [];
      for (let col = 0; col < STEPS; col++) {
        const step = document.createElement("div");
        step.className = "dm-step" + (col % 4 === 0 ? " beat-marker" : "");
        step.addEventListener("click", () => {
          pattern[row][col] = !pattern[row][col];
          step.classList.toggle("active");
        });
        stepsEl.appendChild(step);
        stepEls[row][col] = step;
      }
      rowEl.appendChild(stepsEl);
      gridEl.appendChild(rowEl);
    });

    // Bass section
    const divider = document.createElement("div");
    divider.className = "dm-divider";
    gridEl.appendChild(divider);
    const sectionLabel = document.createElement("div");
    sectionLabel.className = "dm-section-label";
    sectionLabel.textContent = "Bassline";
    gridEl.appendChild(sectionLabel);

    const octaveCtrl = document.createElement("div");
    octaveCtrl.className = "dm-octave";
    const octLabel = document.createElement("span");
    octLabel.textContent = "OCT";
    const octDown = document.createElement("button");
    octDown.className = "dm-oct-btn";
    octDown.textContent = "-";
    const octValue = document.createElement("span");
    octValue.className = "dm-oct-val";
    octValue.textContent = bassOctave;
    const octUp = document.createElement("button");
    octUp.className = "dm-oct-btn";
    octUp.textContent = "+";
    octDown.addEventListener("click", () => { if (bassOctave > 1) { bassOctave--; octValue.textContent = bassOctave; } });
    octUp.addEventListener("click", () => { if (bassOctave < 4) { bassOctave++; octValue.textContent = bassOctave; } });
    octaveCtrl.append(octLabel, octDown, octValue, octUp);
    gridEl.appendChild(octaveCtrl);

    const bassRow = document.createElement("div");
    bassRow.className = "dm-row";
    bassRow.dataset.inst = "bass";
    const bassLabel = document.createElement("div");
    bassLabel.className = "dm-row-label";
    bassLabel.textContent = "Bass";
    bassLabel.addEventListener("click", () => synthBass(0, bassOctave, ctx.currentTime));
    bassRow.appendChild(bassLabel);
    const bassStepsEl = document.createElement("div");
    bassStepsEl.className = "dm-steps";
    const bassStepEls = [];

    for (let col = 0; col < STEPS; col++) {
      const step = document.createElement("div");
      step.className = "dm-step" + (col % 4 === 0 ? " beat-marker" : "");
      const nl = document.createElement("span");
      nl.className = "dm-note-label";
      step.appendChild(nl);
      step.addEventListener("click", () => {
        const cur = bassPattern[col];
        if (cur === -1) {
          bassPattern[col] = 0;
          step.classList.add("active");
          nl.textContent = NOTES[0];
          synthBass(0, bassOctave, ctx.currentTime);
        } else {
          const next = cur + 1;
          if (next >= NOTES.length) {
            bassPattern[col] = -1;
            step.classList.remove("active");
            nl.textContent = "";
          } else {
            bassPattern[col] = next;
            nl.textContent = NOTES[next];
            synthBass(next, bassOctave, ctx.currentTime);
          }
        }
      });
      step.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        const cur = bassPattern[col];
        if (cur === -1) {
          bassPattern[col] = NOTES.length - 1;
          step.classList.add("active");
          nl.textContent = NOTES[NOTES.length - 1];
          synthBass(NOTES.length - 1, bassOctave, ctx.currentTime);
        } else if (cur === 0) {
          bassPattern[col] = -1;
          step.classList.remove("active");
          nl.textContent = "";
        } else {
          bassPattern[col] = cur - 1;
          nl.textContent = NOTES[cur - 1];
          synthBass(cur - 1, bassOctave, ctx.currentTime);
        }
      });
      bassStepsEl.appendChild(step);
      bassStepEls[col] = step;
    }
    bassRow.appendChild(bassStepsEl);
    gridEl.appendChild(bassRow);

    const bassRowIdx = INSTRUMENTS.length;
    stepEls[bassRowIdx] = bassStepEls;
    const totalRows = INSTRUMENTS.length + 1;

    // Transport
    const bpmSlider = el.querySelector("#dm-bpm");
    const bpmValEl = el.querySelector("#dm-bpmVal");
    const playBtn = el.querySelector("#dm-playBtn");
    const clearBtn = el.querySelector("#dm-clearBtn");

    bpmSlider.addEventListener("input", () => { bpmValEl.textContent = bpmSlider.value; });

    function getStepDuration() { return 60 / parseInt(bpmSlider.value) / 4; }

    function scheduleStep(step, time) {
      INSTRUMENTS.forEach((inst, row) => { if (pattern[row][step]) synth(inst.id, time); });
      if (bassPattern[step] >= 0) synthBass(bassPattern[step], bassOctave, time);
    }

    function updatePlayhead(step) {
      const prev = (step - 1 + STEPS) % STEPS;
      for (let r = 0; r < totalRows; r++) {
        stepEls[r][prev].classList.remove("playhead");
        stepEls[r][step].classList.add("playhead");
      }
    }

    function scheduler() {
      while (nextNoteTime < ctx.currentTime + scheduleAhead) {
        scheduleStep(currentStep, nextNoteTime);
        const s = currentStep;
        const delay = Math.max(0, (nextNoteTime - ctx.currentTime) * 1000);
        setTimeout(() => updatePlayhead(s), delay);
        nextNoteTime += getStepDuration();
        currentStep = (currentStep + 1) % STEPS;
      }
      timerID = setTimeout(scheduler, lookAhead);
    }

    function start() {
      if (ctx.state === "suspended") ctx.resume();
      playing = true;
      playBtn.textContent = "Stop";
      playBtn.classList.add("playing");
      currentStep = 0;
      nextNoteTime = ctx.currentTime;
      scheduler();
    }

    function stop() {
      playing = false;
      playBtn.textContent = "Play";
      playBtn.classList.remove("playing");
      clearTimeout(timerID);
      for (let r = 0; r < totalRows; r++) {
        for (let c = 0; c < STEPS; c++) stepEls[r][c].classList.remove("playhead");
      }
    }

    playBtn.addEventListener("click", () => (playing ? stop() : start()));
    clearBtn.addEventListener("click", () => {
      for (let r = 0; r < INSTRUMENTS.length; r++) {
        for (let c = 0; c < STEPS; c++) { pattern[r][c] = false; stepEls[r][c].classList.remove("active"); }
      }
      for (let c = 0; c < STEPS; c++) {
        bassPattern[c] = -1;
        bassStepEls[c].classList.remove("active");
        bassStepEls[c].querySelector(".dm-note-label").textContent = "";
      }
    });

    stateRef.current = { stop, ctx };
  }, []);

  useEffect(() => {
    return () => {
      if (stateRef.current) {
        stateRef.current.stop();
        stateRef.current.ctx.close();
        stateRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: "#1a1a2e", color: "#e0e0e0", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div className="w-full max-w-[820px] mb-6">
        <Link
          href="/playground"
          className="font-mono text-sm text-[#e94560] hover:text-[#ff6b81] transition-colors"
        >
          &larr; Back to playground
        </Link>
      </div>
      <div ref={initMachine} />
    </div>
  );
}
