import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaRegHeart, FaFilter, FaSearch, FaTags, FaSort } from 'react-icons/fa';
import { MdAddShoppingCart, MdRemoveShoppingCart, MdCategory } from 'react-icons/md';
import { HiAdjustments } from 'react-icons/hi';
import { RiPriceTag3Line } from 'react-icons/ri';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  const [activeFilters, setActiveFilters] = useState(0);

  // Fetch products from Laravel backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        setProducts(response.data);

        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(response.data.map(product => product.category))];
        setCategories(uniqueCategories);

        // Find the maximum price from all products
        const highestPrice = Math.max(...response.data.map(product => 
          parseFloat(product.price.replace(/[^0-9.]/g, ''))
        ));
        setMaxPrice(Math.ceil(highestPrice));
        setPriceRange([0, Math.ceil(highestPrice)]);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);

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

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (selectedCategory !== 'All') count++;
    if (searchTerm) count++;
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) count++;
    if (sortOption !== 'default') count++;
    setActiveFilters(count);
  }, [selectedCategory, searchTerm, priceRange, sortOption, maxPrice]);

  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  // Toggle product in cart
  const toggleProductInCart = (e, product) => {
    e.preventDefault(); // Prevent navigating to product detail
    e.stopPropagation(); // Stop event bubbling

    // Get the latest cart data
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

  const getNumericPrice = (price) => {
    return parseFloat(price.replace(/[^0-9.]/g, ''));
  };

  // Filter and sort products
  const processedProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const productPrice = getNumericPrice(product.price);
      const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      const priceA = getNumericPrice(a.price);
      const priceB = getNumericPrice(b.price);
      
      if (sortOption === 'priceLow') {
        return priceA - priceB;
      } else if (sortOption === 'priceHigh') {
        return priceB - priceA;
      } else if (sortOption === 'nameAZ') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'nameZA') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle min price input change
  const handleMinPriceChange = (e) => {
    const newMin = parseInt(e.target.value) || 0;
    setPriceRange([newMin, priceRange[1]]);
  };

  // Handle max price input change
  const handleMaxPriceChange = (e) => {
    const newMax = parseInt(e.target.value) || maxPrice;
    setPriceRange([priceRange[0], newMax]);
  };

  // Handle price range slider change
  const handlePriceSliderChange = (e) => {
    const value = parseInt(e.target.value);
    if (e.target.id === 'minPriceSlider') {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setPriceRange([0, maxPrice]);
    setSortOption('default');
  };

  // Toggle mobile filter visibility
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with search and filter toggle for mobile */}
      <div className="sticky top-0 z-10 bg-white shadow-md p-4 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-3 pl-10 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-themegreen bg-gray-50"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button 
            onClick={toggleFilter}
            className="relative flex items-center justify-center p-3 bg-themegreen text-white rounded-full hover:bg-themegreen/90 transition-all"
          >
            <HiAdjustments className="text-xl" />
            {activeFilters > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-screen-2xl mx-auto">
        {/* Filter Sidebar - ADJUSTED WIDTH FOR LARGER SCREENS */}
        <div 
          className={`${
            filterOpen ? 'fixed inset-0 z-50 bg-white overflow-auto' : 'hidden'
          } lg:sticky lg:top-0 lg:block lg:w-1/5 lg:h-screen bg-white lg:bg-transparent lg:shadow-none transition-all duration-300 ease-in-out`}
        >
          {/* Mobile filter header */}
          <div className="flex items-center justify-between p-4 border-b lg:hidden">
            <h2 className="text-xl font-bold">Filters</h2>
            <button 
              onClick={toggleFilter}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* ADJUSTED PADDING FOR FILTER SIDEBAR */}
          <div className="p-4 lg:p-4 overflow-y-auto max-h-screen">
            {/* Search Bar - visible only on desktop */}
            <div className="mb-6 hidden lg:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full p-2.5 pl-8 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-themegreen bg-gray-50 text-sm"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
              </div>
            </div>

            {/* Categories Filter - ADJUSTED MARGINS AND SIZES */}
            <div className="mb-6">
              <div className="flex items-center gap-1.5 mb-3">
                <MdCategory className="text-themegreen text-base" />
                <h3 className="text-base font-semibold">Categories</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1.5">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`text-left p-2 rounded-lg transition-all duration-200 text-sm ${
                      selectedCategory === category
                        ? 'bg-themegreen text-white font-medium shadow-md shadow-themegreen/30'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <div className="flex items-center">
                      <span className={`w-1.5 h-1.5 rounded-full ${selectedCategory === category ? 'bg-white' : 'bg-themegreen'} mr-1.5`}></span>
                      {category}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter - ADJUSTED MARGINS AND SIZES */}
            <div className="mb-6">
              <div className="flex items-center gap-1.5 mb-3">
                <RiPriceTag3Line className="text-themegreen text-base" />
                <h3 className="text-base font-semibold">Price Range</h3>
              </div>
              
              <div className="mb-3 px-1">
                <div className="flex justify-between mb-1.5 text-xs text-gray-500">
                  <span>{priceRange[0]} DH</span>
                  <span>{priceRange[1]} DH</span>
                </div>
                
                <div className="relative h-1 bg-gray-200 rounded-full mb-4">
                  <div 
                    className="absolute h-1 bg-themegreen rounded-full"
                    style={{
                      left: `${(priceRange[0] / maxPrice) * 100}%`,
                      right: `${100 - (priceRange[1] / maxPrice) * 100}%`
                    }}
                  ></div>
                  <input
                    id="minPriceSlider"
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={handlePriceSliderChange}
                    className="absolute w-full h-1 opacity-0 cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={handlePriceSliderChange}
                    className="absolute w-full h-1 opacity-0 cursor-pointer"
                  />
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <div className="relative flex-1">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">DH</span>
                    <input
                      type="number"
                      min="0"
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={handleMinPriceChange}
                      className="w-full p-1.5 pl-7 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-themegreen bg-gray-50 text-sm"
                    />
                  </div>
                  <span className="text-gray-400 text-xs">to</span>
                  <div className="relative flex-1">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">DH</span>
                    <input
                      type="number"
                      min={priceRange[0]}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={handleMaxPriceChange}
                      className="w-full p-1.5 pl-7 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-themegreen bg-gray-50 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sort Options - ADJUSTED MARGINS AND SIZES */}
            <div className="mb-6">
              <div className="flex items-center gap-1.5 mb-3">
                <FaSort className="text-themegreen text-base" />
                <h3 className="text-base font-semibold">Sort By</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-1.5">
                {[
                  { id: 'default', label: 'Default' },
                  { id: 'priceLow', label: 'Price: Low to High' },
                  { id: 'priceHigh', label: 'Price: High to Low' },
                  { id: 'nameAZ', label: 'Name: A to Z' },
                  { id: 'nameZA', label: 'Name: Z to A' }
                ].map((option) => (
                  <button
                    key={option.id}
                    className={`text-left p-2 rounded-lg transition-all duration-200 text-sm ${
                      sortOption === option.id
                        ? 'bg-themegreen text-white font-medium shadow-md shadow-themegreen/30'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setSortOption(option.id)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Filters - ADJUSTED PADDING */}
            <div className="pt-3 border-t">
              <button
                onClick={resetFilters}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-3 rounded-lg transition duration-200 flex items-center justify-center gap-1.5 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Reset Filters
              </button>
            </div>

            {/* Mobile apply button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t lg:hidden">
              <button
                onClick={toggleFilter}
                className="w-full bg-themegreen text-white font-bold py-3 px-4 rounded-lg transition duration-200"
              >
                Apply Filters ({processedProducts.length} products)
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid - ADJUSTED WIDTH FOR LARGER SCREENS */}
        <div className="w-full lg:w-4/5 px-4 lg:px-6 py-6 lg:py-8">
          {/* Summary Bar */}
          <div className="bg-white rounded-xl shadow-sm mb-6 p-4">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  {selectedCategory !== 'All' ? selectedCategory : 'All Products'}
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  {processedProducts.length} products found
                </p>
              </div>
              
              {activeFilters > 0 && (
                <div className="flex items-center gap-2">
                  <span className="bg-themegreen/10 text-themegreen px-3 py-1 rounded-full text-sm font-medium">
                    {activeFilters} {activeFilters === 1 ? 'filter' : 'filters'} applied
                  </span>
                  <button 
                    onClick={resetFilters}
                    className="text-gray-500 hover:text-gray-700 text-sm underline"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-themegreen"></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <div className="bg-red-50 text-red-800 p-6 rounded-xl text-center max-w-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xl font-bold mb-2">Error Loading Products</p>
                <p>{error}</p>
                <button 
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : processedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {processedProducts.map((item, index) => {
                // Check if this specific product is in cart
                const inCart = isProductInCart(item.id);

                return (
                  <Link
                    to={`/products/${item.id}`}
                    key={index}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-52 object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out" 
                      />
                      
                      {/* Overlay with quick view/wishlist options instead of add to cart */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              // Quick view functionality
                            }}
                            className="w-full bg-white/90 text-gray-800 py-2 px-4 rounded-lg font-medium transform transition duration-300 ease-out flex items-center justify-center gap-2"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            Quick View
                          </button>
                        </div>
                      </div>

                      {inCart && (
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full shadow-lg">
                            In Cart
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 flex-grow flex flex-col">
                      <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full w-fit">
                        {item.category}
                      </span>
                      
                      <h2 className="font-bold text-gray-800 mt-2 text-lg line-clamp-1">{item.name}</h2>
                      
                      <div className="mt-1 mb-3 flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar key={star} className="text-yellow-400 text-sm" />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">(5.0)</span>
                      </div>
                      
                      <div className="mt-auto pt-3 border-t">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-themegreen text-lg">{item.price.replace('$', '')} DH</span>
                          
                          <button
                            onClick={(e) => toggleProductInCart(e, item)}
                            className={`flex-1 ${
                              inCart ? 'bg-red-500 hover:bg-red-600' : 'bg-themegreen hover:bg-themegreen/90'
                            } text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1`}
                          >
                            {inCart ? (
                              <>
                                <MdRemoveShoppingCart className="text-base" />
                                Remove
                              </>
                            ) : (
                              <>
                                <MdAddShoppingCart className="text-base" />
                                Add to Cart
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold mb-2">No products found</h2>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
              <button
                className="bg-themegreen text-white px-6 py-3 rounded-lg font-bold hover:bg-themegreen/90 transition-colors"
                onClick={resetFilters}
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Pagination placeholder - could be implemented */}
          {processedProducts.length > 0 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-1">
                <button className="p-2 rounded-lg border bg-white text-gray-500 hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                {[1, 2, 3].map(page => (
                  <button 
                    key={page}
                    className={`h-10 w-10 rounded-lg ${
                      page === 1 ? 'bg-themegreen text-white' : 'border bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="p-2 rounded-lg border bg-white text-gray-500 hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}