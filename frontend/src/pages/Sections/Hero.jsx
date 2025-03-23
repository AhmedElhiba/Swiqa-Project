import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import dslr9 from '../../images/hhh.png';

export default function Hero() {
    useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 500,
            easing: 'ease-in-out',
        });
        AOS.refresh();
    }, []);

    return (
        <div id='hero' className='w-full flex justify-center items-center min-h-screen'>
            <div
                className='w-full px-4 sm:px-8 lg:px-24 min-h-screen flex flex-col justify-center items-start gap-6 bg-cover bg-center'
                style={{ backgroundImage: `url(${dslr9})` }}
            >
                <h1 
                    data-aos='zoom-in' 
                    className='text-themegreen border rounded-lg border-themegreen px-6 py-2 sm:px-8 sm:py-3 text-lg sm:text-xl lg:text-2xl font-semibold'
                >
                    Get Up To 90% Off!
                </h1>
                <h1
                    data-aos='zoom-in'
                    className='text-themegreen uppercase font-bold text-3xl sm:text-4xl lg:text-6xl sm:leading-[50px] lg:leading-[80px]'
                >
                    Fresh, Organic & Local <br /> Delivered to Your Door!
                </h1>
                <p 
                    data-aos='fade-up' 
                    className='text-themegreen text-base sm:text-lg lg:text-2xl leading-relaxed font-medium'
                >
                    100% Organic & Locally Sourced <br />
                    Support Small Farmers & Sustainable Living <br />
                    Fast & Reliable Delivery
                </p>
                <div className='flex gap-4 sm:gap-6 mt-6'>
                    <button className='bg-themegreen px-5 sm:px-6 py-2 sm:py-3 rounded-xl text-white text-base sm:text-lg lg:text-xl font-bold transform hover:scale-105 transition-all duration-300 ease-in-out'>
                        <a href="/products" target='_blank'>Shop Now</a>
                    </button>
                    <button className='bg-[#809D3C] px-5 sm:px-6 py-2 sm:py-3 rounded-xl text-white text-base sm:text-lg lg:text-xl font-bold transform hover:scale-105 transition-all duration-300 ease-in-out'>
                        <a href="/sell">Start Selling</a>
                    </button>
                </div>
            </div>
        </div>
    );
}
