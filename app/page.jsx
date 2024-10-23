"use client"
import About from '@/components/About'
import Blog from '@/components/Blog/Blog'
import Contact from '@/components/Contact'
import FixedMenu from '@/components/FixedMenu'
import Footer from '@/components/Footer/Footer'
import Hero from '@/components/Hero'
import Journey from '@/components/Journey'
import Services from '@/components/Services'
import Work from '@/components/Work/Work'
import { useEffect } from 'react';



const Home = () => {

  // implement locomotive scroll
  useEffect(()=>{
    const loadLocomotiveScroll = async () => {

      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      new LocomotiveScroll();
    }
    loadLocomotiveScroll();
  },[])
  return (
    <div>
      <Hero/>
      <FixedMenu/>
      <Services/>
      <About/>
      <Journey/>
      <Work/>
      <Blog/>
      <Contact/>
      <Footer/>
      {/* temporary div */}

     
      
    </div>
  )
}

export default Home