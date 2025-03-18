import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios'; // Missing axios import

export default function ProductsGrid() {
  const [products, setProducts] = useState([]); // Added missing products state
  const [categories, setCategories] = useState([]); // Added missing categories state
  const [loading, setLoading] = useState(true); // Added loading state
  const [cartItems, setCartItems] = useState([]);
  const [productLimit, setProductLimit] = useState(8); // Number of products to show

  // Load cart from localStorage and fetch products on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);

    // Fetch products from backend
    axios
      .get('http://127.0.0.1:8000/api/products')  
      .then((response) => {
        setProducts(response.data); // Set products fetched from the backend
        const uniqueCategories = ['All', ...new Set(response.data.map(product => product.category))];
        setCategories(uniqueCategories);  // Update categories after fetching products
        setLoading(false);  // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);  // Set loading to false even if there's an error
      });

    // Listen for cart updates from other components
    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(updatedCart);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  // Toggle product in cart
  const toggleProductInCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

    if (isProductInCart(product.id)) {
      // Remove this specific product from cart
      const updatedCart = currentCart.filter(item => item.id !== product.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    } else {
      // Add this specific product to cart
      const updatedCart = [...currentCart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }

    // Dispatch event to update cart count in the header
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="flex justify-center items-center py-10 bg-gray-100">
      <div className="w-full lg:w-3/4 lg:px-10 px-5 py-10">
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-themesage text-xl font-semibold">Browse Collection</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-themegreen"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
            {products.slice(0, productLimit).map((item, index) => {
              const inCart = isProductInCart(item.id);

              return (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center gap-2 bg-white p-3 rounded-lg cursor-pointer relative transform-gpu hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg"
                >
                  <img src={item.img} alt={item.name} className="w-full h-56 object-cover rounded-lg" />
                  <h1 className="text-md text-gray-400 font-semibold">{item.category}</h1>
                  <h1 className="text-lg text-black font-semibold">{item.name}</h1>
                  <h1 className="text-lg text-themegreen font-bold">{item.price}</h1>
                  <div className="w-full mt-2">
                    <hr />
                    <div className="flex justify-between items-center gap-4 mt-3">
                      <div className="flex justify-start items-center gap-1">
                        <FaStar className="text-themegreen" />
                        <FaStar className="text-themegreen" />
                        <FaStar className="text-themegreen" />
                        <FaStar className="text-themegreen" />
                        <FaStar className="text-themegreen" />
                      </div>
                      <button
                        onClick={() => toggleProductInCart(item)}
                        className={`${inCart ? 'bg-red-500' : 'bg-green-500'} text-white px-2 py-2 rounded-lg text-sm font-bold transform-gpu hover:scale-105 transition-transform duration-300 ease-in-out`}
                      >
                        {inCart ? 'Remove From Cart' : 'Add To Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold mb-2">No products available</h2>
            <p className="text-gray-500">Check back later for our latest products</p>
          </div>
        )}
        
        {/* Optional: Button to load more products */}
        {products.length > productLimit && (
          <div className="text-center mt-4">
            <button
              onClick={() => setProductLimit(productLimit + 8)} // Increase limit by 8 products
              className="bg-themegreen text-white px-6 py-2 rounded-lg font-bold"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}