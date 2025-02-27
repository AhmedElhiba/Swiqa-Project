import React, { useState } from 'react';
import potatoimage from '../images/potato.png';
import btata from '../images/potato.png';
import maticha from '../images/maticha.jpeg';
import tfaha from '../images/tfaha.png'

export default function Home() {
  // Sample data for products
  const allProducts = [
    { id: 1, name: "Apple", price: "$1.99", image: tfaha, rating: 4.5 },
    { id: 2, name: "Banana", price: "$0.99", image: btata, rating: 4.0 },
    { id: 3, name: "Carrot", price: "$2.50", image: maticha, rating: 3.8 },
    { id: 4, name: "Potato", price: "$1.29", image: btata, rating: 4.2 },
    { id: 5, name: "Spinach", price: "$3.00", image: maticha, rating: 4.7 },
    { id: 6, name: "Tomato", price: "$2.20", image: maticha, rating: 4.1 },
    { id: 7, name: "Lettuce", price: "$1.50", image: btata, rating: 3.9 },
    { id: 8, name: "Cucumber", price: "$1.10", image: maticha, rating: 4.3 },
    { id: 9, name: "Orange", price: "$2.10", image: maticha, rating: 4.6 },
    { id: 10, name: "Strawberry", price: "$3.50", image: btata, rating: 4.8 },
    { id: 11, name: "Broccoli", price: "$2.80", image: btata, rating: 4.4 },
    { id: 12, name: "Ahmed elhiba", price: "$4.00", image: btata, rating: 4.9 },
  ];

  // State for top-selling products
  const [topSellingIndex, setTopSellingIndex] = useState(0);
  const topSellingProducts = allProducts.slice(topSellingIndex, topSellingIndex + 4);

  // Function to handle navigation for top-selling products
  const handleNext = () => {
    setTopSellingIndex((prevIndex) => (prevIndex + 4) % allProducts.length);
  };

  const handlePrev = () => {
    setTopSellingIndex((prevIndex) => (prevIndex - 4 + allProducts.length) % allProducts.length);
  };

  // Randomize products for the rest of the grid
  const randomProducts = [...allProducts].sort(() => Math.random() - 0.5);

  return (
    <>
      {/* Main Content */}
      <div className="mt-24 p-8 max-w-screen-xl mx-auto flex gap-8">
        {/* Filter Sidebar on the Left */}
        <div className="w-1/4 bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-lg shadow-lg border border-green-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Filter Products</h2>
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Category</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-green-500 rounded" />
                  <span className="ml-2 text-gray-700">Fruits</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-green-500 rounded" />
                  <span className="ml-2 text-gray-700">Vegetables</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-green-500 rounded" />
                  <span className="ml-2 text-gray-700">Organic</span>
                </li>
              </ul>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Price Range</h3>
              <input type="range" min="0" max="50" className="w-full bg-green-200 rounded-full h-2 mt-2" />
              <p className="text-sm text-gray-600 mt-2">$0 - $50</p>
            </div>

            {/* Ratings */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Rating</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-green-500 rounded" />
                  <span className="ml-2 text-gray-700">4 Stars & Up</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-green-500 rounded" />
                  <span className="ml-2 text-gray-700">3 Stars & Up</span>
                </li>
              </ul>
            </div>

            {/* Sort By */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Sort By</h3>
              <select className="w-full p-2 border border-green-300 rounded-lg">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="w-3/4">
          {/* Top Selling Products */}
          <div className="text-center mb-8 relative">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Best Selling Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {topSellingProducts.map((product) => (
                <div key={product.id} className="bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                  <img src={product.image} alt={product.name} className="w-full h-80 object-cover mb-4" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.price}</p>
                    <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Navigation Buttons */}
            <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600">
              &larr;
            </button>
            <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600">
              &rarr;
            </button>
          </div>

          {/* Random Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {randomProducts.map((product) => (
              <div key={product.id} className="bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <img src={product.image} alt={product.name} className="w-full h-80 object-cover mb-4" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.price}</p>
                  <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 w-full px-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <div className="flex justify-center space-x-8 mb-4">
            <a href="/" className="hover:text-green-400">Home</a>
            <a href="/about" className="hover:text-green-400">About Us</a>
            <a href="/contact" className="hover:text-green-400">Contact</a>
            <a href="/privacy" className="hover:text-green-400">Privacy Policy</a>
          </div>
          <p className="text-xs">&copy; 2025 Swiqa. All Rights Reserved.</p>
        </div>
      </footer>
    </>

  );
}