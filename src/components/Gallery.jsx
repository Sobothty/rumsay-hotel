import React from 'react'


const images = [
  "/src/assets/categories/category-room.jpg",
  "/src/assets/categories/category-room.jpg",
  "/src/assets/categories/category-room.jpg",
  "/src/assets/categories/category-room.jpg",
  "/src/assets/categories/category-room.jpg",
  "/src/assets/categories/category-room.jpg",
  "/src/assets/categories/category-room.jpg",
  "/src/assets/categories/category-room.jpg",
];

const Gallery = () => {
  return (
     <div className="w-full bg-white py-16">
      <h2 className="text-4xl font-bold text-center mb-10 text-primary">Gallery</h2>
      
      <div className="columns-2 sm:columns-3 md:columns-4 gap-0 px-4">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gallery ${index + 1}`}
            className="mb-4 w-full object-cover hover:opacity-90 transition duration-300 rounded-none"
          />
        ))}
      </div>
    </div>
  )
}

export default Gallery
