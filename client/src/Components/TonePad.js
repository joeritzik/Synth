
import '../Styles/TonepadStyle.css'

import { React , useEffect, useState, useRef } from 'react';
import * as Tone from 'tone';


function TonePad() {

  const [gain, setGain] = useState(null);
  const [osc, setOsc] = useState(null);
  const [oscType, setOscType] = useState('sine');
  const [filterLow, setFilterLow] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [file, setFile] = useState(null);
  const [player, setPlayer] = useState(null);
  const [dist, setDist] = useState(null);
  const [phase, setPhase] = useState(null);
  const [delay, setDelay] = useState(null);
  const [verb, setVerb] = useState(null);
  const recordButton = useRef(null);
  const playButton = useRef(null);
  const distButton = useRef(null);
  const phaseButton = useRef(null);
  const delayButton = useRef(null);
  const verbButton = useRef(null);
  const sineButton = useRef(null);
  const sqButton = useRef(null);
  const sawButton = useRef(null);
  const triButton = useRef(null);
  const pad = useRef(null);
  const pointer = useRef(null);

 //-----DISTORTION
 const handleDist = () => {
   if (dist === null) {
    const _dist = new Tone.Distortion(0.9).toDestination();
    setDist(_dist)
    distButton.current.style.backgroundColor = "hotpink";
    distButton.current.style.color = "white";
   } else {

     distButton.current.style.backgroundColor = "white";
     distButton.current.style.color = "black";
     setDist(null);
   }
}

 //-----PHASE
 const handlePhase = () => {
  if (phase === null) {
   const _Phase = new Tone.Phaser({
    "frequency" : 15, 
    "octaves" : 5, 
    "baseFrequency" : 1000
  }).toDestination();
   setPhase(_Phase)
   phaseButton.current.style.backgroundColor = "hotpink";
   phaseButton.current.style.color = "white";
  } else {
    phaseButton.current.style.backgroundColor = "white";
    phaseButton.current.style.color = "black";
    setPhase(null);
  }
}
 //-----DELAY
const handleDelay = () => {
  if (delay === null) {
   const _delay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
   setDelay(_delay)
   delayButton.current.style.backgroundColor = "hotpink";
   delayButton.current.style.color = "white";
  } else {
   
    delayButton.current.style.backgroundColor = "white";
    delayButton.current.style.color = "black";
    setDelay(null);
  }
}

 //-----VERB
const handleVerb = () => {
  if (verb === null) {
   const _verb = new Tone.JCReverb(0.9).toDestination();
   setVerb(_verb)
   verbButton.current.style.backgroundColor = "hotpink";
   verbButton.current.style.color = "white";
  } else {

    verbButton.current.style.backgroundColor = "white";
    verbButton.current.style.color = "black";
    setVerb(null);
  }
}

  //---------Handle OSC TYPE
  const handleType = (oscType) => {
    setOscType(oscType)
  }

  //---------Handle RECORDING
  const handleRecord = async () => {
    if (!recorder) {
      setRecorder(new Tone.Recorder());
      recordButton.current.style.animation = 'recording 900ms infinite';
    } else {
      recordButton.current.style.animation = '';
      const recording = await recorder.stop();
      setFile(URL.createObjectURL(recording));
      setRecorder(null);
    }
  }

    //---------Handle PLAYBACK
    const handlePlayBack = async () => {
      setPlayer(new Tone.Player(file).toDestination());
      playButton.current.style.animation = 'playing 900ms infinite';
    }

    const handleStopPlayback = () => {
      player.stop();
      playButton.current.style.animation = '';
  }


    //---------Handle Download
    const handleDownload = () => {
      if (file) {
        const anchor = document.createElement("a");
        anchor.download = "recording.webm";
        anchor.href = file;
        anchor.click();
      } else {
        console.log('no file to download')

      }
    };


     //---------Handle TOUCH START
  const handleTouchStart = (e) => {
    const clientY = e.touches[0].clientY;
    const clientX = e.touches[0].clientX;

    // pointer.current.style.visibility = "visible"
    // pointer.current.style.transform = `translate(${clientX - 205}px, ${clientY - 45}px)`

    pad.current.style.boxShadow = "inset 0 0 30px #000000"
   

    osc.connect(filterLow);
    osc.start();
    osc.frequency.value = clientY;
    filterLow.frequency.value = clientX + 300;

  };

    //---------Handle TOUCH MOVE
  const handleTouchMove = (e) => {

    const clientY = e.touches[0].clientY;
    const clientX = e.touches[0].clientX;

    // pad.current.style.boxShadow = "inset 0 0 30px #000000"
    // pointer.current.style.transform = `translate(${clientX - 205}px, ${clientY - 45}px)`

    filterLow.frequency.value = clientX + 300;
    osc.frequency.value = clientY;

  };

    //---------Handle TOUCH END
  const handleTouchEnd = () => {

    pad.current.style.boxShadow = "inset 0 0 20px #000000"
    // pointer.current.style.visibility = "hidden"

    osc.stop()
  };


    //--------- USE EFFECTS

    useEffect(() => {
      setGain(new Tone.Gain(1).toDestination());
      setOsc(new Tone.Oscillator().toDestination());
      setFilterLow(new Tone.Filter(50, 'lowpass').toDestination());      
  }, []);

  useEffect(() => {
    if(osc) {
      osc.connect(gain);
    }
  },[gain]);

  useEffect(() => {
    if(osc) {
      osc.type = oscType;
    }
  },[osc]);

  //---USE OSCTYPE TYPE
    useEffect(() => {
    if (oscType === 'sine') {
      sineButton.current.style.backgroundColor = "hotPink"

   
      sqButton.current.style.backgroundColor = "white"
      sawButton.current.style.backgroundColor = "white"
      triButton.current.style.backgroundColor = "white"
    } else if (oscType === 'square') {
      sqButton.current.style.backgroundColor = "hotPink"

      sineButton.current.style.backgroundColor = "white"
   
      sawButton.current.style.backgroundColor = "white"
      triButton.current.style.backgroundColor = "white"
    } else if (oscType === 'sawtooth') {
      sawButton.current.style.backgroundColor = "hotPink"

      sineButton.current.style.backgroundColor = "white"
      sqButton.current.style.backgroundColor = "white"
      
      triButton.current.style.backgroundColor = "white"
    } else if ( oscType === 'triangle') {
      triButton.current.style.backgroundColor = "hotPink"

      sineButton.current.style.backgroundColor = "white"
      sqButton.current.style.backgroundColor = "white"
      sawButton.current.style.backgroundColor = "white"
 
    } 

    if(osc) {
      osc.type = oscType;
    }
  },[oscType]);

  //---USE EFFECT EFFECT RECORDER
  useEffect(() => {
    if(osc) {
      if (recorder) {
          osc.connect(recorder)
        recorder.start();
      }
    }
  },[recorder]);

    //---USE EFFECT PLAYBACK
    useEffect(() => {
      if(file) {
        if(player) {
          
          player.autostart = true;
          player.playbackRate = 1;
          player.loop = true;
          Tone.loaded().then(() => {
            // eslint-disable-next-line no-unused-expressions
            player.start
          })
        }
      }
    },[player]);

    //---USE EFFECT -------------------Distortion
    useEffect(() => {
      if(osc) {
        if (dist) {
          osc.connect(dist).toDestination();
        } else {
          osc.disconnect(dist)
          setOsc(new Tone.Oscillator().toDestination());
          osc.type = oscType;
        }
      }
    },[dist]);

    //---USE EFFECT -------------------Phase
    useEffect(() => {
      if(osc) {
        if (phase) {
          osc.connect(phase).toDestination();
        } else {
          osc.disconnect(phase)
          setOsc(new Tone.Oscillator().toDestination());
          osc.type = oscType;
        }
      }
    },[phase]);

    //---USE EFFECT -------------------Delay
    useEffect(() => {
      if(osc) {
        if (delay) {
          osc.connect(delay).toDestination();

        } else {
          osc.disconnect(delay)
          setOsc(new Tone.Oscillator().toDestination());
          osc.type = oscType;
        }
      }
    },[delay]);

    //---USE EFFECT -------------------VERB
    useEffect(() => {
      if(osc) {
        if (verb) {
          osc.connect(verb).toDestination();
        } else {
          setOsc(new Tone.Oscillator().toDestination());
          osc.type = oscType;
        }
      }
    },[verb]);


  //------ RETURN
  return (
    <div className="SynthContainer" id="container">
      <div className="pointer pulse fade" ref={pointer}></div>
      <div>
        <button id="div-record" ref={recordButton} className="record main-button" onClick={() => handleRecord()}>Record</button>
        <button id="div-play" ref={playButton} className="play main-button"  onClick={() => handlePlayBack()}>Play</button>
        <button id="div-play" className="stop-play main-button" onClick={() => handleStopPlayback()}>Stop Playback</button>
      </div>
      <div>
        <button id="div-sine" ref={sineButton} className="osc-type main-button" onClick={() => handleType('sine')}>Sine</button>
        <button id="div-square" ref={sqButton} className="osc-type main-button" onClick={() => handleType('square')}>Sq</button>
        <button id="div-sawtooth" ref={sawButton} className="osc-type main-button" onClick={() => handleType('sawtooth')}>Saw</button>
        <button id="div-square" ref={triButton} className="osc-type main-button" onClick={() => handleType('triangle')}>Tri</button>
      </div>
      <div>
        <button id="div-dist" ref={distButton} className="effect-type main-button" onClick={() => handleDist()}>Dist</button>
        <button id="div-phase" ref={phaseButton} className="effect-type main-button" onClick={() => handlePhase()}>Phase</button>
        <button id="div-delay" ref={delayButton} className="effect-type main-button" onClick={() => handleDelay()}>Delay</button>
        <button id="div-verb" ref={verbButton} className="effect-type main-button" onClick={() => handleVerb()}>Verb</button>
      </div>
      <div id="pad" ref={pad} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} className="pad"></div>
      <button id="div-download" className="download" onClick={() => handleDownload()}>Download</button>
    </div>
  );
}

export default TonePad;