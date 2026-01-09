"use client"
import React from 'react';

// --- Solution Computer House Details ---
const ORGANIZATION_INFO = {
    name: "Solution Computer House",
    address: "Pokhara-25, Hemja, Gandaki Province, Nepal",
};
// -------------------------------------


export default function page() {

    // Defined Tailwind Colors
    const primaryColor = "text-sky-600";
    const primaryBg = "bg-sky-600";
    const accentColor = "text-yellow-400";
    const accentBg = "bg-yellow-400";
    const lightBg = "bg-gray-50";

    // --- Course Data for the Showcase Section ---
    const COURSES = [
        {
            id: 1,
            title: "Basic Computer Skills",
            level: "Foundational (Level 01)",
            description: "The essential starting point. Master the foundational software (Office Suite), system maintenance, and digital communication skills necessary for everyday professional life. Perfect for beginners and those seeking certification.",
            icon: "📚",
            duration: "2 Months | Certification Available",
            features: ["Microsoft Office Mastery", "Professional Typing Speed", "Digital File Management", "Email & Internet Security"],
            // Updated to a placeholder image path
            imagePath: "/herosection.png",
            alignment: "right"
        },
        {
            id: 2,
            title: "MERN Stack & React Development",
            level: "Advanced (Level 03)",
            description: "Become a Full-Stack expert. This intense program focuses on building real-world applications using MongoDB, Express, React, and Node.js. Designed to turn ambitious students into job-ready web developers.",
            icon: "🚀",
            duration: "4-6 Months | Project Portfolio Built",
            features: ["React Component Architecture", "API Design with Node.js", "MongoDB NoSQL Database", "Version Control (Git)"],
            // Updated to a placeholder image path
            imagePath: "/herosection.png",
            alignment: "left"
        },
        {
            id: 3,
            title: "Computer Diploma Programs",
            level: "Intermediate (Level 02)",
            description: "Specialized, comprehensive training for specific career paths. Includes in-depth courses in Accounting (Tally), Graphic Design principles (Adobe Suite), and Advanced Data Management.",
            icon: "📜",
            duration: "6-12 Months | Diploma Awarded",
            features: ["Tally & Financial Accounting", "Professional Graphic Design", "Data Entry & Analysis", "Advanced Spreadsheet Automation"],
            // Using the path you provided
            imagePath: "/herosection.png",
            alignment: "right"
        },
    ];
    type Course = {
        id: number;
        title: string;
        level: string;
        description: string;
        icon: string;
        duration: string;
        features: string[];
        imagePath: string;
        alignment: string;
    };

    interface CourseBlockProps {
        course: Course;
        index: number;
    }
    const CourseBlock = ({ course, index }: CourseBlockProps) => {
        const isLeft = course.alignment === 'left';

        return (
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 px-6 lg:px-0 border-b border-gray-200 ${isLeft ? 'lg:pr-12' : 'lg:pl-12'}`}>

                {/* Image Section */}
                <div className={`p-6 rounded-xl shadow-2xl ${primaryBg} ${isLeft ? 'lg:order-1' : 'lg:order-2'} transition duration-500 hover:scale-[1.01] hover:shadow-sky-500/50`}>
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                       
                        <img
                            src={course.imagePath}
                            alt={`Visual representation of the ${course.title} course`}
                            className="w-full h-full object-cover transition duration-500 group-hover:opacity-90"
                            loading="lazy"
                            // Added a background color for when the image is loading/missing, matching the primary color
                            style={{ backgroundColor: '#2563EB' }}
                        />
                    </div>
                </div>

                {/* Content Section (Left/Right depending on alignment) */}
                <div className={`${isLeft ? 'lg:order-2' : 'lg:order-1'}`}>

                    <p className={`text-sm font-semibold tracking-widest uppercase mb-2 ${accentColor}`}>
                        {course.level}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                        {course.title}
                    </h2>

                    <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                        {course.description}
                    </p>

                    <div className="mb-6">
                        <span className={`px-4 py-1 text-sm font-semibold rounded-full bg-sky-600 text-white-900`}>
                            {course.duration}
                        </span>
                    </div>

                    <ul className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8">
                        {course.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-gray-700 font-medium">
                                <span className={`mr-2 ${primaryColor} shrink-0`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    {/* Enroll CTA */}
                    <a
                        href="/contact"
                        className={`inline-block px-8 py-3 text-lg font-bold rounded-full shadow-lg ${accentBg} text-black transition duration-300 hover:bg-yellow-500 transform hover:translate-y-0.5`}
                    >
                        Inquire About This Course
                    </a>
                </div>
            </div>
        );
    };

    return (
        <div className={`min-h-screen font-sans ${lightBg}`}>

            {/* 1. HEADER SECTION: Dynamic, full-bleed intro */}
            <header className={`${primaryBg} pt-24 pb-20 shadow-2xl`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className={`text-xl font-semibold ${accentColor} tracking-widest uppercase`}>
                        Course Catalog | Solution Computer House
                    </p>
                    <h1 className="mt-2 text-5xl md:text-7xl font-extrabold text-white">
                        Master the Skills of Tomorrow.
                    </h1>
                    <p className="mt-4 text-lg text-sky-100 max-w-3xl mx-auto">
                        Explore our highly specialized programs—from foundational literacy to advanced MERN stack development—all taught locally in Hemja, Pokhara.
                    </p>
                </div>
            </header>

            {/* 2. COURSE SHOWCASE: Dynamic Asymmetrical Grid */}
            <section className="py-10 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {COURSES.map((course, index) => (
                        <CourseBlock key={course.id} course={course} index={index} />
                    ))}
                </div>
            </section>


        </div>
    );
}