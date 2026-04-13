'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useCartStore from '@/store/cartStore';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import api from '@/lib/axios';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { showToast } = useToast();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    label: 'Home',
    saveAddress: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Guards preventing anonymous/empty checkouts routing natively
    if (!user) {
      router.push('/login');
      return;
    }
    if (items.length === 0) {
      router.push('/cart');
      return;
    }

    // Unpack local profiles mapped against accounts for instant auto-filling capabilities
    api.get('/auth/addresses')
      .then(res => setSavedAddresses(res.data.addresses || res.data || []))
      .catch(err => console.error(err));
  }, [user, items.length, router]);

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const formatCurrency = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN')}`;

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

  const handleAddressSelect = (e) => {
    const addrId = e.target.value;
    if (!addrId) {
      // Clear specific mapped fields to allow raw user input again seamlessly
      setFormData(prev => ({
        ...prev, street: '', city: '', state: '', pincode: '', saveAddress: false
      }));
      return;
    }
    const addr = savedAddresses.find(a => a._id === addrId);
    if (addr) {
      setFormData(prev => ({
        ...prev,
        label: addr.label || 'Home',
        street: addr.street || '',
        city: addr.city || '',
        state: addr.state || '',
        pincode: addr.pincode || '',
        saveAddress: false // It exists so we disable duplicate payload posts
      }));
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

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrorMsg('');
    try {
      const orderItems = items.map(item => ({
        product: item.productId,
        variant: item.variantId,
        quantity: item.quantity
      }));

      // In case user explicitly checked "Save this new address", fire off payload immediately ignoring response blocking
      if (formData.saveAddress) {
        api.post('/auth/addresses', {
          label: formData.label,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          isDefault: true
        }).catch(e => console.error("Optional Address creation silenced", e));
      }

      // Block checkout logic until successful REST mapping resolves natively
      await api.post('/orders', {
        items: orderItems,
        address: {
          label: formData.label || 'Home',
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        }
      });

      clearCart();
      showToast('Order placed successfully!', 'success');
      router.push('/account');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  // Prevent UI rendering jumps while native hooks parse redirects out
  if (!user || items.length === 0) {
    return <div className="min-h-screen bg-[#F8FAFC]"></div>; 
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 lg:py-12">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8">
          
          {/* Left - Delivery & Payment (60%) */}
          <div className="w-full lg:w-[60%] flex flex-col gap-6">
            
            {/* Section 1: Delivery Address */}
            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-[24px]">
              <h2 className="text-[16px] font-[600] text-[#0F172A] mb-6">Delivery Address</h2>
              
              {/* Dynamic Saved Address Dropdown Array injection per prompt rules */}
              {savedAddresses.length > 0 && (
                <div className="mb-6 pb-6 border-b border-[#E5E7EB]">
                  <label className="text-[13px] font-[500] text-[#374151] block mb-2">Select a Saved Address</label>
                  <select 
                    onChange={handleAddressSelect}
                    className="w-full h-[44px] rounded-[10px] border border-[#E5E7EB] px-4 outline-none focus:border-[#0057A8] text-[15px] bg-white cursor-pointer"
                  >
                    <option value="">-- Manual Entry --</option>
                    {savedAddresses.map(addr => (
                      <option key={addr._id} value={addr._id}>
                        {addr.label} - {addr.street}, {addr.city}
                      </option>
                    ))}
                  </select>
                </div>
              )}

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

                {/* Save Address check input natively tied inline mapping */}
                <label className="flex items-center gap-2 mt-2 cursor-pointer w-fit">
                  <input
                    type="checkbox"
                    name="saveAddress"
                    checked={formData.saveAddress}
                    onChange={handleInputChange}
                    className="w-[16px] h-[16px] rounded-[4px] border-[#E5E7EB] text-[#0057A8] focus:ring-[#0057A8] cursor-pointer"
                  />
                  <span className="text-[13px] text-[#374151]">Save this address for future checkouts</span>
                </label>
              </div>
            </div>

            {/* Section 2: Payment Method */}
            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-[24px]">
              <h2 className="text-[16px] font-[600] text-[#0F172A] mb-6">Payment Method</h2>
              
              <div className="border-[2px] border-[#0057A8] rounded-[12px] p-[16px] bg-[#F8FAFC] flex items-center gap-4 cursor-pointer">
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
              
              {/* Items List directly referencing useCartStore state array */}
              <div className="flex flex-col gap-4 mb-6">
                {items.map((item) => {
                  const variantInfo = typeof item.selectedOptions === 'object' && item.selectedOptions
                        ? Object.entries(item.selectedOptions).map(([k,v]) => `${k}: ${v}`).join(' / ')
                        : '';
                  return (
                  <div key={item.variantId} className="flex gap-4">
                    {/* Image bindings safely falling back */}
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-[48px] h-[48px] rounded-[8px] bg-[#F0F4F8] object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-[48px] h-[48px] rounded-[8px] bg-[#E5E7EB] flex-shrink-0"></div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] font-[600] text-[#0F172A] truncate">
                        {item.brand ? `${item.brand} ` : ''}{item.name}
                      </h3>
                      {variantInfo && <p className="text-[12px] text-[#6B7280] truncate">{variantInfo}</p>}
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      {/* Multiplication bindings mapping prices resolving arrays */}
                      <p className="text-[14px] font-[600] text-[#0057A8]">{formatCurrency(item.price * item.quantity)}</p>
                      <p className="text-[12px] text-[#6B7280]">Qty: {item.quantity}</p>
                    </div>
                  </div>
                )})}
              </div>

              {/* Totals Calculation resolved through Zustand */}
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

              {/* Error Output Catch Block */}
              {errorMsg && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 text-[13px] font-[500] rounded-lg">
                  {errorMsg}
                </div>
              )}

              {/* CTA blocking sequence on pending REST post */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 h-[52px] rounded-[12px] bg-[#0057A8] text-white text-[16px] font-[600] flex items-center justify-center hover:bg-[#004a8f] transition-colors disabled:opacity-80 disabled:cursor-wait"
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
