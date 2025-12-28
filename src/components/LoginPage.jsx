import React from 'react'
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
  const goToSignUp=()=>{
    navigate("/signup");
  }
  return (
    <div className='h-screen w-full bg-primary font-fraunces flex justify-center items-center px-7'>
        <div className='lg:h-4/7 lg:w-3/5 w-full h-1/2 bg-secondary rounded-4xl p-4 flex justify-center items-center '>
          <div className=' h-full w-full flex gap-4 justify-between '>
            <div className='w-1/3 p-4 bg-whites hidden lg:block rounded-l-3xl'>
            
            </div>
            <div className='lg:w-2/3 w-full p-4 pb-7 bg-whites  font-fraunces text-last rounded-3xl lg:rounded-r-3xl flex justify-between flex-col items-center'>
              <h1 className=' text-3xl'>Login</h1>
              <form action="login" className='flex flex-col gap-4 w-full'>
                <div>
                  <label className='ml-2 font-bold text-tertiary text-sm'>Email</label>
                  <input type="email" name="user-id" id="user-id" placeholder='Enter your email' className='border border-gray-300 p-2 bg-primary rounded-full w-full' />
                </div>
                <div>
                  <label className='ml-2 font-bold text-tertiary text-sm'>Password</label>
                  <input type="password" name="password" id="password" placeholder='Enter your password' className='border border-gray-300 p-2 bg-primary rounded-full w-full' />
                </div>
                <button type='submit' className='bg-buttonmain hover:bg-buttonhover border-1 border-zinc-600 hover:border-1 hover:text-last transition-colors duration-300 text-whites rounded-4xl px-9  py-2 font-fraunces text-xl font-light w-30 ml-auto'>Login</button>
              </form>
              <div className='w-full'>
                <label htmlFor="createAccount" className='ml-3 font-bold text-tertiary text-sm'>Don't have an Account?</label>
                <button onClick={goToSignUp} className='bg-buttonmain hover:bg-buttonhover border-1 border-zinc-600 hover:border-1 hover:text-last transition-colors duration-300 text-whites rounded-4xl px-9  py-2 font-fraunces text-xl w-full font-light'>Create a new Account</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default LoginPage