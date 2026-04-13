'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock Data
const mockOrders = [
  {
    id: "ORD10092",
    date: "12 Apr 2026",
    status: "delivered",
    total: 3999,
    items: [
      { id: 1, name: "SS Ton Elite Bat", variant: "1.1kg / English Willow", price: 3999, quantity: 1, image: "https://ik.imagekit.io/crickzon/product4.png" }
    ]
  },
  {
    id: "ORD10093",
    date: "13 Apr 2026",
    status: "shipped",
    total: 2799,
    items: [
      { id: 2, name: "MRF Genius Bat", variant: "1.2kg / Kashmir Willow", price: 2799, quantity: 1, image: "https://ik.imagekit.io/crickzon/product4.png" }
    ]
  }
];

const mockAddresses = [
  {
    id: 1,
    label: "Home",
    fullName: "John Doe",
    phone: "9876543210",
    street: "123 Cricket Avenue, Block B",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001"
  }
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');
  
  // Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({ name: 'John Doe', email: 'john@example.com', phone: '9876543210' });
  const [editProfileData, setEditProfileData] = useState(profileData);

  // Address State
  const [addresses, setAddresses] = useState(mockAddresses);

  const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileData(editProfileData);
    setIsEditingProfile(false);
  };

  const OrderStatusBadge = ({ status }) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-[#0057A8]',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-[11px] font-[700] uppercase tracking-wider ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const navLinks = [
    { id: 'orders', label: 'My Orders' },
    { id: 'profile', label: 'My Profile' },
    { id: 'addresses', label: 'Saved Addresses' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 lg:py-12">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left - Sidebar */}
        <div className="w-full lg:w-[260px] bg-white border border-[#E5E7EB] rounded-[16px] p-6 flex-shrink-0 lg:sticky lg:top-[80px] h-fit shadow-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="w-[64px] h-[64px] rounded-full bg-[#EBF3FF] text-[#0057A8] text-[20px] font-[700] flex items-center justify-center mb-4">
              {profileData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </div>
            <h2 className="text-[16px] font-[600] text-[#0F172A] text-center">{profileData.name}</h2>
            <p className="text-[13px] text-[#6B7280] text-center">{profileData.email}</p>
          </div>

          <nav className="flex flex-col gap-1.5">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
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
            
            <button className="text-left text-[14px] font-[500] px-[16px] py-[12px] rounded-[8px] transition-colors text-[#EF4444] hover:bg-red-50 border-l-[3px] border-transparent mt-1">
              Logout
            </button>
          </nav>
        </div>

        {/* Right - Content Area */}
        <div className="flex-1">
          {/* Tabs Content */}
          {activeTab === 'orders' && (
            <div>
              <h1 className="text-[20px] font-[700] text-[#0F172A] mb-6">My Orders</h1>
              
              {mockOrders.length === 0 ? (
                <div className="bg-white border border-[#E5E7EB] rounded-[16px] flex flex-col items-center justify-center py-16 text-center shadow-sm">
                  <div className="text-[48px] mb-4">📦</div>
                  <p className="text-[16px] font-[600] text-[#0F172A] mb-2">No orders found</p>
                  <p className="text-[14px] text-[#6B7280] px-4">You haven't placed any orders yet.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="bg-white border border-[#E5E7EB] rounded-[16px] p-[20px] shadow-sm">
                      
                      <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-4 mb-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-[13px] font-mono text-[#6B7280]">#{order.id}</span>
                          <span className="text-[14px] font-[500] text-[#0F172A]">{order.date}</span>
                        </div>
                        <OrderStatusBadge status={order.status} />
                      </div>

                      <div className="flex flex-col gap-4">
                        {order.items.map(item => (
                          <div key={item.id} className="flex gap-4 items-center">
                            <img src={item.image} alt={item.name} className="w-[48px] h-[48px] rounded-[8px] bg-[#F0F4F8] object-cover flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-[14px] font-[600] text-[#0F172A] truncate">{item.name}</h3>
                              <p className="text-[12px] text-[#6B7280] truncate">{item.variant}</p>
                            </div>
                            <div className="text-[13px] font-[500] text-[#6B7280]">
                              x{item.quantity}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center border-t border-[#E5E7EB] mt-4 pt-4">
                        <div>
                          <p className="text-[12px] text-[#6B7280] mb-0.5">Total Amount</p>
                          <p className="text-[16px] font-[600] text-[#0057A8]">{formatCurrency(order.total)}</p>
                        </div>
                        <Link href="#" className="text-[13px] font-[600] text-[#0057A8] hover:underline px-4 py-2 border border-[#E5E7EB] rounded-[8px] hover:bg-gray-50 transition-colors">
                          View Details
                        </Link>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h1 className="text-[20px] font-[700] text-[#0F172A] mb-6">My Profile</h1>
              
              {!isEditingProfile ? (
                <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-[24px] shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h2 className="text-[16px] font-[600] text-[#0F172A]">Personal Information</h2>
                    <button 
                      onClick={() => {
                        setEditProfileData(profileData);
                        setIsEditingProfile(true);
                      }}
                      className="text-[13px] font-[600] text-[#0057A8] border border-[#E5E7EB] px-4 py-2 rounded-[8px] hover:bg-gray-50 transition-colors"
                    >
                      Edit Profile
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <p className="text-[13px] text-[#6B7280] mb-1">Full Name</p>
                      <p className="text-[15px] font-[500] text-[#0F172A]">{profileData.name}</p>
                    </div>
                    <div>
                      <p className="text-[13px] text-[#6B7280] mb-1">Email Address</p>
                      <p className="text-[15px] font-[500] text-[#0F172A]">{profileData.email}</p>
                    </div>
                    <div>
                      <p className="text-[13px] text-[#6B7280] mb-1">Phone Number</p>
                      <p className="text-[15px] font-[500] text-[#0F172A]">{profileData.phone}</p>
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
                      className="w-full h-[44px] rounded-[10px] border border-[#E5E7EB] px-4 outline-none focus:border-[#0057A8] text-[15px]" 
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
                      className="w-full h-[44px] rounded-[10px] border border-[#E5E7EB] px-4 outline-none focus:border-[#0057A8] text-[15px]" 
                      required 
                     />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                     <label className="text-[13px] font-[500] text-[#374151]">Phone Number</label>
                     <input 
                      type="tel" 
                      name="phone" 
                      value={editProfileData.phone} 
                      onChange={handleProfileChange} 
                      className="w-full h-[44px] rounded-[10px] border border-[#E5E7EB] px-4 outline-none focus:border-[#0057A8] text-[15px]" 
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
                      className="px-6 py-2.5 rounded-[10px] text-[15px] font-[600] text-white bg-[#0057A8] hover:bg-[#004a8f] transition-colors shadow-sm"
                     >
                       Save Changes
                     </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-[20px] font-[700] text-[#0F172A]">Saved Addresses</h1>
                <button className="text-[13px] font-[600] text-white bg-[#0057A8] px-4 py-2 rounded-[8px] hover:bg-[#004a8f] transition-colors shadow-sm">
                  Add New
                </button>
              </div>
              
              {addresses.length === 0 ? (
                <div className="bg-white border border-[#E5E7EB] rounded-[16px] flex flex-col items-center justify-center py-16 text-center shadow-sm">
                  <div className="text-[48px] mb-4">🏠</div>
                  <p className="text-[16px] font-[600] text-[#0F172A] mb-2">No addresses saved</p>
                  <p className="text-[14px] text-[#6B7280] px-4">Add an address to make your checkout experience faster.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map(addr => (
                    <div key={addr.id} className="bg-white border border-[#E5E7EB] rounded-[16px] p-[20px] shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-gray-100 text-gray-700 border border-gray-200 text-[11px] font-[700] px-2.5 py-1 rounded inline-block uppercase tracking-wider">
                            {addr.label}
                          </span>
                        </div>
                        <p className="text-[15px] font-[600] text-[#0F172A] mb-1">
                          {addr.fullName} <span className="text-gray-400 font-[400] text-[14px] ml-2">{addr.phone}</span>
                        </p>
                        <p className="text-[14px] text-[#6B7280] leading-relaxed mb-6">
                          {addr.street}<br/>
                          {addr.city}, {addr.state} {addr.pincode}
                        </p>
                      </div>
                      
                      <div className="flex gap-4 border-t border-[#E5E7EB] pt-4">
                        <button className="text-[13px] font-[600] text-[#0057A8] hover:underline">
                          Edit
                        </button>
                        <button 
                          onClick={() => setAddresses(prev => prev.filter(a => a.id !== addr.id))} 
                          className="text-[13px] font-[600] text-[#EF4444] hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
