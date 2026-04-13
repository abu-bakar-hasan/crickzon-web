'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on type
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (activeTab === 'signup' && !formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (activeTab === 'signup' && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (activeTab === 'signup' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      if (activeTab === 'login') {
        router.push('/account');
      } else {
        router.push('/');
      }
    }, 1500);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setErrors({});
    setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[440px] bg-white rounded-[20px] border border-[#E5E7EB] p-[40px] shadow-sm">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="text-[24px] font-[700] mb-8">
            <span className="text-[#0057A8]">Cricket</span>
            <span className="text-[#F5A623]">zon</span>
          </Link>

          <div className="flex w-full bg-gray-100 p-1 rounded-full h-[48px]">
            <button
              type="button"
              onClick={() => switchTab('login')}
              className={`flex-1 rounded-full text-[14px] font-medium transition-all duration-200 ${
                activeTab === 'login'
                  ? 'bg-[#0057A8] text-white shadow-sm'
                  : 'text-[#6B7280] hover:text-gray-900'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => switchTab('signup')}
              className={`flex-1 rounded-full text-[14px] font-medium transition-all duration-200 ${
                activeTab === 'signup'
                  ? 'bg-[#0057A8] text-white shadow-sm'
                  : 'text-[#6B7280] hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {activeTab === 'signup' && (
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
          )}

          <div className="flex flex-col gap-1.5">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className={`w-full h-[44px] px-4 rounded-[10px] border text-[15px] outline-none transition-colors placeholder:text-gray-400 ${
                errors.email ? 'border-red-500 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#0057A8]'
              }`}
            />
            {errors.email && <span className="text-red-500 text-[13px]">{errors.email}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className={`w-full h-[44px] pl-4 pr-11 rounded-[10px] border text-[15px] outline-none transition-colors placeholder:text-gray-400 ${
                  errors.password ? 'border-red-500 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#0057A8]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                )}
              </button>
            </div>
            {errors.password && <span className="text-red-500 text-[13px]">{errors.password}</span>}
          </div>

          {activeTab === 'signup' && (
            <div className="flex flex-col gap-1.5">
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  className={`w-full h-[44px] pl-4 pr-11 rounded-[10px] border text-[15px] outline-none transition-colors placeholder:text-gray-400 ${
                    errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#0057A8]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && <span className="text-red-500 text-[13px]">{errors.confirmPassword}</span>}
            </div>
          )}

          {activeTab === 'login' && (
            <div className="flex justify-end mt-1 mb-2">
              <Link href="#" className="text-[13px] text-[#0057A8] hover:underline">
                Forgot password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-[44px] rounded-[10px] bg-[#0057A8] text-white text-[15px] font-[600] mt-2 flex items-center justify-center hover:bg-[#004a8f] transition-colors disabled:opacity-80 disabled:cursor-wait"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              activeTab === 'login' ? 'Login' : 'Create Account'
            )}
          </button>
        </form>
      </div>

      <div className="mt-8">
        <Link href="/store" className="text-[13px] text-[#6B7280] hover:text-[#0057A8] transition-colors">
          Continue shopping without account
        </Link>
      </div>
    </div>
  );
}
