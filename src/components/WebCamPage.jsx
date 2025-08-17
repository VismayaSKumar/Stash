import React, { useState, useRef, useCallback, useEffect } from "react";
import Header from "./Header";
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
    <div className="min-h-screen w-full max-h-screen overflow-hidden bg-secondary">
      <div className="h-screen ">
        <div className="flex h-4/5 w-full justify-around items-center px-20 -mt-4">
          <div className="preview p-2 h-8/10 w-1/6 border-2 border-dotted flex justify-center items-center ">
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
          <div className="h-8/10 mr-4 ml-17 relative flex justify-center items-center">
          <div className="text-2xl font-mclaren text-whites absolute -top-4">
                  {(shotsTaken==shotsNeeded) && <div>Don't OverThink. You look great !</div>}
                  <div>{shotsTaken}/{shotsNeeded}</div>
          </div>
            <Webcam className="w-[420px] h-[500px] absolute left-14 "
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              mirrored={true}
              videoConstraints={videoConstraints}
              style={{ filter }}
            />
            <img
              src={camerFrame}
              alt=""
              className=" h-[420px] z-20 "
            />
            <button
              onClick={handleSnapClick}
              disabled={countdown !== null || shotsTaken >= shotsNeeded}
              className="snap-button disabled:cursor-not-allowed z-20 flex justify-center items-center h-23 w-21 bg-white rounded-full font-mclaren font-bold text-xl absolute top-57 right-5 shadow-xl mask-radial-from-neutral-900 hover:scale-130 duration-400 hover:bg-pink-100 cursor-pointer disabled:opacity-50"
            >
              {countdown !== null ? countdown : "snap"}
            </button>
            <div className="font-mclaren text-primary absolute -bottom-3 text-xl left-1/3">Lets snap {currentLayout} pictures!!!</div>
          </div>
  
          <div className="layouts bg-primary h-8/10 w-1/5 p-3 ">
            <h1 className="text-xl text-bold font-fraunces text-tertiary mb-6">Layouts</h1>
            <div className={`grid gap-6 grid-cols-2 ${isCapturing || shotsTaken >= shotsNeeded? "opacity-50 cursor-not-allowed": ""}`}>
              <div disabled={countdown !== null || shotsTaken >= shotsNeeded} className={`layout3 disabled:cursor-not-allowed cursor-pointer hover:opacity-65 ${currentLayout==3 ? "scale-115 opacity-90":"" } duration-400`} ><img onClick={()=>setCurrentLayout(3)} src={layout3} alt="" /></div>
              <div disabled={countdown !== null || shotsTaken >= shotsNeeded} className={`layout4 disabled:cursor-not-allowed cursor-pointer hover:opacity-65 ${currentLayout==4 ? "scale-115 opacity-90":"" } duration-400`} ><img onClick={()=>setCurrentLayout(4)} src={layout4} alt="" /></div>
              <div disabled={countdown !== null || shotsTaken >= shotsNeeded} className={`layout2 disabled:cursor-not-allowed cursor-pointer hover:opacity-65 ${currentLayout==2 ? "scale-115 opacity-90":"" } duration-400`} ><img onClick={()=>setCurrentLayout(2)} src={layout2} alt="" /></div>
              <div disabled={countdown !== null || shotsTaken >= shotsNeeded} className={`layout1 disabled:cursor-not-allowed cursor-pointer hover:opacity-65 ${currentLayout==1 ? "scale-115 opacity-90":"" } duration-400`} ><img onClick={()=>setCurrentLayout(1)} src={layout1} alt="" /></div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-12 items-center -mt-9 ">
          <button disabled={shotsTaken < shotsNeeded}
            onClick={() => {setShots([]) ; setShotsTaken(0); setShotsNeeded(currentLayout); setCountdown(null);}}
            className="retake-button disabled:cursor-not-allowed hover:text-last bg-buttonmain hover:bg-buttonhover hover:scale-105 duration-300 text-whites rounded-4xl px-9  py-2 font-fraunces text-xl font-light z-10">
            Retake
          </button>
          <div className="flex gap-7">
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
           onClick={goToResults}  className="bg-buttonmain hover:text-last disabled:cursor-not-allowed hover:bg-buttonhover hover:scale-105 duration-300 text-whites rounded-4xl px-9  py-2 font-fraunces text-xl font-light z-10">
            Next 
          </button>
        </div>
        <div className="flex justify-end h-20 p-3 m-3">
          <div className=" bg-primary font-mclaren text-tertiary h-20 w-1/2 flex justify-center items-center ">
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
