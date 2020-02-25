// const ps = new Tone.PitchShift().toMaster();
const eq = new Tone.EQ3().toMaster();
const threeD = new Tone.Panner3D().connect(eq);
// const synth = new Tone.PluckSynth().connect(eq);
// const monoSyn = new Tone.MonoSynth().toMaster();
const memSynth = new Tone.MembraneSynth().connect(threeD);

// synth.triggerAttackRelease(261.63);

const Freq = function() {
  this.frequency = 20;
  this.duration = '8n';
  this.play = function() {
    memSynth.triggerAttackRelease(this.frequency, this.duration);
  };
  this.stop = function() {
    monoSyn.triggerRelease();
  };
};

const Pitch = function() {
  this.pitchDecay = 0.01;
  this.octaves = 1;
};

const Osc = function() {
  this.type = 'sine';
};

const Envelope = function() {
  this.attack = 0.001;
  this.decay = 0.001;
  this.sustain = 0.1;
  this.release = 0.01;
};

const Eq = function() {
  this.low = 0;
  this.mid = 0;
  this.high = 0;
  this.lowFrequency = 0;
  this.highFrequency = 800;
};

const ThreeD = function() {
  this.positionX = 0;
  this.positionY = 0;
  this.positionZ = 0;
  this.orientationX = 0;
  this.orientationY = 0;
  this.orientationZ = 0;
  this.panningModel = 'equalpower';
  this.maxDistance = 10000;
  this.distanceModel = 'linear';
  this.coneOuterGain = 0;
  this.coneOuterAngle = 360;
  this.coneInnerAngle = 360;
  this.refDistance = 1;
  this.rolloffFactor = 1;
};

window.onload = function() {
  const freq = new Freq();
  const osc = new Osc();
  const env = new Envelope();
  const equalizer = new Eq();
  const pitch = new Pitch();
  const threed = new ThreeD();
  const gui = new dat.GUI();
  const f5 = gui.addFolder('Frequency Controll');
  const f6 = gui.addFolder('Pitch Controll');
  const f3 = gui.addFolder('Osc Controll');
  const f4 = gui.addFolder('Envelope Controll');
  const f2 = gui.addFolder('EQ Control');
  const f7 = gui.addFolder('3D Pan Control');
  const xPosControl = f7.add(threed, 'positionX', -50, 50);
  const yPosControl = f7.add(threed, 'positionY', -50, 50);
  const zPosControl = f7.add(threed, 'positionZ', 0, 100);
  const frequencyControl = f5.add(freq, 'frequency', 20, 4000);
  f5.add(freq, 'play');
  const durationControl = f5.add(freq, 'duration', [
    '16n',
    '8n',
    '4n',
    '2n',
    '1n'
  ]);
  const pitchDecayControl = f6.add(pitch, 'pitchDecay', 0.01, 30);
  const octaveControll = f6
    .add(pitch, 'octaves')
    .min(0)
    .max(20)
    .step(0.25);
  const typeControl = f3.add(osc, 'type', [
    'sine',
    'square',
    'triangle',
    'sawtooth'
  ]);
  const attackControl = f4.add(env, 'attack', 0.001, 10);
  const decayControl = f4.add(env, 'decay', 0.001, 10);
  // const decayControl = f4.add(env, '');
  // const attackControl = f1.add(ping, 'attackNoise', 0.1, 20);
  // const dampControl = f1.add(ping, 'dampening', 0, 8000);
  // const resonanceControl = f1
  //   .add(ping, 'resonance')
  //   .min(0)
  //   .max(1)
  //   .step(0.01);
  const lowControl = f2.add(equalizer, 'low', -30, 30);
  const midControl = f2.add(equalizer, 'mid', -30, 30);
  const highControl = f2.add(equalizer, 'high', -30, 30);
  const lowFControl = f2.add(equalizer, 'lowFrequency', 0, 800);
  const highFControl = f2.add(equalizer, 'highFrequency', 800, 2000);

  lowControl.onChange(value => {
    eq.low.value = value;
  });
  midControl.onChange(value => {
    eq.mid.value = value;
  });
  highControl.onChange(value => {
    eq.high.value = value;
  });
  lowFControl.onChange(value => {
    eq.lowFrequency.value = value;
  });
  highFControl.onChange(value => {
    eq.highFrequency.value = value;
  });
  typeControl.onChange(v => {
    console.log(v);
    memSynth.oscillator.type = v;
  });
  attackControl.onChange(v => {
    memSynth.attack = v;
  });

  pitchDecayControl.onChange(v => {
    memSynth.pitchDecay = v;
  });
  octaveControll.onChange(v => {
    memSynth.octaves = v;
  });

  durationControl.onChange(v => {
    memSynth.duration = v;
    console.log(v);
  });

  xPosControl.onChange(v => {
    threeD.positionX = v;
  });

  yPosControl.onChange(v => {
    threeD.positionY = v;
  });

  zPosControl.onChange(v => {
    threeD.positionZ = v;
  });
};

const play = function() {
  // synth.triggerAttack(5186.01);
  // monoSyn.oscillator.type = 'pulse';
  // monoSyn.triggerAttack(120);
};

const noPlay = function() {
  monoSyn.triggerRelease();
};

// document.querySelector('#noteOn').addEventListener('mousedown', play);
// document.querySelector('#noteOn').addEventListener('mouseup', noPlay);
