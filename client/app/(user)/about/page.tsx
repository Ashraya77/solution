// app/about/page.tsx

import { type Metadata } from 'next';

// 1. Define Metadata for SEO
export const metadata: Metadata = {
  title: 'About Our Company - NextCorp',
  description: 'Learn about our mission, vision, and the dedicated team driving our success.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
        
        {/* Header Section */}
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Our Story: Building the Future
          </h1>
          <p className="text-xl text-indigo-600">
            Dedicated to Innovation, Quality, and Our Community.
          </p>
        </header>

        {/* Mission Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-indigo-500 pb-2 mb-4">
            🚀 Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Our mission is simple: to empower individuals and businesses through technology. We strive to create intuitive, powerful, and accessible solutions that solve real-world problems and drive significant growth for our clients worldwide.
          </p>
        </section>

        {/* Vision Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-indigo-500 pb-2 mb-4">
            💡 Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            To be the leading global provider of integrated digital services, recognized for our commitment to excellence and our relentless pursuit of disruptive, sustainable innovation. We envision a world where technology enhances every aspect of life.
          </p>
        </section>

        {/* Core Values Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-indigo-500 pb-2 mb-4">
            🌟 Core Values
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <li className="p-4 bg-indigo-50 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-indigo-700">Integrity</h3>
              <p className="text-sm text-gray-600">Honesty and transparency in all our dealings.</p>
            </li>
            <li className="p-4 bg-indigo-50 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-indigo-700">Innovation</h3>
              <p className="text-sm text-gray-600">Always pushing boundaries and seeking new methods.</p>
            </li>
            <li className="p-4 bg-indigo-50 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-indigo-700">Customer Focus</h3>
              <p className="text-sm text-gray-600">Our success is measured by the value we create for you.</p>
            </li>
          </ul>
        </section>

        {/* Call to Action/Footer */}
        <footer className="text-center pt-8 border-t border-gray-200">
          <p className="text-lg text-gray-600">
            Want to join our journey? <span className="font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer">View Our Careers Page</span>
          </p>
        </footer>
      </div>
    </main>
  );
}