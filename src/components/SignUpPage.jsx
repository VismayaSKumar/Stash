import React from 'react'

function SignUpPage() {
  return (
    <div className='h-screen w-full bg-primary font-fraunces flex justify-center items-center px-7'>
        <div className='h-1/2 lg:h-4/7 w-full lg:w-3/5 bg-secondary rounded-4xl p-4 flex justify-center items-center '>
          <div className=' h-full w-full flex gap-4 justify-between '>
            
            <div className='w-full lg:w-2/3 p-4 pb-7 bg-whites  font-fraunces text-last rounded-3xl lg:rounded-l-3xl flex justify-between flex-col items-center'>
              <h1 className=' text-3xl'>Create an Account</h1>
              <form action="signup" className='flex flex-col gap-4 w-full'>
                <div>
                  <label htmlFor="username" className='ml-2 font-bold text-tertiary text-sm'>User Name</label>
                  <input type="text" name="username" id=""   placeholder='Enter your name' className='border border-gray-300 p-2 bg-primary rounded-full w-full' />
                </div>
                <div>
                  <label className='ml-2 font-bold text-tertiary text-sm'>Email</label>
                  <input type="email" name="user-id" id="user-id" placeholder='Enter your email' className='border border-gray-300 p-2 bg-primary rounded-full w-full' />
                </div>
                <div>
                  <label className='ml-2 font-bold text-tertiary text-sm'>Password</label>
                  <input type="password" name="password" id="password" placeholder='Enter your password' className='border border-gray-300 p-2 bg-primary rounded-full w-full' />
                </div>
                <button type='submit' className='bg-buttonmain hover:bg-buttonhover border-1 border-zinc-600 hover:border-1 hover:text-last transition-colors duration-300 text-whites rounded-4xl px-9  py-2 font-fraunces text-xl font-light w-60 ml-auto'>Create Account</button>
              </form>
            </div>
            <div className='w-1/3 p-4 bg-whites hidden lg:block rounded-r-3xl'>
            
            </div>
          </div>
        </div>
    </div>
  )
}

export default SignUpPage