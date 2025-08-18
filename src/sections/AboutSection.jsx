import React from 'react'
import AboutCard from '../cards/AboutCard'
function AboutSection() {
  return (
    <div id='about' className='min-h-screen w-full flex flex-col py-20 px-30'>
        <div className='flex justify-start'>
            <h1 className='text-8xl font-fraunces text-tertiary'>Why Stash?</h1>
        </div>
        <div className='flex flex-wrap gap-10 mt-10 justify-center items-center '>
            
                <AboutCard 
                  heading="Snap Solo or With a Friend"
                  intro="It's better when shared."
                  content="Invite your bestie and capture memories together — even if you're miles apart. Sync, snap and frame."/>
                <AboutCard
                  heading="So Many Frames. So Many Stickers."
                  intro="Give your clicks some drip."
                  content="Pick from a growing stash of aesthetic frames, stickers, filters & more. Whether it’s Y2K chaos or retro chic — you do you." />
                <AboutCard
                  heading="Snap Save It, Stash It, Keep It Forever"
                  intro="Memories don’t belong in your camera roll."
                  content="Download your pics or save them in your personal Stash Vault for the vibes to last forever." />
        </div>
    </div>
  )
}

export default AboutSection