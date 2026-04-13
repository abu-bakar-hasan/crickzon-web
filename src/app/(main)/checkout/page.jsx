'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Mock Data
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

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    saveAddress: false,
  });

  const [errors, setErrors] = useState({});

  const subtotal = mockCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Phone Number must be 10 digits';
    }
    
    if (!formData.street.trim()) newErrors.street = 'Street Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Simulate API call and redirect
    setTimeout(() => {
      setLoading(false);
      router.push('/account?order=success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 lg:py-12">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
          
          {/* Left - Delivery & Payment (60%) */}
          <div className="w-full lg:w-[60%] flex flex-col gap-6">
            
            {/* Section 1: Delivery Address */}
            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-[24px]">
              <h2 className="text-[16px] font-[600] text-[#0F172A] mb-6">Delivery Address</h2>
              
              <div className="flex flex-col gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className={`w-full h-[44px] px-4 rounded-[10px] border text-[15px] outline-none transition-colors placeholder:text-gray-400 ${
                      errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#0057A8]'
                    }`}
                  />
                  {errors.fullName && <span className="text-red-500 text-[13px]">{errors.fullName}</span>}
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    maxLength={10}
                    className={`w-full h-[44px] px-4 rounded-[10px] border text-[15px] outline-none transition-colors placeholder:text-gray-400 ${
                      errors.phone ? 'border-red-500 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#0057A8]'
                    }`}
                  />
                  {errors.phone && <span className="text-red-500 text-[13px]">{errors.phone}</span>}
                </div>

                {/* Street Address */}
                <div className="flex flex-col gap-1.5">
                  <textarea
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="Street Address, Apartment, Suite, etc."
                    className={`w-full h-[80px] p-4 rounded-[10px] border text-[15px] outline-none transition-colors placeholder:text-gray-400 resize-none ${
                      errors.street ? 'border-red-500 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#0057A8]'
                    }`}
                  />
                  {errors.street && <span className="text-red-500 text-[13px]">{errors.street}</span>}
                </div>

                {/* City + State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className={`w-full h-[44px] px-4 rounded-[10px] border text-[15px] outline-none transition-colors placeholder:text-gray-400 ${
                        errors.city ? 'border-red-500 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#0057A8]'
                      }`}
                    />
                    {errors.city && <span className="text-red-500 text-[13px]">{errors.city}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="State"
                      className={`w-full h-[44px] px-4 rounded-[10px] border text-[15px] outline-none transition-colors placeholder:text-gray-400 ${
                        errors.state ? 'border-red-500 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#0057A8]'
                      }`}
                    />
                    {errors.state && <span className="text-red-500 text-[13px]">{errors.state}</span>}
                  </div>
                </div>

                {/* Pincode */}
                <div className="flex flex-col gap-1.5">
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Pincode (6 digits)"
                    maxLength={6}
                    className={`w-full h-[44px] px-4 rounded-[10px] border text-[15px] outline-none transition-colors placeholder:text-gray-400 ${
                      errors.pincode ? 'border-red-500 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#0057A8]'
                    }`}
                  />
                  {errors.pincode && <span className="text-red-500 text-[13px]">{errors.pincode}</span>}
                </div>

                {/* Save Address */}
                <label className="flex items-center gap-2 mt-2 cursor-pointer w-fit">
                  <input
                    type="checkbox"
                    name="saveAddress"
                    checked={formData.saveAddress}
                    onChange={handleInputChange}
                    className="w-[16px] h-[16px] rounded-[4px] border-[#E5E7EB] text-[#0057A8] focus:ring-[#0057A8] cursor-pointer"
                  />
                  <span className="text-[13px] text-[#374151]">Save this address</span>
                </label>
              </div>
            </div>

            {/* Section 2: Payment Method */}
            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-[24px]">
              <h2 className="text-[16px] font-[600] text-[#0F172A] mb-6">Payment Method</h2>
              
              <div className="border-[2px] border-[#0057A8] rounded-[12px] p-[16px] bg-[#F8FAFC] flex items-center gap-4 cursor-pointer">
                {/* Custom Radio Button */}
                <div className="flex-shrink-0 w-[20px] h-[20px] rounded-full border-[6px] border-[#0057A8] bg-white"></div>
                
                <div className="text-[24px] leading-none">💵</div>
                
                <div className="flex-1">
                  <p className="text-[15px] font-[600] text-[#0F172A]">Cash on Delivery</p>
                  <p className="text-[13px] text-[#6B7280]">Pay when your order arrives</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right - Order Summary (40%) */}
          <div className="w-full lg:w-[40%] relative">
            <div className="sticky top-[80px] bg-white border border-[#E5E7EB] rounded-[16px] p-[24px]">
              <h2 className="text-[16px] font-[600] text-[#0F172A] mb-6">Order Summary</h2>
              
              {/* Items List */}
              <div className="flex flex-col gap-4 mb-6">
                {mockCart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {/* Using standard img for external ImageKit mock data */}
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-[48px] h-[48px] rounded-[8px] bg-[#F0F4F8] object-cover flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] font-[600] text-[#0F172A] truncate">{item.name}</h3>
                      <p className="text-[12px] text-[#6B7280] truncate">{item.variant}</p>
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      <p className="text-[14px] font-[600] text-[#0057A8]">{formatCurrency(item.price)}</p>
                      <p className="text-[12px] text-[#6B7280]">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals Calculation */}
              <div className="border-t border-[#E5E7EB] pt-4 flex flex-col gap-4">
                <div className="flex justify-between items-center text-[14px] text-[#6B7280]">
                  <span>Subtotal</span>
                  <span className="font-[500] text-[#0F172A]">{formatCurrency(subtotal)}</span>
                </div>
                
                <div className="flex justify-between items-center text-[14px] text-[#6B7280]">
                  <span>Shipping</span>
                  <span className={`font-[600] ${shipping === 0 ? 'text-green-600' : 'text-[#0F172A]'}`}>
                    {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                  </span>
                </div>

                <hr className="my-1 border-[#E5E7EB]" />
                
                <div className="flex justify-between items-center">
                  <span className="text-[16px] font-[600] text-[#0F172A]">Total</span>
                  <span className="text-[18px] font-[700] text-[#0F172A]">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 h-[52px] rounded-[12px] bg-[#0057A8] text-white text-[16px] font-[600] flex items-center justify-center hover:bg-[#004a8f] transition-colors disabled:opacity-80 disabled:cursor-wait"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Place Order'
                )}
              </button>

              <p className="text-center text-[11px] text-[#9CA3AF] mt-4">
                By placing order you agree to our Terms & Conditions
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
