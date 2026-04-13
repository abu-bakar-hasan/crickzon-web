'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import api from '@/lib/axios';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('orders');
  
  // Orders State
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfileData, setEditProfileData] = useState({ name: '', email: '' });
  const [savingProfile, setSavingProfile] = useState(false);

  // Addresses State
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    label: 'Home',
    street: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });
  const [savingAddress, setSavingAddress] = useState(false);
  const [deletingAddressId, setDeletingAddressId] = useState(null);

  useEffect(() => {
    if (!user) return;

    if (activeTab === 'orders') {
      setLoadingOrders(true);
      // Wait assuming API endpoint matches REST standard conventions defined in Next App 
      api.get('/orders')
        .then(res => setOrders(res.data.orders || []))
        .catch(err => console.error(err))
        .finally(() => setLoadingOrders(false));
    }
    
    if (activeTab === 'profile') {
      setEditProfileData({ name: user.name || '', email: user.email || '' });
    }
  }, [activeTab, user]);

  useEffect(() => {
    setLoadingAddresses(true);
    api.get('/auth/addresses')
      .then(res => setAddresses(res.data.addresses || res.data || []))
      .catch(err => console.error(err))
      .finally(() => setLoadingAddresses(false));
  }, []);

  const formatCurrency = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN')}`;
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await api.put('/auth/profile', editProfileData);
      
      // Since context user state isn't explicitly deeply mutating automatically here, we just sync locals or trigger a refresh in a real app.
      // But the instructions specify: On success show message
      user.name = editProfileData.name;
      user.email = editProfileData.email;
      
      showToast('Profile updated', 'success');
      setIsEditingProfile(false);
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const openNewAddress = () => {
    setAddressForm({ label: 'Home', street: '', city: '', state: '', pincode: '', isDefault: false });
    setEditingAddressId(null);
    setShowAddressForm(true);
  };

  const openEditAddress = (addr) => {
    setAddressForm({
      label: addr.label || 'Home',
      street: addr.street || '',
      city: addr.city || '',
      state: addr.state || '',
      pincode: addr.pincode || '',
      isDefault: addr.isDefault || false
    });
    setEditingAddressId(addr._id);
    setShowAddressForm(true);
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setSavingAddress(true);
    try {
      if (editingAddressId) {
        const res = await api.put(`/auth/addresses/${editingAddressId}`, addressForm);
        setAddresses(res.data.addresses);
      } else {
        const res = await api.post('/auth/addresses', addressForm);
        setAddresses(res.data.addresses);
      }
      setShowAddressForm(false);
      setEditingAddressId(null);
      setAddressForm({ label: 'Home', street: '', city: '', state: '', pincode: '', isDefault: false });
      showToast('Address saved', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to save address', 'error');
    } finally {
      setSavingAddress(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      const res = await api.delete(`/auth/addresses/${id}`);
      setAddresses(res.data.addresses);
      setDeletingAddressId(null);
      showToast('Address deleted', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to delete address', 'error');
    }
  };

  const OrderStatusBadge = ({ status }) => {
    const s = (status || 'pending').toLowerCase();
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-[#0057A8]',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-[11px] font-[700] uppercase tracking-wider ${styles[s] || 'bg-gray-100 text-gray-800'}`}>
        {s}
      </span>
    );
  };

  const navLinks = [
    { id: 'orders', label: 'My Orders' },
    { id: 'profile', label: 'My Profile' },
    { id: 'addresses', label: 'Saved Addresses' }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-20 flex flex-col items-center justify-center">
        <h1 className="text-xl font-[600] text-[#0F172A] mb-4">You are not logged in</h1>
        <Link href="/login" className="bg-[#0057A8] text-white px-6 py-2.5 rounded-[8px] font-[500] hover:bg-[#004a8f]">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 lg:py-12">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left - Sidebar */}
        <div className="w-full lg:w-[260px] bg-white border border-[#E5E7EB] rounded-[16px] p-6 flex-shrink-0 lg:sticky lg:top-[80px] h-fit shadow-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="w-[64px] h-[64px] rounded-full bg-[#EBF3FF] text-[#0057A8] text-[20px] font-[700] flex items-center justify-center mb-4">
              {user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
            </div>
            <h2 className="text-[16px] font-[600] text-[#0F172A] text-center">{user.name}</h2>
            <p className="text-[13px] text-[#6B7280] text-center">{user.email}</p>
          </div>

          <nav className="flex flex-col gap-1.5">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setShowAddressForm(false);
                }}
                className={`text-left text-[14px] font-[500] px-[16px] py-[12px] rounded-[8px] transition-all duration-200 ${
                  activeTab === link.id 
                    ? 'bg-[#EBF3FF] text-[#0057A8] border-l-[3px] border-[#0057A8]' 
                    : 'text-[#6B7280] hover:bg-gray-50 border-l-[3px] border-transparent'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <div className="h-px bg-[#E5E7EB] my-2"></div>
            
            <button 
              onClick={() => logout()}
              className="text-left text-[14px] font-[500] px-[16px] py-[12px] rounded-[8px] transition-colors text-[#EF4444] hover:bg-red-50 border-l-[3px] border-transparent mt-1"
            >
              Logout
            </button>
          </nav>
        </div>

        {/* Right - Content Area */}
        <div className="flex-1">
          
          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div>
              <h1 className="text-[20px] font-[700] text-[#0F172A] mb-6">My Orders</h1>
              
              {loadingOrders ? (
                <div className="text-center py-10 text-gray-500 animate-pulse">Loading your orders...</div>
              ) : orders.length === 0 ? (
                <div className="bg-white border border-[#E5E7EB] rounded-[16px] flex flex-col items-center justify-center py-16 text-center shadow-sm">
                  <div className="text-[48px] mb-4">📦</div>
                  <p className="text-[16px] font-[600] text-[#0F172A] mb-2">No orders found</p>
                  <p className="text-[14px] text-[#6B7280] px-4">You haven't placed any orders yet.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {orders.map((order) => (
                    <div key={order._id} className="bg-white border border-[#E5E7EB] rounded-[16px] p-[20px] shadow-sm">
                      
                      <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-4 mb-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-[13px] font-mono text-[#6B7280]">#{order._id?.slice(-6).toUpperCase()}</span>
                          <span className="text-[14px] font-[500] text-[#0F172A]">{formatDate(order.createdAt)}</span>
                        </div>
                        <OrderStatusBadge status={order.status} />
                      </div>

                      <div className="flex flex-col gap-4">
                        {(order.items || []).map((item, idx) => {
                          const variantInfo = typeof item.selectedOptions === 'object' && item.selectedOptions
                            ? Object.entries(item.selectedOptions).map(([k,v]) => `${k}: ${v}`).join(' / ')
                            : '';
                          return (
                            <div key={idx} className="flex gap-4 items-center">
                              {item.image ? (
                                <img src={item.image} alt={item.name} className="w-[48px] h-[48px] rounded-[8px] bg-[#F0F4F8] object-cover flex-shrink-0" />
                              ) : (
                                <div className="w-[48px] h-[48px] rounded-[8px] bg-[#F0F4F8] flex-shrink-0 flex items-center justify-center text-[10px] text-gray-400">No Image</div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h3 className="text-[14px] font-[600] text-[#0F172A] truncate">{item.name}</h3>
                                {variantInfo && <p className="text-[12px] text-[#6B7280] truncate">{variantInfo}</p>}
                              </div>
                              <div className="text-[13px] font-[500] text-[#6B7280]">
                                x{item.quantity}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex justify-between items-center border-t border-[#E5E7EB] mt-4 pt-4">
                        <div>
                          <p className="text-[12px] text-[#6B7280] mb-0.5">Total Amount</p>
                          <p className="text-[16px] font-[600] text-[#0057A8]">{formatCurrency(order.total)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h1 className="text-[20px] font-[700] text-[#0F172A]">My Profile</h1>
              </div>
              
              {!isEditingProfile ? (
                <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-[24px] shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h2 className="text-[16px] font-[600] text-[#0F172A]">Personal Information</h2>
                    <button 
                      onClick={() => setIsEditingProfile(true)}
                      className="text-[13px] font-[600] text-[#0057A8] border border-[#E5E7EB] px-4 py-2 rounded-[8px] hover:bg-[#EBF3FF] transition-colors"
                    >
                      Edit Profile
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <p className="text-[13px] text-[#6B7280] mb-1">Full Name</p>
                      <p className="text-[15px] font-[500] text-[#0F172A]">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-[13px] text-[#6B7280] mb-1">Email Address</p>
                      <p className="text-[15px] font-[500] text-[#0F172A]">{user.email}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="bg-white border border-[#E5E7EB] rounded-[16px] p-[24px] flex flex-col gap-6 shadow-sm">
                  <h2 className="text-[16px] font-[600] text-[#0F172A]">Edit Information</h2>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-[500] text-[#374151]">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={editProfileData.name} 
                      onChange={handleProfileChange} 
                      className="w-full h-[44px] rounded-[10px] border border-[#E5E7EB] px-4 outline-none focus:border-[#0057A8] text-[15px] text-[#0F172A]" 
                      required 
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                     <label className="text-[13px] font-[500] text-[#374151]">Email Address</label>
                     <input 
                      type="email" 
                      name="email" 
                      value={editProfileData.email} 
                      onChange={handleProfileChange} 
                      className="w-full h-[44px] rounded-[10px] border border-[#E5E7EB] px-4 outline-none focus:border-[#0057A8] text-[15px] text-[#0F172A]" 
                      required 
                     />
                  </div>
                  
                  <div className="flex justify-end gap-3 mt-2">
                     <button 
                      type="button" 
                      onClick={() => setIsEditingProfile(false)} 
                      className="px-6 py-2.5 rounded-[10px] text-[15px] font-[600] text-[#374151] hover:bg-gray-100 border border-transparent transition-colors"
                     >
                       Cancel
                     </button>
                     <button 
                      type="submit" 
                      disabled={savingProfile}
                      className="px-6 py-2.5 rounded-[10px] text-[15px] font-[600] text-white bg-[#0057A8] hover:bg-[#004a8f] transition-colors shadow-sm disabled:opacity-75"
                     >
                       {savingProfile ? 'Saving...' : 'Save Changes'}
                     </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div>
              
              {!showAddressForm ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-[20px] font-[700] text-[#0F172A]">Saved Addresses</h1>
                    <button 
                      onClick={openNewAddress}
                      className="text-[13px] font-[600] text-white bg-[#0057A8] px-4 py-2 rounded-[8px] hover:bg-[#004a8f] transition-colors shadow-sm"
                    >
                      Add New Address
                    </button>
                  </div>

                  {loadingAddresses ? (
                    <div className="text-center py-10 text-gray-500 animate-pulse">Loading addresses...</div>
                  ) : addresses.length === 0 ? (
                    <div className="bg-white border border-[#E5E7EB] rounded-[16px] flex flex-col items-center justify-center py-16 text-center shadow-sm">
                      <div className="text-[48px] mb-4">🏠</div>
                      <p className="text-[16px] font-[600] text-[#0F172A] mb-2">No addresses saved</p>
                      <p className="text-[14px] text-[#6B7280] px-4">Add an address to make your checkout experience faster.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.filter(Boolean).map(addr => (
                        <div key={addr?._id} className="bg-white border border-[#E5E7EB] rounded-[16px] p-[20px] shadow-sm flex flex-col justify-between relative">
                          
                          {addr?.isDefault && (
                            <span className="absolute top-5 right-5 text-[11px] font-[700] bg-gray-100 text-[#0F172A] px-2 py-0.5 rounded">
                              DEFAULT
                            </span>
                          )}

                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <span className="bg-[#EBF3FF] text-[#0057A8] border border-blue-100 text-[11px] font-[700] px-2.5 py-1 rounded inline-block uppercase tracking-wider">
                                {addr?.label}
                              </span>
                            </div>
                            <p className="text-[14px] text-[#6B7280] leading-relaxed mb-6">
                              <span className="text-[#0F172A] font-[500] block mb-1">{addr?.street}</span>
                              {addr?.city}, {addr?.state} <br/> {addr?.pincode}
                            </p>
                          </div>
                          
                          <div className="flex gap-4 border-t border-[#E5E7EB] pt-4">
                            {deletingAddressId === addr?._id ? (
                              <div className="flex items-center gap-3 w-full justify-between">
                                <span className="text-[13px] font-[600] text-[#EF4444]">Delete this address?</span>
                                <div className="flex gap-2">
                                  <button 
                                    onClick={() => setDeletingAddressId(null)}
                                    className="text-[13px] font-[600] text-[#6B7280] hover:underline px-2 py-1"
                                  >
                                    Cancel
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteAddress(addr?._id)} 
                                    className="text-[13px] font-[600] bg-[#FEE2E2] text-[#EF4444] rounded-[8px] px-3 py-1 hover:bg-red-200 transition-colors"
                                  >
                                    Yes, Delete
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <button 
                                  onClick={() => openEditAddress(addr)}
                                  className="text-[13px] font-[600] text-[#0057A8] hover:underline"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => setDeletingAddressId(addr?._id)} 
                                  className="text-[13px] font-[600] text-[#EF4444] hover:underline"
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-[24px] shadow-sm">
                  <h2 className="text-[18px] font-[600] text-[#0F172A] mb-6">
                    {editingAddressId ? 'Edit Address' : 'Add New Address'}
                  </h2>
                  <form onSubmit={handleSaveAddress} className="flex flex-col gap-6">
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-[500] text-[#374151]">Address Label</label>
                      <select 
                        name="label" 
                        value={addressForm.label} 
                        onChange={handleAddressChange}
                        className="w-full h-[44px] rounded-[10px] border border-[#E5E7EB] px-4 outline-none focus:border-[#0057A8] text-[15px] text-[#0F172A] bg-white"
                      >
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-[500] text-[#374151]">Street Address</label>
                      <input 
                        type="text" 
                        name="street" 
                        value={addressForm.street} 
                        onChange={handleAddressChange} 
                        className="w-full h-[44px] rounded-[10px] border border-[#E5E7EB] px-4 outline-none focus:border-[#0057A8] text-[15px] text-[#0F172A]" 
                        required 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-[500] text-[#374151]">City</label>
                        <input 
                          type="text" 
                          name="city" 
                          value={addressForm.city} 
                          onChange={handleAddressChange} 
                          className="w-full h-[44px] rounded-[10px] border border-[#E5E7EB] px-4 outline-none focus:border-[#0057A8] text-[15px] text-[#0F172A]" 
                          required 
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-[500] text-[#374151]">State</label>
                        <input 
                          type="text" 
                          name="state" 
                          value={addressForm.state} 
                          onChange={handleAddressChange} 
                          className="w-full h-[44px] rounded-[10px] border border-[#E5E7EB] px-4 outline-none focus:border-[#0057A8] text-[15px] text-[#0F172A]" 
                          required 
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-[500] text-[#374151]">Pincode</label>
                      <input 
                        type="text" 
                        name="pincode" 
                        value={addressForm.pincode} 
                        onChange={handleAddressChange} 
                        className="w-full h-[44px] rounded-[10px] border border-[#E5E7EB] px-4 outline-none focus:border-[#0057A8] text-[15px] text-[#0F172A]" 
                        required 
                      />
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <input 
                        type="checkbox" 
                        id="isDefault" 
                        name="isDefault" 
                        checked={addressForm.isDefault} 
                        onChange={handleAddressChange}
                        className="w-4 h-4 text-[#0057A8] border-[#E5E7EB] rounded focus:ring-[#0057A8]"
                      />
                      <label htmlFor="isDefault" className="text-[14px] text-[#374151] select-none cursor-pointer">
                        Set as default address
                      </label>
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                       <button 
                        type="button" 
                        onClick={() => setShowAddressForm(false)} 
                        className="px-6 py-2.5 rounded-[10px] text-[15px] font-[600] text-[#374151] hover:bg-gray-100 border border-transparent transition-colors"
                       >
                         Cancel
                       </button>
                       <button 
                        type="submit" 
                        disabled={savingAddress}
                        className="px-6 py-2.5 rounded-[10px] text-[15px] font-[600] text-white bg-[#0057A8] hover:bg-[#004a8f] transition-colors shadow-sm disabled:opacity-75"
                       >
                         {savingAddress ? 'Saving...' : 'Save Address'}
                       </button>
                    </div>

                  </form>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
