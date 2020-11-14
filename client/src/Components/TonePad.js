import '../Styles/TonepadStyle.css'

<<<<<<< HEAD
import { React , useEffect, useState } from 'react';
=======
import { React , useEffect, useState, useRef} from 'react';
>>>>>>> 25b8d79a0ff61d585f9c177c11542e2ced5fa0dc
import * as Tone from 'tone';


function TonePad() {

  const [osc, setOsc] = useState(null);
  const [oscType, setOscType] = useState('sine');
<<<<<<< HEAD
  
  const [effect, setEffect] = useState(null);

  let effectCurrent = null;

  //---------Handle OSC TYPE
  const handleType = (oscType) => {
    setOscType(oscType)
  }

    //---------Handle EFFECT TYPE
  const handleEffect = (effectType) => {
    setEffect(effectType);
  }

     //---------Handle TOUCH START
=======
  const [effect, setEffect] = useState(null);

  const handleType = (type) => {
    setOscType(type)
    osc.type = oscType;
    console.log(oscType)
  }

>>>>>>> 25b8d79a0ff61d585f9c177c11542e2ced5fa0dc
  const handleTouchStart = (e) => {
    const clientY = e.touches[0].clientY;
    osc.start()
    osc.frequency.value = clientY;
<<<<<<< HEAD
    // console.log(osc)
  };

    //---------Handle TOUCH MOVE
=======
    console.log(osc)
  };

>>>>>>> 25b8d79a0ff61d585f9c177c11542e2ced5fa0dc
  const handleTouchMove = (e) => {
    console.log('start')
    const clientY = e.touches[0].clientY;
 
    osc.frequency.value = clientY;

  };

<<<<<<< HEAD
    //---------Handle TOUCH END
=======
>>>>>>> 25b8d79a0ff61d585f9c177c11542e2ced5fa0dc
  const handleTouchEnd = () => {
    console.log('end')
    osc.stop()
  };

<<<<<<< HEAD
    //--------- USE EFFECTS

    useEffect(() => {
      setOsc(new Tone.Oscillator().toDestination());
      
  }, []);

  //---USE EFFECT TYPE
    useEffect(() => {
    if(osc) {
      osc.type = oscType;
    }
  },[oscType]);

    //---USE EFFECT EFFECT
    useEffect(() => {
      if(osc) {
        if (effect) {
          osc.connect(effect)
        }
        
      }
    },[effect]);


  //------ RETURN
  return (
    <div className="SynthContainer">
      <h1>Synth</h1>
      <div>
        <button id="div-sine" className="osc-type" onClick={() => osc.disconnect(effect)}></button>

      </div>
=======
    useEffect(() => {
      setOsc(new Tone.Oscillator().toDestination());
  }, []);

    useEffect((effect) => {
      if (effect) {
        
      }
    },[effect])

  return (
    <div className="SynthContainer">
      <h1>Synth</h1>

>>>>>>> 25b8d79a0ff61d585f9c177c11542e2ced5fa0dc
      <div>
        <button id="div-sine" className="osc-type" onClick={() => handleType('sine')}></button>
        <button id="div-square" className="osc-type" onClick={() => handleType('square')}></button>
        <button id="div-sawtooth" className="osc-type" onClick={() => handleType('sawtooth')}></button>
        <button id="div-square" className="osc-type" onClick={() => handleType('triangle')}></button>
      </div>
<<<<<<< HEAD
      <div>
        <button id="div-dist" className="effect-type" onClick={() => handleEffect(new Tone.Distortion(5).toDestination())}></button>
        <button id="div-dontKnow" className="effect-type" onClick={() => handleEffect(new Tone.Phaser({
            "frequency" : 15, 
            "octaves" : 5, 
            "baseFrequency" : 1000
          }).toDestination())}>
        </button>
        <button id="div-dontknow" className="effect-type" onClick={() => handleEffect(new Tone.FeedbackDelay("8n", 0.5).toDestination())}></button>
        <button id="div-dontknow" className="effect-type" onClick={() => handleEffect(new Tone.JCReverb(0.4).connect(Tone.Master))}></button>
      </div>
=======
>>>>>>> 25b8d79a0ff61d585f9c177c11542e2ced5fa0dc

      <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} className="pad"></div>
    </div>
  );
}

export default TonePad;