"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { navLinks } from '@/constants/navLinks';
import { useEffect, useState } from 'react';



export default function Navbar() {
    const pathname: string = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(()=>{
      const handleScroll = ()=>{
        setScrolled(window.scrollY>50)
      }
    }, []);

  return (
    <nav className="fixed z-10 left-0 right-0 top-2  bg-white/20 border-b border-gray-300 backdrop-blur-md p-4 mx-80  rounded-4xl  ">
      <div className=" px-10 flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold hover:text-gray-300 transition duration-300">
          Solution
        </Link>

        <div className="space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-bold px-5 py-2 text-md transition duration-300 ${pathname == link.href ? 'text-yellow-300' : 'text-black hover:text-yellow-300'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}