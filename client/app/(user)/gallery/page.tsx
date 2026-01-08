import React from 'react';

const page = () => {
  const images = [
    { id: 1, src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3', title: 'Digital Strategy', size: 'col-span-2 row-span-2' },
    { id: 2, src: 'https://images.unsplash.com/photo-1552664730-d307ca884978', title: 'Workshop', size: 'col-span-1 row-span-1' },
    { id: 3, src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f', title: 'Teamwork', size: 'col-span-1 row-span-2' },
    { id: 4, src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0', title: 'Analysis', size: 'col-span-1 row-span-1' },
    { id: 5, src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984', title: 'Innovation', size: 'col-span-2 row-span-1' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 mt-10">
      <div className="mb-12">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Learn Together</h2>
        <div className="h-1 w-20 bg-sky-500 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[800px]">
        {images.map((img) => (
          <div 
            key={img.id} 
            className={`relative group overflow-hidden rounded-3xl bg-slate-200 transition-all duration-500 hover:shadow-2xl ${img.size}`}
          >
            {/* Image */}
            <img 
              src={img.src} 
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Glassmorphism Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
              <p className="text-sky-400 text-sm font-bold tracking-widest uppercase mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                Experience
              </p>
              <h3 className="text-white text-2xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                {img.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default page;