import React, { useEffect } from 'react';
import bn1 from '../../images/bn3-3.jpg'
import bn3 from '../../images/utest.jpg'
import bn2 from '../../images/uban.png'

import AOS from 'aos'
import 'aos/dist/aos.css';

export default function Types() {
    useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 500,
            easing: 'ease-in-out',
        });
        AOS.refresh();
    }, [])

    return <><div className='w-full lg:px-20 px-5 py-[80px] grid lg:grid-cols-3 grid-cols-1 justify-center items-start gap-10'>
        <div  className='flex flex-col justify-center items-end gap-6 bg-cover bg-center p-10 rounded-lg cursor-pointer relative transform-gpu hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg' style={{ backgroundImage: `url(${bn3})` }}>
            <h1 className='text-themegreen border rounded-lg border-themegreen px-6 py-2 text-lg '>20% off</h1>
            <h1 className='text-3xl text-end text-themegreen font-bold'>Fresh 
                Fruits <br />Box</h1>
            <button className='bg-themegreen px-6 py-1 rounded-lg text-[#f8ffa8] text-bold '> SHOP NOW </button>
        </div>
        <div  className='flex flex-col justify-center items-end gap-6 bg-cover bg-center p-10 rounded-lg cursor-pointer relative transform-gpu hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg' style={{ backgroundImage: `url(${bn2})` }}>
            <h1 className='text-themegreen border rounded-lg border-themegreen px-6 py-2 text-lg '>60% off</h1>
            <h1 className='text-3xl text-end text-themegreen font-bold'>Fresh 
            Veg <br />Box</h1>
            <button className='bg-themegreen px-6 py-1 rounded-lg text-[#f8ffa8] text-bold '> SHOP NOW </button>
        </div>
        <div  className='flex flex-col justify-center items-end gap-6 bg-cover bg-center p-10 rounded-lg cursor-pointer relative transform-gpu hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg' style={{ backgroundImage: `url(${bn1})` }}>
            <h1 className='text-themegreen border rounded-lg border-themegreen px-6 py-2 text-lg '>49% off</h1>
            <h1 className='text-3xl text-end text-themegreen font-bold'>Fresh 
            Bio <br />Products</h1> 
            <button className='bg-themegreen px-6 py-1 rounded-lg text-[#f8ffa8] text-bold '> SHOP NOW </button>
        </div>
    </div>
    </>
}