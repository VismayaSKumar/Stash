import React, { useState, useRef, useCallback, useEffect } from "react";
import camerFrame from "../assets/images/camerFrame.svg";
import Webcam from "react-webcam";
import countdownSound from '../assets/sounds/countdown.mp3'
import click from '../assets/sounds/click.mp3'
import layout1 from '../assets/images/layout1.svg'
import layout2 from '../assets/images/layout2.svg'
import layout3 from '../assets/images/layout3.svg'
import layout4 from '../assets/images/layout4.svg'
import cameraFront from '../assets/images/camera-front.svg'
import { useNavigate } from "react-router-dom";
import PickupLinesCard from "../cards/PickupLinesCard";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

function WebCamPage() {
 // const [cap, setCap] = useState(null);
  const webcamRef = useRef(null);
  const [filter, setFilter] = useState("none");

  const [countdown, setCountdown] = useState(null);

  const beepTripleSound = useRef(null);
  const clickSound = useRef(null);

  const [currentLayout, setCurrentLayout] = useState(3); 
  const [shotsTaken, setShotsTaken] = useState(0);
  const [shotsNeeded, setShotsNeeded] = useState(3);
  const [shots, setShots] = useState([]);
  
  const [isCapturing, setIsCapturing] = useState(false);

  let navigate = useNavigate();
  const goToResults = () => {
    navigate("/results", { state: { capturedImages: shots } });
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    //setCap(imageSrc);
    setShots((prev)=>[...prev,{src:imageSrc,filter}]);
    setShotsTaken((prev)=>prev+1);
    //setShotsNeeded((prev)=>prev-1);
  }, [filter]);

  //countdown
