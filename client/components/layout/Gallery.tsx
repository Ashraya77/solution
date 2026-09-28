export default function Gallery() {
    return (
        <>
            <div className="bg-soft-purple py-10 hidden md:block">
                <h1 className="text-3xl font-semibold text-foreground text-center mx-auto">Our Latest Gallery</h1>
                <p className="text-sm text-muted text-center mt-2 max-w-lg mx-auto">A visual collection of our most recent works - each piece crafted with intention, emotion, and style.</p>
                <div className="flex items-center gap-2 h-100 w-full max-w-7xl mt-10 mx-auto">
                    <div className="relative group grow transition-all w-56 rounded-lg overflow-hidden h-100 duration-500 hover:w-full">
                        <img className="h-full w-full object-cover object-center"
                            src="/pic1.jpg"
                            alt="image" />
                    </div>
                    <div className="relative group grow transition-all w-56 rounded-lg overflow-hidden h-100 duration-500 hover:w-full">
                        <img className="h-full w-full object-cover object-center"
                            src="/pic2.jpg"
                            alt="image" />
                    </div>
                    <div className="relative group grow transition-all w-56 rounded-lg overflow-hidden h-100 duration-500 hover:w-full">
                        <img className="h-full w-full object-cover object-center"
                            src="/pic3.jpg"
                            alt="image" />
                    </div>
                    <div className="relative group grow transition-all w-56 rounded-lg overflow-hidden h-100 duration-500 hover:w-full">
                        <img className="h-full w-full object-cover object-center"
                            src="/pic4.jpg"
                            alt="image" />
                    </div>
                    <div className="relative group grow transition-all w-56 rounded-lg overflow-hidden h-100 duration-500 hover:w-full">
                        <img className="h-full w-full object-cover object-center"
                            src="/pic5.jpg"
                            alt="image" />
                    </div>
                    <div className="relative group grow transition-all w-56 rounded-lg overflow-hidden h-100 duration-500 hover:w-full">
                        <img className="h-full w-full object-cover object-center"
                            src="/pic6.jpg"
                            alt="image" />
                    </div>
                    <div className="relative group grow transition-all w-56 rounded-lg overflow-hidden h-100 duration-500 hover:w-full">
                        <img className="h-full w-full object-cover object-center"
                            src="/pic7.jpg"
                            alt="image" />
                    </div>
                    <div className="relative group grow transition-all w-56 rounded-lg overflow-hidden h-100 duration-500 hover:w-full">
                        <img className="h-full w-full object-cover object-center"
                                src="/pic8.jpg"
                            alt="image" />
                    </div>
                            <div className="relative group grow transition-all w-56 rounded-lg overflow-hidden h-100 duration-500 hover:w-full">
                            <img className="h-full w-full object-cover object-center"
                                src="/pic9.jpg"
                                alt="image" />
                            </div>
                </div>
            </div>

        </>
    );
};
