// Example: GallerySection.jsx

const galleryImages = [
  {
    url: "https://cf.bstatic.com/static/img/theme-index/bg_swimming_pool/29b2514d81b1c1404b8d5aa2cc1945ebd4e68cdb.jpg",

    className: "col-span-2 row-span-2", // Large square
  },
  {
    url: "https://images.wsj.net/im-65599456?size=1.5",
    className: "col-span-1 row-span-2", // Tall
  },
  {
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b0/b8/60/suite-hotels.jpg?w=1200&h=-1&s=1",
    className: "col-span-1 row-span-1", // Small
  },
  {
    url: "https://www.hotelparadies.com/redakteure/_optimized_/480/3261682/hotel-das-paradies-adults-only-aussenpool.JPG",
    className: "col-span-1 row-span-1", // Small
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6a2WjVaHCLQ0LGLh32xg1mDeqUoWJq7sFSg&s",
    className: "col-span-1 row-span-1", // Small
  },
  {
    url: "https://amorgoshotel.com/wp-content/uploads/2014/12/Amorgos-Standard-Room2-e1464286437370.jpg",
    className: "col-span-1 row-span-1", // Small
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBzLXl5ljlmfr1mTyT650theoCq5dTCb0flQ&s",
    className: "col-span-1 row-span-1", // Small
  },
  {
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b0/b9/d0/cheap-hotels.jpg?w=1200&h=-1&s=1",
    className: "col-span-1 row-span-1", // Small
  },
 

  
];

export default function GallerySection() {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 auto-rows-[150px] grid-flow-dense">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden group ${img.className}`}
            >
              <img
                src={img.url}
                alt={img.label}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}