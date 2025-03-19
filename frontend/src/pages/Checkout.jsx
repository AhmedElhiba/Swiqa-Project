import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaTrash, FaArrowLeft, FaCreditCard, FaLock, FaCheck, } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({
    subtotal: 0,
    shipping: 0,
    total: 0
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});
// hada useEffect l9dima 'by chanane'
  // useEffect(() => {
  //   const loadCartItems = () => {
  //     const items = JSON.parse(localStorage.getItem('cart')) || [

  //     ];
  //     setCartItems(items);
  //     calculateTotals(items);
  //   };

  //   loadCartItems();
  //   window.addEventListener('cartUpdated', loadCartItems);

  //   return () => {
  //     window.removeEventListener('cartUpdated', loadCartItems);
  //   };
  // }, []);


  useEffect(() => {
      const loadCartItems = () => {
        try {
          const items = JSON.parse(localStorage.getItem('cart')) || [];
          calculateTotals(items);
  
          const groupedItems = [];
          items.forEach(item => {
            const existingItem = groupedItems.find(i => i.name === item.name);
            if (existingItem) {
              existingItem.quantity += 1;
            } else {
              groupedItems.push({ ...item, quantity: 1 });
            }
          });
  
          setCartItems(groupedItems);
        } catch (error) {
          console.error("Error loading cart items:", error);
          setCartItems([]);
        }
      };
  
      loadCartItems();
      window.addEventListener('cartUpdated', loadCartItems);
  
      return () => {
        window.removeEventListener('cartUpdated', loadCartItems);
      };
    }, []);

  const calculateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
      return sum + price * (item.quantity || 1);
    }, 0);


    const shipping = items.length > 0 ? 10 : 0;
    const total = subtotal + shipping;

    setTotals({
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2)
    });
  };

  // const removeItemFromCart = (productId) => {
  //   const updatedCart = cartItems.filter(item => item.id !== productId);
  //   localStorage.setItem('cart', JSON.stringify(updatedCart));
  //   setCartItems(updatedCart);
  //   calculateTotals(updatedCart);
  //   window.dispatchEvent(new Event('cartUpdated'));
  // };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map(item => {

      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    calculateTotals(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone Number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const orderData = {
        ...formData,
        cartItems,
        total: totals.total,
    };
    setOrderPlaced(true);
    localStorage.setItem("cart", JSON.stringify([]));
        setCartItems([]);
        window.dispatchEvent(new Event("cartUpdated"));

    try {
        // Send order data to Laravel and get PDF response
        const response = await axios.post("http://127.0.0.1:8000/api/generate-pdf", orderData, {
            responseType: "blob", // kan3tiw l respons type dyal pdf 
        });

        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        
        const a = document.createElement("a");
        a.href = url;
        a.download = "order_ticket.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        // Clear cart after successful order
        // localStorage.setItem("cart", JSON.stringify([]));
        // setCartItems([]);
        // window.dispatchEvent(new Event("cartUpdated"));
        // setOrderPlaced(true);
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
};


  const goBackToShopping = () => {
    navigate('/products');
  };

// made by Ahmed - not the real one 
  const displayQuantity=(quantity)=>{
    if(quantity>1)
      return `x ${quantity}`
  }
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <button
            onClick={goBackToShopping}
            className="flex items-center text-themegreen hover:text-themesage transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Continue Shopping
          </button>
          <h1 className="text-2xl font-bold ml-auto">Checkout</h1>
        </div>

        {orderPlaced ? (
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md text-center max-w-md mx-auto flex flex-col items-center">
          <div className="text-6xl mb-4">
            <FaCheck className="text-themegreen" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6 text-lg sm:text-xl">Thank you for your purchase.</p>
          <button
            onClick={goBackToShopping}
            className="bg-themegreen text-white px-6 py-3 rounded-lg font-bold hover:bg-themesage transition-colors text-lg"
          >
            Continue Shopping
          </button>
        </div>
        
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <FaShoppingCart className="mr-2 text-themegreen" />
                  Your Cart ({cartItems.length} items)
                </h2>
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                    <button onClick={goBackToShopping} className="bg-themegreen text-white px-6 py-3 rounded-lg font-bold">Browse Products</button>
                  </div>
                ) : (
                  <div>
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 py-4 border-b border-gray-200">
                        <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                        <div className="flex-grow">
                          <h3 className="font-semibold">{item.name} {displayQuantity(item.quantity)}</h3>
                          <p className="text-themegreen font-bold">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <FaCreditCard className="mr-2 text-themegreen" />
                  Payment Information
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                      />
                      {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone Number </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                      />
                      {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                      />
                      {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Zip Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                      />
                      {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-themegreen text-white p-3 rounded-lg font-bold mt-6 hover:bg-themesage transition-colors"
                  >
                    Place Order
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{totals.subtotal} DH</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{totals.shipping} DH</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{totals.total} DH</span>
                  </div>
                </div>
                <div className="mt-6 text-sm text-gray-600 flex items-center">
                  <FaLock className="mr-2" />
                  Secure Payment
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}