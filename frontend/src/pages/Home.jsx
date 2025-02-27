import React from 'react';
import potatoimage from '../images/potato.png';
import btata from '../images/potato.png';
import maticha from '../images/maticha.jpeg';
export default function Home() {
  // Sample data for products (expanded)
  const topSellingProducts = [
    { id: 1, name: "Apple", price: "$1.99", image: btata},
    { id: 2, name: "Banana", price: "$0.99", image: btata },
    { id: 3, name: "Carrot", price: "$2.50", image: maticha },
    { id: 4, name: "Potato", price: "$1.29", image: btata },
    { id: 5, name: "Spinach", price: "$3.00", image: maticha },
    { id: 6, name: "Tomato", price: "$2.20", image: maticha },
    { id: 7, name: "Lettuce", price: "$1.50", image: btata },
    { id: 8, name: "Cucumber", price: "$1.10", image: maticha },
    { id: 9, name: "Orange", price: "$2.10", image: maticha },
    { id: 10, name: "Strawberry", price: "$3.50", image: btata },
    { id: 11, name: "Broccoli", price: "$2.80", image: btata },
    { id: 12, name: "Grapes", price: "$4.00", image: btata },
  ];

  return (
    <>
      {/* Main Content */}
      <div className="mt-24 p-8 max-w-screen-xl mx-auto flex gap-8">

        {/* Sidebar Filter */}
        <div className="w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Filter Products</h2>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Category</h3>
            <ul className="space-y-2">
              <li><input type="checkbox" /> Fruits</li>
              <li><input type="checkbox" /> Vegetables</li>
              <li><input type="checkbox" /> Organic</li>
            </ul>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Price Range</h3>
            <input type="range" min="0" max="50" className="w-full bg-gray-300 rounded-full h-2 mt-2" />
          </div>

          {/* Color */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Color</h3>
            <ul className="flex space-x-4">
              <li><div className="w-8 h-8 bg-red-500 rounded-full cursor-pointer"></div></li>
              <li><div className="w-8 h-8 bg-green-500 rounded-full cursor-pointer"></div></li>
              <li><div className="w-8 h-8 bg-yellow-500 rounded-full cursor-pointer"></div></li>
            </ul>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-3/4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Best Selling Products</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {topSellingProducts.map((product) => (
              <div key={product.id} className="bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
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
      <footer className="bg-gray-900 text-white py-12 mt- w-full">
        <div className="max-w-screen-xl mx-auto text-center px-6">
          <h3 className="text-3xl font-semibold mb-4">Swiqa - Fresh & Organic Produce</h3>
          <p className="text-sm mb-6">Join our community for the best in organic fruits and vegetables delivered to your door!</p>
          <div className="flex justify-center space-x-8 mb-6">
            <a href="/" className="hover:text-green-400">Home</a>
            <a href="/about" className="hover:text-green-400">About Us</a>
            <a href="/contact" className="hover:text-green-400">Contact</a>
            <a href="/privacy" className="hover:text-green-400">Privacy Policy</a>
          </div>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-white hover:text-green-400">Facebook</a>
            <a href="#" className="text-white hover:text-green-400">Instagram</a>
            <a href="#" className="text-white hover:text-green-400">Twitter</a>
          </div>
          <p className="text-xs">&copy; 2025 Swiqa. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}
