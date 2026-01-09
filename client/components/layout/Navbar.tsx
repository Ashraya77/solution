"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { navLinks } from '@/constants/navLinks';
import { useState } from 'react';

export default function Navbar() {
  const pathname: string = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed z-10 left-0 right-0 top-2 bg-white/20 border-b border-gray-300 backdrop-blur-md p-4 md:mx-80 rounded-3xl">
      <div className="px-4 md:px-10 flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold hover:text-gray-300 transition duration-300">
          Solution
        </Link>
        
        {/* Desktop navbar */}
        <div className="hidden md:flex space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-bold px-5 py-2 text-md transition duration-300 ${pathname === link.href ? 'text-yellow-300' : 'text-black hover:text-yellow-300'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* Hamburger button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-yellow-300 focus:outline-none"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile navlinks */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`block px-3 py-2 rounded-md ${pathname === link.href ? 'bg-yellow-300 text-black' : 'text-gray-700 hover:bg-blue-50'}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}