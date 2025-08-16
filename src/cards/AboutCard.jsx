import React from 'react'

function AboutCard({heading,intro,content}) {
  return (
    <div className='relative hover:scale-102 duration-500 bg-tertiary text-whites px-25 pt-16 pb-7 rounded-b-3xl rounded-r-3xl rounded-tl-sm w-xl h-74 gap-10 flex flex-col '>
        <h1 className='font-fraunces font-bold text-xl'>{heading}</h1>
        <div className='text-left'>
          <p className='font-fraunces font-thin text-xl'>{intro}</p>
          <p className='font-fraunces font-thin text-xl'>{content}</p>
        </div>
        <div className='bg-primary absolute -top-7 left-8 h-15 w-15 rounded-full'></div>
    </div>
  )
}

export default AboutCard