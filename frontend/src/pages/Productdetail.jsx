import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { 
  FaStar, 
  FaArrowLeft, 
  FaRegHeart, 
  FaHeart, 
  FaShippingFast,
  FaStore,
  FaShieldAlt
} from 'react-icons/fa';
import { MdAddShoppingCart, MdRemoveShoppingCart } from 'react-icons/md';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [favorited, setFavorited] = useState(false);
  const [showZoom, setShowZoom] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
        setProduct(response.data);
       
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setInCart(cart.some(item => item.id === response.data.id));

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorited(favorites.includes(response.data.id));
       
        const relatedResponse = await axios.get('http://127.0.0.1:8000/api/products');
        const related = relatedResponse.data
          .filter(item => item.category === response.data.category && item.id !== response.data.id)
          .slice(0, 4);
       
        setRelatedProducts(related);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Unable to load product details. Please try again later.');
        setLoading(false);
      }
    };
   
    fetchProduct();
   
    const handleCartUpdate = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (product) {
        setInCart(cart.some(item => item.id === product.id));
      }
    };
   
    window.addEventListener('cartUpdated', handleCartUpdate);
   
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [id]);
 
  const toggleProductInCart = () => {
    if (!product) return;
   
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (inCart) {
      const updatedCart = cart.filter(item => item.id !== product.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setInCart(false);
    } else {
      const productWithQuantity = { ...product, quantity };
      const updatedCart = [...cart, productWithQuantity];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setInCart(true);
    }
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const toggleFavorite = () => {
    if (!product) return;
    
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorited) {
      const updatedFavorites = favorites.filter(itemId => itemId !== product.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorited(false);
    } else {
      const updatedFavorites = [...favorites, product.id];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorited(true);
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-themegreen"></div>
          <p className="mt-4 text-themegreen font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
        <div 
          className="bg-white border-l-4 border-red-500 rounded-lg p-8 text-center max-w-md shadow-xl"
        >
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="text-red-500 text-xl font-medium mb-4">{error}</p>
          <Link to="/products" className="inline-block bg-themegreen hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition duration-300 shadow-md">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back navigation with hover effect */}
        <Link to="/products" className="group inline-flex items-center text-gray-600 mb-6 hover:text-themegreen transition-all duration-300">
          <span className="bg-white p-2 rounded-full shadow-md mr-3 group-hover:bg-themegreen group-hover:text-white transform group-hover:-translate-x-1 transition-all duration-300">
            <FaArrowLeft className="text-sm" />
          </span>
          <span className="font-medium group-hover:underline">Back to Products</span>
        </Link>
        
        {/* Main product section with shadow effect */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Product Image Section - Simplified to single image */}
            <div className="p-8 bg-gradient-to-br from-emerald-50 to-white">
              <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden bg-white shadow-md">
                {showZoom && (
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
                    onClick={() => setShowZoom(false)}
                  >
                    <div
                      className="relative w-full max-w-3xl p-4"
                    >
                      <img 
                        src={product.img} 
                        alt={product.name} 
                        className="w-full object-contain rounded-xl max-h-screen"
                        onClick={e => e.stopPropagation()}
                      />
                      <button
                        className="absolute top-4 right-4 bg-white rounded-full p-2"
                        onClick={() => setShowZoom(false)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4 z-10 flex space-x-2">
                  <span className="bg-themegreen text-white px-3 py-1 rounded-full text-sm font-medium">
                    New Arrival
                  </span>
                  <button 
                    onClick={toggleFavorite}
                    className={`p-2 rounded-full ${favorited ? 'bg-red-500 text-white' : 'bg-white text-gray-400'} shadow-md hover:shadow-lg transition-all duration-300`}
                  >
                    {favorited ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-4 cursor-zoom-in transform hover:scale-105 transition-transform duration-500"
                  onClick={() => setShowZoom(true)}
                />
              </div>
            </div>

            {/* Product Details Section */}
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="inline-flex items-center bg-emerald-100 text-themegreen px-3 py-1 rounded-full text-sm font-medium mb-2">
                    <span className="w-2 h-2 bg-themegreen null mr-2"></span>
                    {product.category}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                </div>
                <div className="bg-gray-100 px-3 py-1 rounded-full shadow-inner">
                  <span className="text-xs text-gray-500">Item #{product.id}</span>
                </div>
              </div>

              {/* Rating Badge */}
              <div className="flex items-center mb-6">
                <div className="flex items-center bg-yellow-50 text-yellow-600 px-3 py-2 rounded-lg mr-2">
                  <span className="font-bold mr-1">5.0</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <FaStar key={i} className="text-sm" />)}
                  </div>
                </div>
                <span className="text-gray-600">• 120 verified reviews</span>
              </div>

              {/* Information Tabs */}
              <div className="mb-6">
                <div className="flex border-b border-gray-200">
                  {['description', 'details', 'shipping'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 font-medium text-sm capitalize ${
                        activeTab === tab 
                          ? 'text-emerald-600 border-b-2 border-themegreen' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                
                <div className="py-4">
                  {activeTab === 'description' && (
                    <div
                      className="text-gray-700 leading-relaxed"
                    >
                      <p>
                        {product.description || 'Experience the perfect blend of style and functionality with this premium product. Designed for everyday use, it offers exceptional quality and durability.'}
                      </p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-themegreen rounded-full mr-2"></span>
                          <span>Premium quality materials</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-themegreen rounded-full mr-2"></span>
                          <span>Designed for everyday use</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-themegreen rounded-full mr-2"></span>
                          <span>Durable construction</span>
                        </li>
                      </ul>
                    </div>
                  )}
                  
                  {activeTab === 'details' && (
                    <div
                      className="text-gray-700"
                    >
                      <table className="w-full text-sm">
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 font-medium text-gray-500">Brand</td>
                            <td className="py-2">Premium Brand</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 font-medium text-gray-500">Materials</td>
                            <td className="py-2">High-quality materials</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 font-medium text-gray-500">Dimensions</td>
                            <td className="py-2">12 × 8 × 2 in</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 font-medium text-gray-500">Weight</td>
                            <td className="py-2">0.8 kg</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium text-gray-500">SKU</td>
                            <td className="py-2">PRD-{product.id}-XYZ</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  {activeTab === 'shipping' && (
                    <div
                      className="text-gray-700 space-y-4"
                    >
                      <div className="flex items-start">
                        <FaShippingFast className="text-themegreen text-lg mt-1 mr-3" />
                        <div>
                          <p className="font-medium">Fast Shipping</p>
                          <p className="text-sm text-gray-500">Free shipping on orders over 500 DH</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FaStore className="text-themegreen text-lg mt-1 mr-3" />
                        <div>
                          <p className="font-medium">In-Store Pickup</p>
                          <p className="text-sm text-gray-500">Available at select locations</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FaShieldAlt className="text-themegreen text-lg mt-1 mr-3" />
                        <div>
                          <p className="font-medium">30-Day Returns</p>
                          <p className="text-sm text-gray-500">Shop with confidence</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Section */}
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <div className="flex items-center mb-2">
                  <span className="text-3xl font-bold text-themegreen mr-2">{product.price} DH</span>
                  <span className="text-lg text-gray-400 line-through">
                    {(product.price * 1.2).toFixed(2)} DH
                  </span>
                  <span className="ml-2 bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                    Save 20%
                  </span>
                </div>
                <p className="text-xs text-gray-500">Price includes all taxes</p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center mb-6">
                <span className="text-gray-700 mr-3 font-medium">Quantity:</span>
                <div className="flex items-center">
                  <button 
                    onClick={decrementQuantity} 
                    className="w-10 h-10 rounded-l-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <div className="w-14 h-10 flex items-center justify-center border-t border-b border-gray-200 font-medium">
                    {quantity}
                  </div>
                  <button 
                    onClick={incrementQuantity} 
                    className="w-10 h-10 rounded-r-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="ml-4 text-sm text-gray-500">
                  {product.stock > 10 ? 'In Stock' : `Only ${product.stock || 'few'} left`}
                </span>
              </div>

              {/* Add to Cart Button - Maintaining original logic */}
              <div>
                <button
                  onClick={toggleProductInCart}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition duration-300 ${
                    inCart 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-themegreen hover:bg-emerald-600'
                  } text-white shadow-lg`}
                >
                  {inCart ? (
                    <><MdRemoveShoppingCart className="mr-2 text-xl" /> Remove from Cart</>
                  ) : (
                    <><MdAddShoppingCart className="mr-2 text-xl" /> Add to Cart</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-1/3 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
              <h2 className="text-2xl font-bold px-6 text-gray-800">You May Also Like</h2>
              <div className="w-1/3 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
            </div>
            
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
              {relatedProducts.map(item => (
                <div key={item.id}>
                  <Link 
                    to={`/products/${item.id}`} 
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group block h-full"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-white p-4">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-contain transition duration-500" 
                      />
                      <div className="absolute top-2 right-2 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <FaRegHeart className="text-gray-400" />
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-themegreen font-medium">{item.category}</span>
                      <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-1">{item.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-600 font-bold">{item.price} DH</span>
                        <div className="flex bg-yellow-50 px-2 py-1 rounded items-center">
                          <FaStar className="text-yellow-400 text-xs" />
                          <span className="text-gray-700 text-xs ml-1">5.0</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}