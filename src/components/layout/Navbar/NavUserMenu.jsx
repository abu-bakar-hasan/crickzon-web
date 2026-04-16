'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { HugeiconsIcon } from '@hugeicons/react';
import { UserIcon } from '@hugeicons/core-free-icons';

/**
 * User account button + dropdown menu in the Navbar.
 * Owns its own open/close state and click-outside handler.
 */
export default function NavUserMenu() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-label="My account"
        style={{
          display: 'flex',
          alignItems: 'center',
          color: '#374151',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          transition: 'color 0.15s ease',
        }}
        className="cz-icon-btn"
      >
        <HugeiconsIcon icon={UserIcon} size={22} color="currentColor" strokeWidth={1.8} />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 top-full mt-3 bg-white border border-[#E5E7EB] rounded-[12px] shadow-sm min-w-[160px] py-2 flex flex-col z-[100] text-left">
          {user ? (
            <>
              <div className="px-4 py-2 border-b border-[#E5E7EB] mb-1">
                <p className="text-[13px] text-[#0F172A] font-[600] truncate">Hi, {user.name}</p>
              </div>
              <Link
                href="/account"
                onClick={() => setDropdownOpen(false)}
                className="px-4 py-2 text-[14px] text-[#374151] hover:bg-gray-50 transition-colors font-[500] no-underline block"
              >
                My Account
              </Link>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
                className="px-4 py-2 text-[14px] text-[#EF4444] hover:bg-red-50 transition-colors font-[500] w-full text-left bg-transparent border-none cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setDropdownOpen(false)}
                className="px-4 py-2.5 text-[14px] text-[#0057A8] hover:bg-[#EBF3FF] transition-colors font-[600] no-underline block"
              >
                Login
              </Link>
              <Link
                href="/login"
                onClick={() => setDropdownOpen(false)}
                className="px-4 py-2.5 text-[14px] text-[#374151] hover:bg-gray-50 transition-colors font-[500] no-underline block"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
