"use client"
import React from 'react';

// --- Solution Computer House Details ---
const ORGANIZATION_INFO = {
    name: "Solution Computer House",
    address: "Pokhara-25, Hemja, Gandaki Province, Nepal", 
    phone: "+977 (XX) XXX-XXXX", 
    email: "info@solutioncomputerhouse.com",
    mapLink: "https://maps.app.goo.gl/YourActualMapLinkHere", 
};
// -------------------------------------


export default function page() {
    
    // The defined color palette is dark blue, crisp white, and sky blue accents.
    const darkBg = "bg-gray-900"; // Dark section background
    const accentBlue = "text-sky-400"; // Light blue for accent text/icons
    const primaryBlue = "bg-blue-600"; // Main button and highlight color
    const textLight = "text-gray-100"; // Light text on dark backgrounds
    
    // Component for reusable feature cards
    const FeaturePillar = ({ icon, title, description }) => (
        <div className="p-8 bg-white/5 rounded-2xl border border-sky-600/20 backdrop-blur-sm transition duration-300 hover:border-sky-400/50 hover:shadow-xl">
            <span className={`text-5xl mb-4 inline-block ${accentBlue}`}>{icon}</span>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
    );

    return (
        <div className="min-h-screen font-sans bg-white">
            
            {/* 1. HERO SECTION: High-Contrast Introduction */}
            <header className={`py-24 md:py-32 ${darkBg} text-white`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:w-3/4">
                        <p className={`text-xl font-medium ${accentBlue} tracking-wider uppercase mb-4`}>
                            About Solution Computer House
                        </p>
                        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-snug">
                            Empowering the Future of Tech in <span className="text-blue-500">Pokhara.</span>
                        </h1>
                        <p className="mt-8 text-2xl text-gray-400 max-w-4xl">
                            We are the premier institution for digital education in Hemja, Pokhara, committed to transforming local talent into global professionals through specialized training.
                        </p>
                        <a 
                            href="/contact" 
                            className={`mt-10 inline-block px-10 py-4 text-lg font-bold rounded-full shadow-lg ${primaryBlue} text-white transition duration-300 hover:bg-blue-700 transform hover:scale-[1.03]`}
                        >
                            Explore Our Courses →
                        </a>
                    </div>
                </div>
            </header>
            
            {/* 2. CORE NARRATIVE SECTION: White Background for Readability */}
            <section className="py-20 sm:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        
                        {/* Mission & Philosophy */}
                        <div>
                            <h2 className={`text-base font-semibold ${accentBlue} uppercase mb-3`}>Our Philosophy</h2>
                            <h3 className="text-4xl font-extrabold text-gray-900 mb-6">
                                Bridging Local Ambition with Global Standards.
                            </h3>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                Our mission is simple: to make world-class computer education accessible to every student in Nepal. We achieve this by focusing on **hands-on training**, maintaining a curriculum that matches industry needs, and fostering a supportive, localized learning environment.
                            </p>
                            
                            <blockquote className="border-l-4 border-sky-500 pl-4 py-2 italic text-gray-600 font-medium text-xl">
                                "The solution to tomorrow's challenges lies in today's education."
                            </blockquote>
                        </div>
                        
                        {/* Location Details (Structured Card) */}
                        <div className={`p-8 rounded-xl bg-gray-50 border border-gray-200 shadow-md sticky top-8`}>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="text-3xl mr-3 text-red-500">📍</span>Find Us in Pokhara
                            </h3>
                            <p className="text-lg text-gray-700 mb-4">
                                Solution Computer House is deeply rooted in the heart of the Gandaki Province, dedicated to serving our local community.
                            </p>
                            
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <span className="text-blue-500 w-6 h-6 mr-3">🏠</span>
                                    <p className="text-gray-800 font-semibold">Address:</p>
                                </div>
                                <p className="ml-9 text-gray-600">{ORGANIZATION_INFO.address}</p>
                            </div>
                            
                            <a 
                                href={ORGANIZATION_INFO.mapLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`mt-6 inline-flex items-center text-base font-semibold ${primaryBlue} text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300`}
                            >
                                View on Map
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. PILLARS SECTION: Dark background for visual separation and feature emphasis */}
            <section className={`py-20 sm:py-28 ${darkBg}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className={`text-4xl md:text-5xl font-extrabold ${textLight} mb-4`}>
                        Our Three Pillars of Success
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-16">
                        We deliver excellence through a model built on quality, relevance, and community focus.
                    </p>
                    
                    {/* Feature Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeaturePillar 
                            icon="👨‍🏫"
                            title="Expert Instructors"
                            description="Learn from certified industry professionals who bring real-world case studies and expertise into every session."
                        />
                        <FeaturePillar 
                            icon="💻"
                            title="Practical Skills Focus"
                            description="Our courses are project-based, ensuring you graduate with tangible, job-ready skills and a portfolio."
                        />
                        <FeaturePillar 
                            icon="🌐"
                            title="Community Growth"
                            description="We are dedicated to fostering a strong tech ecosystem in Pokhara, connecting students with local career opportunities."
                        />
                    </div>
                </div>
            </section>
            
            {/* 4. FINAL CTA: Simple, Bold Footer link */}
            <div className="bg-sky-50 py-12 text-center border-t border-sky-100">
                <p className="text-xl text-gray-800 font-semibold mb-4">
                    Ready to transform your career?
                </p>
                <a 
                    href="/contact" 
                    className={`inline-block px-10 py-4 text-lg font-bold rounded-full shadow-lg ${primaryBlue} text-white transition duration-300 hover:bg-blue-700 transform hover:scale-[1.05]`}
                >
                    Enroll Now or Ask a Question
                </a>
            </div>
            
        </div>
    );
}