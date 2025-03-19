import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaArrowLeft } from 'react-icons/fa';
import { MdAddShoppingCart, MdRemoveShoppingCart } from 'react-icons/md';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

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
      const updatedCart = [...cart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setInCart(true);
    }
    window.dispatchEvent(new Event('cartUpdated'));
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center text-lg">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <p className="text-red-500 text-xl mb-4">{error}</p>
        <Link to="/products" className="bg-green-500 text-white px-4 py-2 rounded-lg">Return to Products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-16">
      <Link to="/products" className="flex items-center text-green-500 mb-6 hover:underline">
        <FaArrowLeft className="mr-2" /> Back to Products
      </Link>
      <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img src={product.img} alt={product.name} className="w-full h-96 object-cover" />
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">{product.category}</span>
            <div className="flex items-center mt-2 text-yellow-500">
              {[...Array(5)].map((_, i) => <FaStar key={i} />)}
              <span className="text-gray-600 ml-2">(5.0)</span>
            </div>
            <p className="text-gray-600 mt-4">{product.description || 'No description available.'}</p>
          </div>
          <div className="flex justify-between items-center mt-6">
            <span className="text-3xl font-bold text-green-600">{product.price} DH</span>
            <button 
              onClick={toggleProductInCart}
              className={`px-6 py-3 rounded-lg font-bold flex items-center transition ${inCart ? 'bg-red-500' : 'bg-green-500'} text-white hover:opacity-90`}
            >
              {inCart ? (
                <><MdRemoveShoppingCart className="mr-2" /> Remove</>
              ) : (
                <><MdAddShoppingCart className="mr-2" /> Add to Cart</>
              )}
            </button>
          </div>
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {relatedProducts.map(item => (
              <Link key={item.id} to={`/products/${item.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img src={item.img} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-green-600 font-bold">{item.price} DH</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}