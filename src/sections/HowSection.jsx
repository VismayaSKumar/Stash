import React from 'react'
import StepsToUseCard from '../cards/StepsToUseCard'

function HowSection() {
  return (
    <div className='max-h-screen w-full bg-secondary pt-10 lg:pt-20 px-10 lg:px-30'>
        <h1  className='text-4xl  lg:text-8xl font-fraunces text-tertiary'>How Stash works?</h1>
        <div className="flex justify-center items-center">
            <StepsToUseCard number="1" title="Choose Layout. Snap a Shot" description="Go solo or invite a friend. Turn on your camera or upload a pic from your gallery. Strike a pose — you get a fun countdown before the snap!" />
            <StepsToUseCard number="2" title="Select Frames and Stickers" description="Add your favorite frame, slap on stickers, and customize your photo." />
            <StepsToUseCard number="3" title="Download and Save them all." description="Download it. Or save it to your personal vault in Stash. One click and your memories are locked in." />
        </div>
    </div>
  )
}

export default HowSection