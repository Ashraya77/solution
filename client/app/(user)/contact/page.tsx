"use client"
import React from 'react';
// Assuming you have a component for handling the HTML head (like React Helmet or a custom solution)
// import HeadMeta from './HeadMeta'; 

// Organization Details
const ORGANIZATION_INFO = {
    name: "Solution Computer House",
    address: "123 Technology Ave, Tech City, TX 78701",
    phone: "+1 (555) 123-4567",
    email: "info@solutioncomputerhouse.com",
    mapLink: "https://maps.app.goo.gl/example", // Replace with actual Google Maps link
};

// --- Metadata for SEO and Social Sharing ---
const ContactMetadata = {
    title: "Contact Us | Solution Computer House - Enrollment & Inquiries",
    description: "Ready to enroll in a computer course? Contact Solution Computer House for inquiries, course details, and scheduling a free consultation. Your path to certification starts here.",
    keywords: "computer courses contact, IT diploma inquiry, basic computer training support, Solution Computer House email",
    ogType: "website",
    ogUrl: "https://www.yourdomain.com/contact", // Replace with actual URL
};
// -------------------------------------------


export default function page() {
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., API call)
        alert('Message Sent! We will get back to you shortly.');
    };

    return (
        <>
            {/* If using a Head Management Library like React Helmet/React Head */}
            {/* <HeadMeta data={ContactMetadata} /> */}
            
            {/* 1. New Header Section for the Full-Width/Full-Top Background */}
            <header className="bg-backg pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-base font-semibold text-yellow-300 tracking-wide uppercase">Get In Touch</h2>
                    {/* Text changed to dark color for contrast against yellow-100 */}
                    <p className="mt-1 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
                        Start Your Certification Journey
                    </p>
                    <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
                        Whether you have questions about our diploma programs or basic courses, our team is here to help.
                    </p>
                </div>
            </header>
            
            {/* 2. Main Content Section (Adjusted padding to connect to header) */}
            <section className="bg-white py-16 sm:py-24 pt-8"> {/* Reduced top padding (pt-8) */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Original Header/Introduction section is REMOVED from here */}
                    
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-16">
                        
                        {/* 1. Contact Form (Tailwind classes unchanged) */}
                        <div className="lg:col-span-2">
                            <h3 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-yellow-400 pb-2 inline-block">
                                Send Us a Message
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:ring-yellow-500 text-black focus:border-yellow-500 transition duration-150"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        className="mt-1 block w-full border text-black border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                                    />
                                </div>
                                
                                {/* Subject/Course Interest */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Course Interest</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:ring-yellow-500 text-black focus:border-yellow-500 transition duration-150 bg-white"
                                    >
                                        <option value="">-- Select a Course or Inquiry Type --</option>
                                        <option value="diploma">Diploma Courses (Advanced)</option>
                                        <option value="basic">Basic Computer Skills</option>
                                        <option value="enrollment">Enrollment Process</option>
                                        <option value="general">General Inquiry</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        required
                                        className="text-black mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                                    ></textarea>
                                </div>

                                {/* Submit Button (Yellow Primary CTA) */}
                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-3 px-8 border border-transparent text-lg font-medium rounded-full shadow-lg text-gray-900 bg-yellow-400 hover:bg-yellow-500 transition duration-300 w-full sm:w-auto"
                                    >
                                        Submit Inquiry
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        {/* 2. Contact Information Details (Unchanged) */}
                        <div className="space-y-10">
                            
                            {/* Phone */}
                            <div className="flex items-start">
                                <span className="shrink-0 p-3 rounded-full bg-yellow-100 text-yellow-600">
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </span>
                                <div className="ml-4">
                                    <h4 className="text-lg font-medium text-gray-900">Call Us</h4>
                                    <p className="mt-1 text-gray-600">{ORGANIZATION_INFO.phone}</p>
                                    <a href={`tel:${ORGANIZATION_INFO.phone}`} className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">Click to Call</a>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start">
                                <span className="shrink-0 p-3 rounded-full bg-yellow-100 text-yellow-600">
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </span>
                                <div className="ml-4">
                                    <h4 className="text-lg font-medium text-gray-900">Email Us</h4>
                                    <p className="mt-1 text-gray-600">{ORGANIZATION_INFO.email}</p>
                                    <a href={`mailto:${ORGANIZATION_INFO.email}`} className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">Send an Email</a>
                                </div>
                            </div>
                            
                            {/* Address/Location */}
                            <div className="flex items-start">
                                <span className="shrink-0 p-3 rounded-full bg-yellow-100 text-yellow-600">
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </span>
                                <div className="ml-4">
                                    <h4 className="text-lg font-medium text-gray-900">Visit Our Campus</h4>
                                    <p className="mt-1 text-gray-600">{ORGANIZATION_INFO.address}</p>
                                    <a href={ORGANIZATION_INFO.mapLink} target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">Get Directions</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

// NOTE: You would typically export the Metadata object to use in your main Layout/Head component.
export { ContactMetadata };