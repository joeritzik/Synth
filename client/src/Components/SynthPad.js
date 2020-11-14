// import { React , useEffect, useState, useRef} from 'react';
// import '../Styles/SynthPadStyle.css'

// function SynthPad() {
//   const [oscType, setOscType] = useState('sine');
//   const [osc, setOsc] = useState(null);
//   const [ctx, setCtx] = useState(null);
//   const [filter, setFilter] = useState(null);
  

//   const handleType = (oscType) => {
//     setOscType(oscType)
//     console.log(oscType)
//   }

//   const handleTouchStart = (e) => {
//     const clientY = e.touches[0].clientY;

//     if (osc) {
//       osc.connect(ctx.destination)
//       osc.frequency.value = clientY;  
//       ctx.resume();//move to handle click pop up
//     }

//     //if filter --- filter connect
//     if (filter) {
//       osc.connect(filter)
//       filter.connect(ctx.destination)
//       console.log('connected')
//     }
    
//   };

//   const handleTouchMove = (e) => {
//     console.log('start')
//     if (osc) {
//       const clientX = e.touches[0].clientX;
//       const clientY = e.touches[0].clientY;

//       filter.frequency.value = (clientX + 200)
      
    
//       osc.frequency.value = clientY;  
//     }
//   };

//   const handleTouchEnd = () => {
//     console.log('end')
//     if (osc) {
//       osc.disconnect(ctx.destination)
//     }
//     if (filter) {
//       osc.disconnect(filter);
//     }
//     console.log(filter)
//   };


//   useEffect(() => {
//     console.log('first use effect')  

//     const AudioContext = window.AudioContext || window.webkitAudioContext;
//     setCtx(new AudioContext());
//   }, []);


//   useEffect(() => {
//     if(osc) {
//       console.log('second use effect')
//       osc.type = oscType;
//     }
//   },[oscType]);
  

//   useEffect(() => {
//     if(filter) {
//       console.log(filter)
//       // osc.connect(filter)
//     }
//   },[filter]);

//   //create another useffect to change filter type like above

//   useEffect(() => {
//     if (ctx) {
//       const _osc = ctx.createOscillator();
//       _osc.start(ctx.currentTime);
//       _osc.type = oscType;

//       const _filter = ctx.createBiquadFilter();
//       _filter.type = 'highpass';
//       _filter.Q.value = 0;
//       _filter.gain.value = 0;
      
//       setFilter(_filter)
//       setOsc(_osc);
     
//     }
//   }, [ctx]);




//   return (
//     <div className="SynthContainer">
//       <h1>Synth</h1>

//       <div>
//         <button id="div-sine" className="osc-type" onClick={() => handleType('sine')}></button>
//         <button id="div-square" className="osc-type" onClick={() => handleType('square')}></button>
//         <button id="div-sawtooth" className="osc-type" onClick={() => handleType('sawtooth')}></button>
//         <button id="div-square" className="osc-type" onClick={() => handleType('triangle')}></button>
//       </div>

//       <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} className="pad"></div>
//     </div>
//   );
// }

// export default SynthPad;