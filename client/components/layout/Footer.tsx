import React from 'react';
import { Cpu, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-slate-500 bg-white pt-16">
            {/* Background Decorative Element */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                
                {/* Brand Column */}
                <div className="sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="bg-sky-600 p-2 rounded-lg">
                            <Cpu className="text-white" size={24} />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
                            Solution<span className="text-sky-600">House</span>
                        </span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-500 mb-6">
                        Your premier destination for high-performance computing, 
                        expert hardware solutions, and dedicated technical support. 
                        Building the future, one byte at a time.
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <MapPin size={16} className="text-sky-600" />
                            <span>123 Tech Avenue, Computer Market</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone size={16} className="text-sky-600" />
                            <span>+1 (555) 000-TECH</span>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col">
                    <h2 className="font-bold mb-6 text-slate-900 uppercase tracking-widest text-xs">Services</h2>
                    <nav className="flex flex-col space-y-4">
                        <a className="hover:text-sky-600 transition-colors" href="#">Custom PC Builds</a>
                        <a className="hover:text-sky-600 transition-colors" href="#">Laptop Repair</a>
                        <a className="hover:text-sky-600 transition-colors" href="#">Networking</a>
                        <a className="hover:text-sky-600 transition-colors" href="#">Enterprise Solutions</a>
                    </nav>
                </div>

                {/* Support Links */}
                <div className="flex flex-col">
                    <h2 className="font-bold mb-6 text-slate-900 uppercase tracking-widest text-xs">Support</h2>
                    <nav className="flex flex-col space-y-4">
                        <a className="hover:text-sky-600 transition-colors" href="#">Track Service</a>
                        <a className="hover:text-sky-600 transition-colors" href="#">Warranty Policy</a>
                        <a className="hover:text-sky-600 transition-colors" href="#">Consultation</a>
                        <a className="hover:text-sky-600 transition-colors" href="#">Contact Us</a>
                    </nav>
                </div>

                {/* Newsletter */}
                <div>
                    <h2 className="font-bold mb-6 text-slate-900 uppercase tracking-widest text-xs">Newsletter</h2>
                    <p className="mb-6">Get technical updates and exclusive hardware deals.</p>
                    <div className="relative group">
                        <input 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pr-12 outline-none focus:border-sky-500 transition-all" 
                            type="email" 
                            placeholder="Email address" 
                        />
                        <button className="absolute right-2 top-1.5 bg-slate-900 hover:bg-sky-600 text-white p-2 rounded-lg transition-colors">
                            <Mail size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-t border-slate-100 mt-4">
                <p className="text-gray-400 font-medium">
                    © {currentYear} <span className="text-slate-900">Solution Computer House.</span> All Rights Reserved.
                </p>
                <div className="flex items-center gap-8 font-semibold text-slate-400">
                    <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
                    <a href="#" className="hover:text-slate-900 transition-colors">Sitemap</a>
                </div>
            </div>
        </footer>
    );
}