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
        <div id='hero' className='w-full flex justify-center items-center lg:h-[800px] h-[700px]'>
            <div
                className='w-full lg:px-24 px-6 lg:h-[800px] h-[700px] flex flex-col justify-center items-start gap-8 bg-cover bg-center'
                style={{ backgroundImage: `url(${dslr9})` }}
            >
                <h1 data-aos='zoom-in' className='text-themegreen border rounded-lg border-themegreen px-8 py-3 text-xl lg:text-2xl font-semibold'>
                    Get Up To 90% Off!
                </h1>
                <h1
                    data-aos='zoom-in'
                    className='text-themegreen uppercase font-bold lg:text-6xl text-4xl lg:leading-[80px] leading-[50px]'
                >
                    Fresh, Organic & Local  <br /> Delivered to Your Door !
                </h1>
                <p data-aos='fade-up' className='text-themegreen text-lg lg:text-2xl leading-relaxed font-medium'>
                    100% Organic & Locally Sourced <br />
                    Support Small Farmers & Sustainable Living <br />
                    Fast & Reliable Delivery
                </p>
                <div className='flex gap-6 mt-6'>
                    <button className='bg-themegreen px-6 py-3 rounded-xl text-white text-lg lg:text-xl font-bold transform hover:scale-105 transition-all duration-300 ease-in-out'>
                        <a  href="/products" target='-blanc'>                         Shop Now
                        </a>                    </button>
                    <button className='bg-[#809D3C] px-6 py-3 rounded-xl text-white text-lg lg:text-xl font-bold transform hover:scale-105 transition-all duration-300 ease-in-out'>
                       <a href="/sell"> Start Selling</a>
                    </button>
                </div>
            </div>
        </div>
    );
}
