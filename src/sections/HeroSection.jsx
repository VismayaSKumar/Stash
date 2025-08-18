import React from 'react'
import logo from '../assets/images/logoLandingPage.svg'
import cam from '../assets/images/camera-front.svg'
import arrow from '../assets/images/arrow.svg'
import { useNavigate } from 'react-router-dom'
function HeroSection() {
    const navigate = useNavigate();

    const navigateToWebCam = () => {
    navigate("/webcam");
  }
    const handleInviteFriend =()=>{
      const roomId = Math.random().toString(36).substring(2, 10);
      navigate(`/room/${roomId}`);
    }
    const scrollToAbout = () => {
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className='max-h-screen w-full bg-secondary flex flex-col items-center relative'>
        <div className='flex flex-col justify-center items-center -mt-6'>
            <img src={logo} alt="logo" className='w-4/5 hover:scale-105 z-0 duration-500' />
            <img src={cam} alt="camera svg"  className='w-3/5 -mt-17 z-10 hover:scale-105 duration-500'/>
        </div>
        <div className='flex flex-col justify-center items-center mt-1 gap-4 text-center'>
            <h1 className='font-mclaren text-last text-5xl'>Flash it. Frame it. Stash it.</h1>
            <p className='font-fraunces font-light text-whites text-2xl w-xl'>A fun photobooth that lets you snap, customize, and keep your favorite memories.</p>
        </div>
        <div className='flex flex-row justify-around items-center mt-4 mb-7 gap-15'>
            <button onClick={navigateToWebCam}
             className='bg-buttonmain hover:bg-buttonhover hover:text-last hover:scale-105 duration-300 text-whites rounded-4xl px-9  py-2 font-fraunces text-xl font-light'>Go Solo</button>
             
            <button onClick={handleInviteFriend} 
            className='bg-buttonmain hover:bg-buttonhover hover:text-last hover:scale-105 duration-300 text-whites rounded-4xl px-9  py-2 font-fraunces text-xl font-light z-10'>Invite a Friend</button>
            {/* <button className='bg-buttonmain hover:bg-buttonhover hover:text-last hover:scale-105 duration-300 text-whites rounded-4xl px-9  py-2 font-fraunces text-xl font-light'>Upload Photo</button> */}

        </div>
        <button
        onClick={scrollToAbout}
         className='bg-secondary rounded-full p-4 absolute -bottom-10  '>
            <img src={arrow} alt="" className='w-9 hover:opacity-40 duration-200' />
        </button>
        
    </div>
  )
}

export default HeroSection