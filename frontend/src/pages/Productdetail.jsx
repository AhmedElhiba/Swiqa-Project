import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaArrowLeft } from 'react-icons/fa';
import { MdAddShoppingCart, MdRemoveShoppingCart } from 'react-icons/md';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
        setProduct(response.data);
       
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setInCart(cart.some(item => item.id === response.data.id));
       
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

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md">
          <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="text-red-500 text-xl font-medium mb-4">{error}</p>
          <Link to="/products" className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition duration-300 shadow-md">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/products" className="flex items-center text-themegreen mb-6 hover:underline">
          <FaArrowLeft className="mr-2" /> Back to Products
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image - Now in a separate card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6">
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
              <div className="absolute top-4 right-4 bg-themegreen text-white px-3 py-1 rounded-full text-sm font-medium">
                New Arrival
              </div>
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full h-full  object-contain rounded-xl" 
              />
            </div>
          </div>

          {/* Product Details - Now in a separate card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block bg-emerald-100 text-themegreen px-3 py-1 rounded-full text-sm font-medium mb-2">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              </div>
              <div className="bg-gray-100 px-3 py-1 rounded-full">
                <span className="text-xs text-gray-500">ID: {product.id}</span>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex items-center text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
              </div>
              <span className="text-gray-600">(5.0) • 120 Reviews</span>
            </div>

            <div className="border-t border-b border-gray-100 py-4 my-4">
              <p className="text-gray-700 leading-relaxed">
                {product.description || 'Experience the perfect blend of style and functionality with this premium product. Designed for everyday use, it offers exceptional quality and durability.'}
              </p>
            </div>

            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold text-themegreen mr-2">{product.price} DH</span>
              <span className="text-lg text-gray-400 line-through">
                {(product.price * 1.2).toFixed(2)} DH
              </span>
              <span className="ml-2 bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                Save 20%
              </span>
            </div>

            <div className="flex items-center mb-6">
              <span className="text-gray-700 mr-3">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button 
                  onClick={decrementQuantity} 
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1 border-l border-r border-gray-300">{quantity}</span>
                <button 
                  onClick={incrementQuantity} 
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={toggleProductInCart}
              className={`w-full px-6 py-3 rounded-lg font-bold flex items-center justify-center transition duration-300 ${
                inCart 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-themegreen hover:bg-green-800'
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

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">You May Also Like</h2>
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
              {relatedProducts.map(item => (
                <Link 
                  key={item.id} 
                  to={`/products/${item.id}`} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group"
                >
                  <div className="relative h-22">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-themegreen font-medium">{item.category}</span>
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">{item.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-themegreen font-bold">{item.price} DH</span>
                      <div className="text-yellow-400 flex">
                        <FaStar />
                        <span className="text-gray-500 text-sm ml-1">5.0</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}