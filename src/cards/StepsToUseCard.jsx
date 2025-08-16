import React from 'react'

function StepsToUseCard({number, title, description}) {
  return (
    <div className=' flex flex-col font-fraunces items-center text-last p-16 gap-4 text-start h-90 w-3/4 '>
        <div className="h-20 w-20 rounded-full bg-primary flex justify-center items-center text-center text-4xl font-bold hover:scale-104 duration-500" >{number}</div>
        <div className='font-bold'>{title}</div>
        <div className='font-light text-center text-wrap'>{description} </div>
    </div>
  )
}

export default StepsToUseCard