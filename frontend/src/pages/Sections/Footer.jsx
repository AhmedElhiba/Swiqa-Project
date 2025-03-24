import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from '../../images/LOGOSWIQA.png'; // Replace with actual logo path
import { FaFacebook, FaInstagram, FaTwitter, FaArrowUp } from "react-icons/fa";
import axios from 'axios';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sections = [
    {
      title: "Support",
      items: ["Pricing", "Documentation", "Guides", ],
    },
    {
      title: "Company",
      items: ["About", "Blog", "Jobs",],
    },
    {
      title: "Legal",
      items: ["Privacy", "Terms", "Policies",],
    },
  ];

  const items = [
    { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
    { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
    { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
  ];

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: 'ease-in-out',
    });
    AOS.refresh();

    // Scroll to top button visibility
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/subscribe', { email });
      setMessage(response.data.message);
      setEmail('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Subscription failed. Please try again.');
    }
  };

  return (
    <div id="footer">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-yellow-500 text-green-700 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-400 focus:outline-none transition-all duration-300 z-50"
          aria-label="Scroll to top"
          data-aos="fade-up"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}

      {/* Footer Section (No Extra Space Now) */}
      <div className="w-full bg-[#5D8736] text-yellow-500 py-10 px-2">
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-white py-8">
          {/* Left Side Logo in Footer */}
          <div className="flex justify-start md:col-span-1 mb-5 md:mb-0">
            <a href="/">
              <img src={logo} alt="Footer Logo" className="w-[160px] opacity-100 cursor-pointer hover:opacity-90" />
            </a>
          </div>
          {sections.map((section, index) => (
            <div key={index}>
              <h6 className="font-bold uppercase pt-2 text-yellow-500">{section.title}</h6>
              <ul>
                {section.items.map((item, i) => (
                  <li key={i} className="py-1 text-gray-800 hover:text-white">{item}</li>
                ))}
              </ul>
            </div>
          ))}
          {/* Newsletter Subscription */}
          <div className="col-span-2 pt-8 md:pt-2">
            <p className="font-bold uppercase text-yellow-500">Subscribe to our newsletter</p>
            <p className="py-4 text-gray-800">The latest news, articles, and resources, sent to your inbox weekly.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row">
              <input
                className="w-full p-2 mr-4 text-black  rounded-md mb-4"
                type="email"
                placeholder="Enter email.."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="p-2 mb-4 bg-yellow-500 rounded-sm text-gray-800">Subscribe</button>
            </form>
            {message && <p className="text-white">{message}</p>}
          </div>
        </div>
        <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-yellow-500">
          <p className="py-4 text-yellow-500">2025 SWIQA, All rights reserved</p>
          <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
            {items.map((x, index) => (
              <a key={index} href={x.link} target="_blank" rel="noopener noreferrer">
                <x.icon className="hover:text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}