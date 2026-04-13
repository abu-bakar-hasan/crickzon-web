'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const mockCart = [
  { 
    id: 1, 
    name: "SS Ton Elite Bat", 
    variant: "1.1kg / English Willow", 
    price: 3999, 
    quantity: 1, 
    image: "https://ik.imagekit.io/crickzon/product4.png" 
  },
  { 
    id: 2, 
    name: "MRF Genius Bat", 
    variant: "1.2kg / Kashmir Willow", 
    price: 2799, 
    quantity: 2, 
    image: "https://ik.imagekit.io/crickzon/product4.png" 
  }
];

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(mockCart);

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 min-h-screen bg-[#F8FAFC]">
        <div className="text-[64px] mb-4">🛒</div>
        <h1 className="text-[20px] font-[600] text-[#0F172A] mb-2">Your cart is empty</h1>
        <p className="text-[14px] text-[#6B7280] mb-8 text-center max-w-[300px]">
          Looks like you haven't added anything yet
        </p>
        <Link 
          href="/store"
          className="bg-[#0057A8] text-white px-8 py-3 rounded-[12px] font-[600] text-[15px] hover:bg-[#004a8f] transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 lg:py-12">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left - Cart items (65%) */}
        <div className="w-full lg:w-[65%]">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-[24px] font-[700] text-[#0F172A]">Your Cart</h1>
            <span className="bg-[#0057A8] text-white text-[12px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center justify-center min-w-[24px]">
              {totalItems}
            </span>
          </div>

          <div className="flex flex-col">
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white border border-[#E5E7EB] rounded-[16px] p-[16px] mb-[12px] flex flex-col sm:flex-row gap-4 relative"
              >
                {/* Due to Image domains restriction safely using standard standard img for mock external data */}
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-[80px] h-[80px] rounded-[10px] object-cover bg-[#F0F4F8] flex-shrink-0"
                />
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-[15px] font-[600] text-[#0F172A] mb-1">{item.name}</h2>
                    <p className="text-[13px] text-[#6B7280]">{item.variant}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 sm:mt-0">
                    <span className="text-[15px] font-[600] text-[#0057A8]">
                      {formatCurrency(item.price)}
                    </span>

                    <div className="flex items-center gap-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#E5E7EB] rounded-full h-[36px] overflow-hidden bg-gray-50">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-[32px] h-full flex items-center justify-center text-[#0F172A] hover:bg-[#E5E7EB] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>
                        </button>
                        <span className="text-[14px] font-[600] w-[24px] text-center text-[#0F172A]">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-[32px] h-full flex items-center justify-center text-[#0F172A] hover:bg-[#E5E7EB] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5v14"/></svg>
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="w-[36px] h-[36px] flex items-center justify-center rounded-full text-[#EF4444] hover:bg-[#FEE2E2] transition-colors"
                        aria-label="Remove item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 mb-8 lg:mb-0">
            <Link href="/store" className="inline-flex items-center gap-1.5 text-[13px] text-[#0057A8] hover:underline font-[500]">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right - Order Summary (35%) */}
        <div className="w-full lg:w-[35%] relative">
          <div className="sticky top-[80px] bg-white border border-[#E5E7EB] rounded-[16px] p-[24px]">
            <h2 className="text-[16px] font-[600] text-[#0F172A] mb-6">Order Summary</h2>
            
            <div className="flex flex-col gap-4 text-[14px]">
              <div className="flex justify-between items-center text-[#6B7280]">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-[500] text-[#0F172A]">{formatCurrency(subtotal)}</span>
              </div>
              
              <div className="flex justify-between items-center text-[#6B7280]">
                <span>Shipping</span>
                <span className={`font-[600] ${shipping === 0 ? 'text-green-600' : 'text-[#0F172A]'}`}>
                  {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                </span>
              </div>

              <hr className="my-2 border-[#E5E7EB]" />
              
              <div className="flex justify-between items-center">
                <span className="text-[16px] font-[600] text-[#0F172A]">Total</span>
                <span className="text-[18px] font-[700] text-[#0F172A]">{formatCurrency(total)}</span>
              </div>
            </div>

            <button
              onClick={() => router.push('/checkout')}
              className="w-full mt-6 h-[48px] rounded-[12px] bg-[#0057A8] text-white text-[15px] font-[600] flex items-center justify-center hover:bg-[#004a8f] transition-colors"
            >
              Proceed to Checkout
            </button>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[12px] text-[#6B7280]">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span>Secure checkout</span>
            </div>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}
