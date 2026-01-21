"use client"
import React from 'react';
import { BookOpen, Rocket, Award, CheckCircle2, ArrowRight } from 'lucide-react';

// --- Data Structure ---
const COURSES = [
    {
        id: 1,
        title: "Basic Computer Skills",
        level: "Foundational (Level 01)",
        description: "The essential starting point. Master the foundational software (Office Suite), system maintenance, and digital communication skills necessary for everyday professional life.",
        icon: <BookOpen className="w-6 h-6" />,
        duration: "2 Months | Certification",
        features: ["Microsoft Office Mastery", "Professional Typing Speed", "Digital File Management", "Email & Internet Security"],
        imagePath: "/herosection.png",
    },
    {
        id: 2,
        title: "MERN Stack & React",
        level: "Advanced (Level 03)",
        description: "Become a Full-Stack expert. This intense program focuses on building real-world applications using MongoDB, Express, React, and Node.js.",
        icon: <Rocket className="w-6 h-6" />,
        duration: "4-6 Months | Portfolio Built",
        features: ["React Component Architecture", "API Design with Node.js", "MongoDB NoSQL Database", "Version Control (Git)"],
        imagePath: "/herosection.png",
    },
    {
        id: 3,
        title: "Computer Diploma Programs",
        level: "Intermediate (Level 02)",
        description: "Specialized, comprehensive training for specific career paths. Includes in-depth courses in Accounting (Tally) and Graphic Design.",
        icon: <Award className="w-6 h-6" />,
        duration: "6-12 Months | Diploma Awarded",
        features: ["Tally & Financial Accounting", "Professional Graphic Design", "Data Entry & Analysis", "Advanced Spreadsheets"],
        imagePath: "/herosection.png",
    },
];

export default function CoursePage() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            
            {/* 1. HEADER SECTION - Kept your original Sky Blue theme */}
            <header className="bg-sky-600 pt-24 pb-20 shadow-xl relative overflow-hidden">
                {/* Subtle decorative circle to add depth to the flat blue */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-sky-500 rounded-full opacity-50 blur-3xl" />
                
                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <p className="text-yellow-400 font-bold tracking-widest uppercase mb-3">
                        Course Catalog | Solution Computer House
                    </p>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
                        Master the Skills of Tomorrow.
                    </h1>
                    <p className="text-sky-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Explore our highly specialized programs—from foundational literacy to advanced development—all taught locally in Hemja, Pokhara.
                    </p>
                </div>
            </header>

            {/* 2. COURSE SHOWCASE */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                {COURSES.map((course, index) => (
                    <div 
                        key={course.id} 
                        className={`flex flex-col lg:flex-row items-center gap-12 py-16 border-b border-gray-200 last:border-0 ${
                            index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
                        }`}
                    >
                        {/* Image Section */}
                        <div className="w-full lg:w-1/2 group">
                            <div className="relative p-4 bg-white rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                                <div className="aspect-video relative rounded-lg overflow-hidden bg-sky-100">
                                    <img
                                        src={course.imagePath}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Duration Badge overlay */}
                                    <div className="absolute bottom-4 left-4 bg-sky-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                                        {course.duration}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Text Section */}
                        <div className="w-full lg:w-1/2 space-y-6">
                            <div>
                                <span className="text-yellow-600 font-bold tracking-tighter uppercase text-sm">
                                    {course.level}
                                </span>
                                <h2 className="text-4xl font-black text-gray-900 mt-1">
                                    {course.title}
                                </h2>
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed">
                                {course.description}
                            </p>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {course.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-gray-700">
                                        <CheckCircle2 className="w-5 h-5 text-sky-600 mr-2 shrink-0" />
                                        <span className="font-medium text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-4">
                                <a
                                    href="/enroll"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95"
                                >
                                    Inquire About This Course
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* 3. FOOTER ADDRESS */}
            <footer className="bg-white py-12 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-gray-500 font-medium">
                        Pokhara-25, Hemja, Gandaki Province, Nepal
                    </p>
                </div>
            </footer>
        </div>
    );
}