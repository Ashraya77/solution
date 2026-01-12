"use client";

import React from 'react';
import { motion } from "motion/react";
import Image from 'next/image';

export default function HeroSection() {
    const heroImagePath = '/herosection1.png';

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-sky-600 z-0">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute md:left-50 md:top-20 z-0 md:w-400 md:h-full  ">
                <Image
                    src={heroImagePath}
                    alt="Hero Background"
                    fill
                    priority
                    className=" object-cover " 
                />
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">

                <div className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tighter leading-tight">
                            <div className="flex items-center justify-center lg:justify-start gap-4 mb-2">

                                <span className="text-white">Your Next Step:</span>
                            </div>
                            <span className="block text-yellow-400">Certified Computer Training</span>
                        </h1>
                    </motion.div>

                    <p className="mt-6 text-xl text-gray-200 max-w-xl mx-auto lg:mx-0 font-light">
                        Enroll in <span className='text-yellow-400'> Solution Computer House</span> , basic to diploma courses. Master essential IT skills, development fundamentals, and data management.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mt-12 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                        <a href="#courses" className="px-10 py-3.5 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition shadow-xl">
                            View All Courses
                        </a>
                        <a href="contact" className="px-10 py-3.5 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition">
                            Get A Free Consultation
                        </a>
                    </motion.div>
                </div>

                <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
                    {/* You can place another foreground image here if needed */}
                </div>
            </div>
        </section>
    );
}