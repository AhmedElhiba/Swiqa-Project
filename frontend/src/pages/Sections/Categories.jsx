import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import cat1 from '../../images/cot1.jpg'
import bio from '../../images/biobio.avif'
import frfr from '../../images/frfr.png'


export default function Categories() {
    useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 500,
            easing: 'ease-in-out',
        });
        AOS.refresh();
    }, [])

    return <> 
        <div id='categories' className='w-full bg-white lg-px-20 px-5 pt-[60px] pb-[80px] flex flex-col justify-center items-center'>
            {/* Section title at the top */}
            <div data-aos="fade-down" data-aos-delay="50" className='w-full text-center mb-12'><br />
                <h3 className='text-themesage text-xl font-semibold'>
                    Favorites
                </h3>
                <h1 className="text-black font-bold text-[42px] leading-[50px] mt-2">
                    Popular Category
                </h1>
                <div className="w-24 h-1 bg-themegreen mx-auto mt-4"></div>
            </div>
            
            {/* Cards container */}
            <div className='w-full max-w-5xl mx-auto '>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 px-4 '>
                    <div 
                        // data-aos="zoom-in" 
                        // data-aos-delay="100" 
                        className='rounded-l-lg overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 '
                        style={{backgroundColor: "#5D8736"}}
                    >
                        <div className='p-14 flex flex-col items-center '>
                            <div className='w-36 h-36 rounded-full bg-white p-2 mx-auto mb-5 shadow overflow-hidden'>
                                <img src={cat1} className='w-full h-full rounded-full object-cover' alt="Vegitable" />
                            </div>
                            <h2 className='text-white text-xl font-bold text-center mb-4'>
                                Vegitable
                            </h2>
                            <button className='border border-white text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-white hover:bg-opacity-20 transition-colors'>
                            <a href="/products">EXPLORE MORE</a> 
                            </button>
                        </div>
                    </div>
                    
                    {/* Fruits Card */}
                    <div 
                        // data-aos="zoom-in" 
                        // data-aos-delay="150" 
                        className='rounded   overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105'
                        style={{backgroundColor: "#A89C29"}}
                    >
                        <div className='p-14 flex flex-col items-center'>
                            <div className='w-36 h-36 rounded-full bg-white p-2 mx-auto mb-5 shadow overflow-hidden'>
                                <img src={frfr} className='w-full h-full rounded-full object-cover' alt="Fruits" />
                            </div>
                            <h2 className='text-white text-xl font-bold text-center mb-4'>
                               Fruits
                            </h2>
                            <button className='border border-white text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-white hover:bg-opacity-20 transition-colors'>
                            <a href="/products">EXPLORE MORE</a> 
                            </button>
                        </div>
                    </div>
                    
                    {/* Bio Card */}
                    <div 
                        // data-aos="zoom-in" 
                        // data-aos-delay="200" 
                        className='rounded-r-lg  overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105'
                        style={{backgroundColor: "#809D3C"}}
                    >
                        <div className='p-14 flex flex-col items-center'>
                            <div className='w-36 h-36 rounded-full bg-white p-2 mx-auto mb-5 shadow overflow-hidden'>
                                <img src={bio} className='w-full h-full rounded-full object-cover' alt="Bio" />
                            </div>
                            <h2 className='text-white text-xl font-bold text-center mb-4'>
                                Bio
                            </h2>
                            <button className='border border-white text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-white hover:bg-opacity-20 transition-colors'>
                            <a href="/products">EXPLORE MORE</a> 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}