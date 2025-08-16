import React from 'react'
import emailjs from '@emailjs/browser'
import { useState } from 'react';

function ContactSection() {
    const [buttonText, setButtonText] = useState('send');
    const sendEmail = (e) => {
    e.preventDefault();
  
    const email = e.target.from_email.value.trim();
    const message = e.target.message.value.trim();
    
    const serviceID = 'service_ehp9quk';
    const templateID = 'template_mbj15e6';
    const userID = 'SHo9fYU2cgWBPLiWf';
  
    emailjs.sendForm(serviceID, templateID, e.target, userID)
      .then((result) => {
        console.log('email sent', result.text);
        setButtonText('sent!');
        setTimeout(() => {
          setButtonText('send');
        }, 3000);
      }, (error) => {
        console.log('error sending email', error.text);
        setButtonText('error!');
  
        setTimeout(() => {
          setButtonText('send again');
        }, 3000);
      });
  
    e.target.reset();
  }
  return (
    <div className='w-full max-h-screen font-fraunces bg-primary flex justify-center items-center p-20 px-30'>
        <div className='w-2/3 h-1/2 bg-secondary p-4 rounded-3xl shadow-lg'>
            <div className='p-4 bg-whites rounded-3xl flex flex-col gap-4 justify-center items-center '>
                <h1 className='text-5xl font-light'>Get In touch</h1>
                <form onSubmit={sendEmail} className='flex flex-col w-full px-6'>
                    <label htmlFor="email" className='font-bold text-sm p-2 text-tertiary'>Email</label>
                    <input type="email" placeholder='Enter your Email' name="from_email" id="from_email" className='bg-primary rounded-full w-full p-3' required />
                    <label htmlFor="message"className='font-bold text-sm p-2 text-tertiary'>Message</label>
                    <textarea name="message" id="message" cols="30" rows="3" placeholder='Type your message...' className='bg-primary  rounded-3xl w-full p-3' required></textarea>
                    <div className='flex justify-end items-center mt-4'>
                        <button type="submit" className='bg-buttonmain hover:bg-buttonhover border-1 border-zinc-600 hover:border-1 hover:text-last transition-colors duration-300 text-whites rounded-4xl px-9  py-2 font-fraunces text-xl text-center font-light '>{buttonText}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ContactSection