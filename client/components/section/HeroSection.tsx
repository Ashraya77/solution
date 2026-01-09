import React from 'react';

export default function HeroSection() {
    const heroImagePath = '/herosection.png';

    return (
        <section
            className="py-14 md:py-36 min-h-screen flex items-center relative overflow-hidden z-0 "
            style={{
                backgroundImage: `url(${heroImagePath})`,
                backgroundSize: 'cover',        
                backgroundPosition: '60% 30%',  
                backgroundAttachment: '',  
            }}
        >   
            <div className="absolute inset-0 "></div> 

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">

                <div className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tighter leading-tight">
                        <span className="block text-white">Your Next Step:</span>
                        <span className="block text-yellow-400 mt-2">Certified Computer Training</span>
                    </h1>

                    <p className="mt-6 text-xl text-gray-200 max-w-xl mx-auto lg:mx-0 font-light">
                        Enroll in **Solution Computer House**'s basic to diploma courses. Master essential IT skills, development fundamentals, and data management to secure a high-demand career.
                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                        <a
                            href="#courses"
                            className="inline-flex items-center justify-center px-10 py-3.5 border border-transparent text-lg font-semibold rounded-full shadow-xl text-gray-900 bg-yellow-400 hover:bg-yellow-300 transition duration-300 transform hover:translate-y-0.5"
                        >
                            View All Courses
                        </a>

                        <a
                            href="contact"
                            className="inline-flex items-center justify-center px-10 py-3.5 text-lg font-semibold rounded-full text-white border-2 border-white hover:bg-white hover:text-gray-900 transition duration-300"
                        >
                            Get A Free Consultation
                        </a>
                    </div>

                    
                </div>

                <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
                </div>

            </div>

        </section>
    );
}