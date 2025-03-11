import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaStar, FaRegHeart } from 'react-icons/fa';
import { MdOutlineRemoveRedEye, MdAddShoppingCart } from 'react-icons/md';
import { products } from '../../../export.js';
import { Link } from 'react-router-dom'; 

export default function Productsgrid() {

    const addToCart = (product) => {
        // Get current cart
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Add product to cart
        cart.push(product);
        
        // Save back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Notify the Layout component
        window.dispatchEvent(new Event('cartUpdated'));
      };

    useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 500,
            easing: 'ease-in-out',
        });
    }, []);

    return (
        <>
            <div id='productsgrid' className='w-full lg:px-20 px-5 py-20 bg-gray-100 flex flex-col justify-center items-center gap-4'>
                <h1 data-aos="zoom-in" data-aos-delay="100" className="text-themesage text-xl font-semibold">
                    Browse Collection
                </h1>
                <h1 data-aos="zoom-in" data-aos-delay="200" className="text-black font-bold text-4xl text-center leading-[50px] mt-2">
                    Trending Products
                </h1>
                <div data-aos="zoom-in" data-aos-delay="300" className='w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-center items-center gap-8 mt-10'>
                    {products.map((item, index) => (
                        <div 
                            id='product-box' 
                            key={index} 
                            className='flex flex-col justify-center items-center gap-2 bg-white p-3 rounded-lg cursor-pointer relative transform-gpu hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg'
                        >
                            <img src={item.img} alt={item.name} className="w-full h-56 object-cover rounded-lg" />
                            <div id='icons' className='flex justify-center items-center gap-3 absolute top-[10px] left-0 right-0 mx-auto'>
                                <div className='bg-themegreen hover:bg-themesage hover:text-black rounded-full p-2 text-white'>
                                    <MdOutlineRemoveRedEye/>
                                </div>
                                <div className='bg-themegreen hover:bg-themesage hover:text-black rounded-full p-2 text-white'>
                                    <FaRegHeart/>
                                </div>
                                <div className='bg-themegreen hover:bg-themesage hover:text-black rounded-full p-2 text-white'>
                                    <MdAddShoppingCart/>
                                </div>
                            </div>
                            <h1 className='text-md text-gray-400 font-semibold'>{item.category}</h1>
                            <h1 className='text-lg text-black font-semibold'>{item.name}</h1>
                            <h1 className='text-lg text-themegreen font-bold'>{item.price}</h1>
                            <div className='w-full mt-2'>
                                <hr />
                                <div className='flex justify-between items-center gap-4 mt-3'>
                                    <div className='flex justify-start items-center gap-1'>
                                        <FaStar className='text-themegreen' />
                                        <FaStar className='text-themegreen' />
                                        <FaStar className='text-themegreen' />
                                        <FaStar className='text-themegreen' />
                                        <FaStar className='text-themegreen' />
                                    </div>
                                    <button onClick={addToCart} className='bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold transform-gpu hover:scale-105 transition-transform duration-300 ease-in-out'>
                                       Add To Cart 
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button data-aos="zoom-in" data-aos-delay="400" className="bg-green-500 text-white  font-semibold px-8 py-3 rounded-lg mt-8">
<a href="/products">VIEW MORE</a>                </button>
            </div>
        </>
    );
}