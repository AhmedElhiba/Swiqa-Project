import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaStar, FaRegHeart, FaSearch,FaFilter } from 'react-icons/fa';
import { MdOutlineRemoveRedEye, MdAddShoppingCart } from 'react-icons/md';
import { products } from '../../fakeproducts.js';

export default function Products() {
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);

    // Initialize categories
    const uniqueCategories = ['All', ...new Set(products.map(product => product.category))];
    setCategories(uniqueCategories);

    AOS.init({
      offset: 100,
      duration: 500,
      easing: 'ease-in-out',
    });
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === product.id);
    let updatedCart;

    if (productIndex !== -1) {
      // Remove from cart
      updatedCart = cart.filter(item => item.id !== product.id);
    } else {
      // Add to cart
      updatedCart = [...cart, product];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Filter products based on both category and search term
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100">
      {/* Filter Sidebar */}
      <div className="w-full lg:w-1/4 p-5 lg:min-h-screen bg-white shadow-md">
        <div className="sticky top-5">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-themegreen"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <FaFilter className="text-themegreen" />
            <h2 className="text-xl font-bold">Filters</h2>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <div className="flex flex-col gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`text-left p-2 rounded-md transition-all ${selectedCategory === category
                    ? 'bg-themegreen text-white'
                    : 'hover:bg-gray-100'
                    }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="w-full lg:w-3/4 lg:px-10 px-5 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 data-aos="zoom-in" data-aos-delay="100" className="text-themesage text-xl font-semibold">
            Browse Collection {selectedCategory !== 'All' && `- ${selectedCategory}`}
          </h1>
          <p className="text-gray-500">
            {filteredProducts.length} products found
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div data-aos="zoom-in" data-aos-delay="300" className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
            {filteredProducts.map((item) => {
              const isInCart = cartItems.some(product => product.id === item.id);

              return (
                <div
                  id="product-box"
                  key={item.id}
                  className="flex flex-col justify-center items-center gap-2 bg-white p-3 rounded-lg cursor-pointer relative transform-gpu hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg"
                >
                  <img src={item.img} alt={item.name} className="w-full h-56 object-cover rounded-lg" />
                  <div id="icons" className="flex justify-center items-center gap-3 absolute top-[10px] left-0 right-0 mx-auto">
                    <div className="bg-themegreen hover:bg-themesage hover:text-black rounded-full p-2 text-white">
                      <MdOutlineRemoveRedEye />
                    </div>
                    <div className="bg-themegreen hover:bg-themesage hover:text-black rounded-full p-2 text-white">
                      <FaRegHeart />
                    </div>
                    <div
                      className="bg-themegreen hover:bg-themesage hover:text-black rounded-full p-2 text-white"
                      onClick={() => addToCart(item)}
                    >
                      <MdAddShoppingCart />
                    </div>
                  </div>
                  <h1 className="text-md text-gray-400 font-semibold">{item.category}</h1>
                  <h1 className="text-lg text-black font-semibold">{item.name}</h1>
                  <h1 className="text-lg text-themegreen font-bold">{item.price}</h1>
                  <div className="w-full mt-2">
                    <hr />
                    <div className="flex justify-between items-center gap-4 mt-3">
                      <div className="flex justify-start items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-themegreen" />
                        ))}
                      </div>
                      <button
                        onClick={() => addToCart(item)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transform-gpu hover:scale-105 transition-transform duration-300 ease-in-out ${
                          isInCart ? 'bg-red-500' : 'bg-green-500'
                        } text-white`}
                      >
                        {isInCart ? 'Remove From Cart' : 'Add To Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold mb-2">No products found</h2>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <button
              className="bg-themegreen text-white px-6 py-3 rounded-lg font-bold"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
