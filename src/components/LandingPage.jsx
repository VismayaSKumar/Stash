import React from 'react'
import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import HowSection from '../sections/HowSection'
import ContactSection from '../sections/ContactSection'
import Footer from './Footer'
import Header from './Header'

function LandingPage() {
  return (
    <div className='min-h-screen bg-primary'>
      <HeroSection />
      <AboutSection/>  
      <HowSection/>
      <ContactSection/>
      <Footer/>
    </div>
  )
}

export default LandingPage