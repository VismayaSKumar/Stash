import React from 'react'

function AboutCard({heading,intro,content}) {
  return (
    <div className='relative hover:scale-102 duration-500 bg-tertiary text-whites px-4 lg:px-25 pt-12 lg:pt-16 pb-7 rounded-b-3xl rounded-r-3xl rounded-tl-sm lg:w-xl h-46 lg:h-74 lg:gap-10 flex flex-col '>
        <h1 className='font-fraunces font-bold lg:text-xl'>{heading}</h1>
        <div className='text-left flex flex-col gap-1'>
          <p className='font-fraunces font-light lg:font-thin text-sm lg:text-xl'>{intro}</p>
          <p className='font-fraunces font-thin text-xs lg:text-xl'>{content}</p>
        </div>
        <div className='bg-primary absolute -top-7 left-8 h-15 w-15 rounded-full'></div>
    </div>
  )
}

export default AboutCard