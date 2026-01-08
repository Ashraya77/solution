import React from 'react'

const Enroll = () => {
    const primaryBg = "bg-sky-600";
    const accentColor = "text-yellow-400";
    const accentBg = "bg-yellow-400";


    return (
        <div className={`text-center py-16 ${primaryBg} bg-opacity-95 shadow-2xl`}>
            <h2 className="text-4xl font-extrabold text-white mb-4">
                Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-sky-100 mb-8">
                Your enrollment begins on our contact page. Secure your spot today!
            </p>

            {/* Main "Enroll Now" Button */}
            <a
                href="/contact"
                className={`inline-block px-12 py-5 text-xl font-bold rounded-full shadow-2xl text-gray-900 ${accentBg} hover:bg-yellow-500 transition duration-300 transform hover:scale-[1.08]`}
            >
                Enroll Now
            </a>
        </div>
    )
}

export default Enroll