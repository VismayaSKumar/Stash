import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import aesth from '../assets/frames/frameSample/aesth.png'
import spiderman from '../assets/frames/frameSample/spiderman.png'
import heart from '../assets/frames/frameSample/heart.png'
import flower from '../assets/frames/frameSample/flower.png'
import pop from '../assets/frames/frameSample/pop.png'
import retro from '../assets/frames/frameSample/retro.png'
import white from '../assets/frames/frameSample/white.png'
import black from '../assets/frames/frameSample/black.png'
import { useState } from "react";
import PickupLinesCard from "../cards/PickupLinesCard";
import html2cancas from "html2canvas";
import { useRef } from "react";

const layoutFrames = {
  1: Object.values(import.meta.glob('../assets/frames/layout1/*.{png,jpg,jpeg}', { eager: true, as: 'url' })),
  2: Object.values(import.meta.glob('../assets/frames/layout2/*.{png,jpg,jpeg}', { eager: true, as: 'url' })),
  3: Object.values(import.meta.glob('../assets/frames/layout3/*.{png,jpg,jpeg}', { eager: true, as: 'url' })),
  4: Object.values(import.meta.glob('../assets/frames/layout4/*.{png,jpg,jpeg}', { eager: true, as: 'url' })),
};


const layoutStyles = {
  1: "pt-10 pb-30",
  2: "pt-7 pb-15",
  3: "pt-9 pb-18",
  4: "pt-7 pb-20"
};

const framesDataLayout = {
    1: [
        {sample:aesth, frame: layoutFrames[1][0]},
        {sample:spiderman, frame: layoutFrames[1][7]},
        {sample:heart, frame: layoutFrames[1][3]},
        {sample:flower, frame: layoutFrames[1][2]},
        {sample:pop, frame: layoutFrames[1][5]},
        {sample:retro, frame: layoutFrames[1][6]},
        {sample:white, frame: layoutFrames[1][4]},
        {sample:black, frame: layoutFrames[1][1]},
    ],
    2: [
        {sample:aesth, frame: layoutFrames[2][0]},
        {sample:spiderman, frame: layoutFrames[2][7]},
        {sample:heart, frame: layoutFrames[2][3]},
        {sample:flower, frame: layoutFrames[2][2]},
        {sample:pop, frame: layoutFrames[2][5]},
        {sample:retro, frame: layoutFrames[2][6]},
        {sample:white, frame: layoutFrames[2][4]},
        {sample:black, frame: layoutFrames[2][1]},
    ],
    3: [
        {sample:aesth, frame: layoutFrames[3][0]},
        {sample:spiderman, frame: layoutFrames[3][7]},
        {sample:heart, frame: layoutFrames[3][3]},
        {sample:flower, frame: layoutFrames[3][2]},
        {sample:pop, frame: layoutFrames[3][5]},
        {sample:retro, frame: layoutFrames[3][6]},
        {sample:white, frame: layoutFrames[3][4]},
        {sample:black, frame: layoutFrames[3][1]},
    ],
    4: [
        {sample:aesth, frame: layoutFrames[4][0]},
        {sample:spiderman, frame: layoutFrames[4][7]},
        {sample:heart, frame: layoutFrames[4][3]},
        {sample:flower, frame: layoutFrames[4][2]},
        {sample:pop, frame: layoutFrames[4][5]},
        {sample:retro, frame: layoutFrames[4][6]},
        {sample:white, frame: layoutFrames[4][4]},
        {sample:black, frame: layoutFrames[4][1]},
    ],
}

function Results() {
  const location = useLocation();
  const { capturedImages,roomId } = location.state;
  const currentLayout=capturedImages.length;
  const previewLayoutClass = layoutStyles[currentLayout] || "pt-7 pb-15";
  const framesForCurrentLayout = framesDataLayout[currentLayout] || [];
  const [selectedFrame,setSelectedFrame] = useState(framesForCurrentLayout[0]?.frame || "")

  const previewRef = useRef(null);
  const handleDownload=async()=>{
    const canvas = await html2cancas(previewRef.current,{
        useCORS:true
    });
    const link = document.createElement('a');
    link.href=canvas.toDataURL('image/png');
    link.download='photostrip.png';
    link.click();
  }
  let navigate = useNavigate();
  const navigateToSnapAgain = ()=>{
    if(roomId) navigate(`/room/${roomId}`)
    else navigate("/webcam");
  }

  return (
    <div className="w-full min-h-screen overflow-hidden bg-secondary flex flex-col">
        <div className="flex flex-col-reverse lg:flex-row lg:gap-23 gap-9  lg:justify-between  h-full px-8 w-full lg:px-56 py-5">
            <div ref={previewRef} className="border-1 flex flex-col items-center justify-center  relative">
                <div className={`border-2 border-dotted flex flex-col items-center justify-center relative ${previewLayoutClass}`}>                    
                    {capturedImages.map((imgObj, idx) => (
                    <img key={idx} src={imgObj.src} alt={`Captured ${idx + 1}`}
                        className="object-contain bg-black h-full w-full lg:h-[390px] lg:w-[420px] lg:px-3 py-0"
                        style={{filter:imgObj.filter || "none"}}
                        />
                    ))}
                </div>
                {selectedFrame && (<img className="absolute righ-0 h-full w-full pointer-events-none object-cover z-30  " src={selectedFrame} alt="" />)}  
            </div>

            <div className="flex-1 flex flex-col gap-10 lg:gap-15 ">
                <div className="bg-primary rounded-2xl px-4 lg:px-5 py-4 lg:py-10">
                    <h1 className="text-xl lg:text-2xl font-fraunces font-bold text-tertiary ">Frames</h1>
                    <div className="grid grid-cols-6 gap-2 m-1 lg:m-4">
                       {framesForCurrentLayout.map((item, idx) => (
                        <img key={idx} src={item.sample} alt={`Frame ${idx + 1}`}
                            onClick={()=>{setSelectedFrame(item.frame)}}
                            className={`object-cover rounded-full hover:scale-110 duration-300 cursor-pointer ${selectedFrame===item.frame?"ring-3 ring-tertiary ":""}`}
                        />
                       ))}
                    </div>
                </div>
                <div className="bg-primar bg-primary  rounded-2xl -my-5 p-4 lg:p-10 flex justify-center items-center">
                    <PickupLinesCard/>
                </div>
                <div className=" flex justify-between text-lg lg:text-xl text-whites font-fraunces  font-light z-10 ">
                    <button onClick={handleDownload} className='bg-buttonmain hover:bg-buttonhover hover:text-last hover:scale-105 duration-300  rounded-4xl lg:px-9 px-4 py-2 lg:py-2 '>Download</button>
                    <button className='bg-buttonmain hover:bg-buttonhover hover:text-last hover:scale-105 duration-300  rounded-4xl lg:px-9 px-4 py-2 lg:py-2 '>Stash it</button>
                    <button onClick={navigateToSnapAgain} className='bg-buttonmain hover:bg-buttonhover hover:text-last hover:scale-105 duration-300  rounded-4xl lg:px-9 px-4 py-2 lg:py-2 '>Snap Again!</button>
                </div> 
            </div>
        </div>
    </div>
  );
}
export default Results;
