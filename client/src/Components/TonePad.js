import '../Styles/TonepadStyle.css'

import { React , useEffect, useState, useRef} from 'react';
import * as Tone from 'tone';


function TonePad() {

  const [osc, setOsc] = useState(null);
  const [oscType, setOscType] = useState('sine');
  const [effect, setEffect] = useState(null);

  const handleType = (type) => {
    setOscType(type)
    osc.type = oscType;
    console.log(oscType)
  }

  const handleTouchStart = (e) => {
    const clientY = e.touches[0].clientY;
    osc.start()
    osc.frequency.value = clientY;
    console.log(osc)
  };

  const handleTouchMove = (e) => {
    console.log('start')
    const clientY = e.touches[0].clientY;
 
    osc.frequency.value = clientY;

  };

  const handleTouchEnd = () => {
    console.log('end')
    osc.stop()
  };

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

      <div>
        <button id="div-sine" className="osc-type" onClick={() => handleType('sine')}></button>
        <button id="div-square" className="osc-type" onClick={() => handleType('square')}></button>
        <button id="div-sawtooth" className="osc-type" onClick={() => handleType('sawtooth')}></button>
        <button id="div-square" className="osc-type" onClick={() => handleType('triangle')}></button>
      </div>

      <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} className="pad"></div>
    </div>
  );
}

export default TonePad;