const handleSnapClick = () => {
  if (!isCapturing) {
    setShots([]);
    setShotsTaken(0);
    setShotsNeeded(currentLayout);
    setCountdown(3);
    beepTripleSound.current.play();
    setIsCapturing(true);
  }
};
useEffect(() => {
  if (!isCapturing) return; // Only run timer while capturing

  if (countdown > 0) {
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  } 
  
  if (countdown === 0) {
    clickSound.current.play();
    capture();

    setTimeout(() => {
      setShotsTaken((prev) => {
        if (prev < shotsNeeded) {
          beepTripleSound.current.play();
          setCountdown(3);
          return prev;
        } else {
          setIsCapturing(false);
          setCountdown(null);
          return prev;
        }
      });
    }, 500);
  }
}, [countdown, isCapturing, capture, shotsNeeded]);

  //layout
  useEffect(()=>{
    setShotsNeeded(currentLayout);
    //setShots([]);
    //setShotsTaken(0)
  },[currentLayout]);


  return (
    <div className="w-full min-h-screen overflow-hidden bg-secondary">
      <div className="lg:h-screen flex flex-col items-center">
        <div className="flex flex-col-reverse lg:flex-row h-3/4 lg:h-4/5 w-full justify-around gap-10 items-center px-10 py-5 lg:px-20 -mt-4">
          <div className="preview p-2 lg:h-8/10 w-full lg:w-1/6 border-2 border-dotted lg:flex justify-center items-center ">
            {shots.length > 0 ? (
              <div className="flex flex-col space-y-4 overflow-y-auto max-h-full w-full">
              {shots.map((shot, index) => (
                <img key={index} src={shot.src} alt={`captured-${index + 1}`}className="rounded-md"
                  style={{ filter:shot.filter }}/>))}
                </div>
                  ) : (
                    <span className="font-mclaren">Snap to add pictures</span>
                  )}
          </div>
          <div className="  h-full lg:h-9/10 lg:mr-4 lg:ml-17 relative gap-3 flex flex-col justify-center items-center">
            <div className="text-2xl flex justify-center items-center flex-col font-mclaren text-whites  lg:-top-4">
                  {(shotsTaken==shotsNeeded) && <div>Don't OverThink. You look great !</div>}
                   {(shotsTaken!=shotsNeeded) && <div>{shotsTaken}/{shotsNeeded}</div>}
            </div>
            <div className="webcam  relative flex justify-center items-center w-auto h-full">
                <Webcam className="w-auto h-full  z-1  "
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  mirrored={true}
                  videoConstraints={videoConstraints}
                  style={{ filter }}/>
                <img src={camerFrame} alt="" className="hidden rotate-90 absolute  z-20 "/>
                <button onClick={handleSnapClick}
                  disabled={countdown !== null || shotsTaken >= shotsNeeded}
                  className="snap-button disabled:cursor-not-allowed z-20 flex justify-center items-center lg:h-23 lg:w-23 h-15 w-15 border-1 border-black bg-white rounded-full font-mclaren font-bold text-lg lg:text-xl absolute bottom-3 right-[40%] lg:right-45 shadow-xl mask-radial-from-neutral-900 hover:scale-130 duration-400 hover:bg-pink-100 cursor-pointer disabled:opacity-50">
                  {countdown !== null ? countdown : "snap"}
                </button>

            </div>

            <div className="font-mclaren text-primary  -bottom-3 text-xl left-1/3">Lets snap {currentLayout} pictures!!!</div>
          </div>
  
          <div className="layouts bg-primary w-full lg:h-8/10 lg:w-1/5 p-3 ">
            <h1 className="text-xl text-bold font-fraunces text-tertiary mb-6">Choose your Layout</h1>
            <div className={`grid gap-6 grid-cols-4 lg:grid-cols-2 ${isCapturing || shotsTaken >= shotsNeeded? "opacity-50 cursor-not-allowed": ""}`}>
              <div disabled={countdown !== null || shotsTaken >= shotsNeeded} className={`layout3 disabled:cursor-not-allowed cursor-pointer hover:opacity-65 ${currentLayout==3 ? "scale-115 opacity-90":"" } duration-400`} ><img onClick={()=>setCurrentLayout(3)} src={layout3} alt="" /></div>
              <div disabled={countdown !== null || shotsTaken >= shotsNeeded} className={`layout4 disabled:cursor-not-allowed cursor-pointer hover:opacity-65 ${currentLayout==4 ? "scale-115 opacity-90":"" } duration-400`} ><img onClick={()=>setCurrentLayout(4)} src={layout4} alt="" /></div>
              <div disabled={countdown !== null || shotsTaken >= shotsNeeded} className={`layout2 disabled:cursor-not-allowed cursor-pointer hover:opacity-65 ${currentLayout==2 ? "scale-115 opacity-90":"" } duration-400`} ><img onClick={()=>setCurrentLayout(2)} src={layout2} alt="" /></div>
              <div disabled={countdown !== null || shotsTaken >= shotsNeeded} className={`layout1 disabled:cursor-not-allowed cursor-pointer hover:opacity-65 ${currentLayout==1 ? "scale-115 opacity-90":"" } duration-400`} ><img onClick={()=>setCurrentLayout(1)} src={layout1} alt="" /></div>
            </div>
          </div>
        </div>
        <div className="flex w-full  lg:w-1/2 flex-wrap lg:flex-nowrap gap-4 justify-center lg:gap-12 items-center lg:-mt-9">
          <button disabled={shotsTaken < shotsNeeded}
            onClick={() => {setShots([]) ; setShotsTaken(0); setShotsNeeded(currentLayout); setCountdown(null);}}
            className="order-1 w-1/3 lg:w-1/5 retake-button disabled:cursor-not-allowed hover:text-last bg-buttonmain hover:bg-buttonhover hover:scale-105 duration-300 text-whites rounded-4xl px-2  lg:px-9  py-2 font-fraunces text-xl font-light z-10">
            Retake
          </button>
          <div className="order-3 lg:order-2 w-full flex gap-4 justify-center lg:gap-7">
            <div
              onClick={() => setFilter("none")}
              className="filter1 h-12 w-12 bg-whites flex justify-center items-center rounded-full cursor-pointer active:border-2 active:border-last" 
            ><img src={cameraFront} className="hover:scale-175 duration-500 h-5 " alt="" /></div>
            <div
              onClick={() => setFilter("grayscale(100%)")}
              className="filter2 h-12 w-12 bg-whites flex justify-center items-center  rounded-full cursor-pointer active:border-2 active:border-last" 
            ><img src={cameraFront} className="hover:scale-175 duration-500 h-5" alt="" style={{ filter: "grayscale(100%)" }} /></div>
            <div
              onClick={() => setFilter("sepia(70%)")}
              className="filter3h-12 w-12 bg-whites flex justify-center items-center rounded-full cursor-pointer active:border-2 active:border-last"
            ><img src={cameraFront} className="hover:scale-175 duration-500 h-5" alt="" style={{ filter: "sepia(70%)" }} /></div>
            <div
              onClick={() => setFilter("brightness(120%) contrast(100%)")}
              className="filter4h-12 w-12 bg-whites flex justify-center items-center rounded-full cursor-pointer active:border-2 active:border-last"
            ><img src={cameraFront} className="hover:scale-175 duration-500 h-5 " alt="" style={{ filter: "brightness(120%) contrast(100%)" }} /></div>
            <div
              onClick={() =>setFilter("drop-shadow(5px 5px 10px rgba(0,0,0,0.5)) saturate(200%)")}
              className="filter5 h-12 w-12 bg-whites flex justify-center items-center rounded-full cursor-pointer active:border-2 active:border-last"
            ><img src={cameraFront} className="hover:scale-175 duration-500 h-5" alt="" style={{ filter: "drop-shadow(5px 5px 10px rgba(0,0,0,0.5)) saturate(200%)" }} /></div>
          </div>
          <button disabled={shotsTaken < shotsNeeded}
           onClick={goToResults}  className="order-2 lg:order-3 w-1/3 bg-buttonmain hover:text-last disabled:cursor-not-allowed hover:bg-buttonhover hover:scale-105 duration-300 text-whites rounded-4xl px-9  py-2 font-fraunces text-xl font-light z-10">
            Next 
          </button>
        </div>
        <div className="flex justify-center lg:justify-end w-full lg:h-20 px-5 p-3 lg:m-3">
          <div className=" bg-primary font-mclaren text-tertiary h-20 lg:w-1/2 flex justify-center items-center ">
            <PickupLinesCard/>
          </div>
        </div>

        {/* Audio Elements */}
        <audio ref={beepTripleSound} src={countdownSound} preload="auto" />
        <audio ref={clickSound} src={click} preload="auto" />
      </div>
    </div>
  );
}

export default WebCamPage;
