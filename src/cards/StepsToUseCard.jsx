import React from 'react'

function StepsToUseCard({number, title, description}) {
  return (
    <div className=' flex flex-col font-fraunces items-center w-1/3 text-last p-2 pt-5 pb-16 lg:pb-0 lg:pt-5 lg:p-16 gap-3 lg:gap-4 text-start lg:h-90 lg:w-3/4 '>
        <div className="h-10 w-10 lg:h-20 lg:w-20 rounded-full bg-primary flex justify-center items-center text-center text-xl lg:text-4xl font-bold hover:scale-104 duration-500" >{number}</div>
        <div className='font-bold text-center text-xs lg:text-lg'>{title}</div>
        <div className='font-light text-xs lg:text-lg text-center hidden lg:block lg:text-wrap'>{description} </div>
    </div>
  )
}

export default StepsToUseCard