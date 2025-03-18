import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0); 
  const [couponCode, setCouponCode] = useState(''); 
  const [couponError, setCouponError] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const loadCartItems = () => {
      try {
        const items = JSON.parse(localStorage.getItem('cart')) || [];

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

  // Calculate subtotal whenever cart items change
  useEffect(() => {
    let total = 0;
    cartItems.forEach(item => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      total += price * item.quantity;
    });
    setSubtotal(total);
  }, [cartItems]);

  const updateCart = (newCartItems) => {
    const flatItems = [];
    newCartItems.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        flatItems.push({ ...item, quantity: undefined });
      }
    });
    // newCartItems.forEach(item => {
    //     flatItems.push({ ...item, quantity: item.quantity++ });
    // });

    

    localStorage.setItem('cart', JSON.stringify(flatItems));
    window.dispatchEvent(new Event('cartUpdated'));
    setCartItems(newCartItems);
  };

  const removeItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    updateCart(newCartItems);
  };

  const increaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;
    updateCart(newCartItems);
  };

  const decreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
      updateCart(newCartItems);
    } else {
      removeItem(index);
    }
  };

  const clearCart = () => {
    localStorage.setItem('cart', JSON.stringify([]));
    window.dispatchEvent(new Event('cartUpdated'));
    setCartItems([]);
  };

  const continueShopping = () => {
    navigate('/products');
  };

  const checkout = () => {
    navigate('/checkout');
  };

 
  const applyCoupon = () => {
    if (couponCode === 'SWIQA2025') { 
      setCouponError('');
      setDiscount(0.10);
    } else {
      setCouponError('Invalid coupon code');
      setDiscount(0);
    }
  };

  // Calculate the discounted total
  const totalAfterDiscount = subtotal * (1 - discount);

  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <h1 className="text-2xl font-bold mb-8 text-center text-themegreen">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <button
            onClick={continueShopping}
            className="bg-themegreen text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left py-4 px-4">Product</th>
                    <th className="text-center py-4 px-4">Quantity</th>
                    <th className="text-right py-4 px-4">Price</th>
                    <th className="text-right py-4 px-4">Total</th>
                    <th className="text-right py-4 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => {
                    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
                    const total = price * item.quantity;

                    return (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded mr-4"
                            />
                            <div>
                              <h3 className="font-semibold text-themegreen">{item.name}</h3>
                              <p className="text-gray-500 text-sm">{item.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => decreaseQuantity(index)}
                              className="bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
                            >
                              <FaMinus className="text-gray-600 text-xs" />
                            </button>
                            <span className="mx-3 w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => increaseQuantity(index)}
                              className="bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
                            >
                              <FaPlus className="text-gray-600 text-xs" />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">{item.price}</td>
                        <td className="py-4 px-4 text-right font-semibold">
                          {total.toFixed(2)} DH
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="p-4 border-t flex justify-between">
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 font-medium flex items-center"
                >
                  <FaTrash className="mr-2" /> Clear Cart
                </button>
                <button
                  onClick={continueShopping}
                  className="text-themegreen hover:underline font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{subtotal.toFixed(2)} DH</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">{subtotal >= 100 ? 'Free' : '10.00 DH'}</span>
              </div>

              <div className="border-t my-4"></div>

              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Discount</span>
                <span className="font-semibold">{(discount * 100).toFixed(0)}%</span>
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter coupon code"
                />
                {couponError && <p className="text-red-500 text-sm mt-2">{couponError}</p>}
                <button
                  onClick={applyCoupon}
                  className="w-full mt-2 bg-themegreen text-white py-2 px-4 rounded-lg font-bold hover:bg-opacity-90 transition"
                >
                  Apply Coupon
                </button>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold text-themegreen">
                  {subtotal >= 100 ? totalAfterDiscount.toFixed(2) : (totalAfterDiscount +10).toFixed(2)} DH
                </span>
              </div>
              {
                totalAfterDiscount<50 ? (
                  <button class= " w-full  bg-gray-300 transition px-4 py-3 text-red-600 font-semibold  rounded-md cursor-not-allowed opacity-90" disabled>
                   Minimum order of 50 DH required !
                </button>
                ):(
              <button
                onClick={checkout}
                className="w-full bg-themegreen text-white py-3 px-4 rounded-lg font-bold hover:bg-opacity-90 transition"
              >
                Proceed to Checkout
              </button>
                )
              }
              <div className="mt-4 text-xs text-gray-500">
                <p className="text-themegreen mb-1">• Free shipping for orders over 100 DH</p>
                <p className='text-red-600'>• Minimum order of 50 DH required</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}