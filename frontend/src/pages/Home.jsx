import React, { useState,useEffect } from 'react';
import Header from '../pages/Sections/Header.jsx'
import Footer from '../pages/Sections/Footer.jsx'
import Hero from '../pages/Sections/Hero.jsx'
import Categories from '../pages/Sections/Categories.jsx'
import Types from '../pages/Sections/Types.jsx'
import Services from '../pages/Sections/Services.jsx'
import Productsgrid from '../pages/Sections/Productsgrid.jsx'
// import Banner from '../pages/Sections/Banner.jsx'
// import Reviews from '../pages/Sections/Reviews.jsx'
// import Insta from '../pages/Sections/Insta.jsx'



export default function Home() {

  return <>
        {/* <Header/> */}
        <Hero/>
        <Categories/>
        <Productsgrid/>
        <Types/>
        <Services/>
        {/* <Footer/> */}

</> 
}
  