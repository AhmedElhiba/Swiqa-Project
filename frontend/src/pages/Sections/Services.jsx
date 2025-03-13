import React from 'react';
import payment from '../../images/payment1.png'
// import gift from '../../images/gift1.png'
import return1 from '../../images/return1.png'
import shipping from '../../images/shipping1.png'


export default function Services() {
    return <> <div>
        <div className="w-full px-5 lg:px-20 pt-0 pb-[80px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-10">
            <div data-aos="zoom-in" data-aos-delay="100" className="flex flex-col justify-center items-center gap-2">
                <img src={shipping} alt="Worldwide Shipping Icon" className="mb-5 w-[60px]" />
                <h1 className="text-xl text-black font-semibold">Morocco Shipping</h1>
                <p className="text-[17px] text-gray-500">Fast shipping  </p>
            </div>


            <div data-aos="zoom-in" data-aos-delay="200" className="flex flex-col justify-center items-center gap-2">
                <img src={payment} alt="Secure Payment Icon" className="mb-5 w-[60px]" />
                <h1 className="text-xl text-black font-semibold">Secure Payment</h1>
                <p className="text-[17px] text-gray-500">Secure And Fast Payment </p>
            </div>


            <div data-aos="zoom-in" data-aos-delay="300" className="flex flex-col justify-center items-center gap-2">
                <img src={return1} alt="Return/Refund Icon" className="mb-5 w-[60px]" />
                <h1 className="text-xl text-black font-semibold">Return/Refund</h1>
                <p className="text-[17px] text-gray-500">Fast And Free Return </p>
            </div>
        </div>
    </div>
    </>
}