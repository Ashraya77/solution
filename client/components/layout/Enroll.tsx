import React from 'react'

const Enroll = () => {
    return (
        <div className="text-center py-16 bg-primary shadow-2xl">
            <h2 className="text-4xl font-extrabold text-background mb-4">
                Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-soft-purple mb-8">
                Your enrollment begins on our contact page. Secure your spot today!
            </p>

            <a
                href="/enroll"
                className="inline-block px-12 py-5 text-xl font-bold rounded-full shadow-2xl text-foreground bg-accent hover:bg-accent-soft transition duration-300 transform hover:scale-[1.08]"
            >
                Enroll Now
            </a>
        </div>
    )
}

export default Enroll
