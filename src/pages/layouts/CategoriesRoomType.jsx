import { useState, useEffect } from "react";
import CategoriesRoomTypeCard from "../../components/CategoriesCard";

const RoomType = () => {
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/room-types`
        );
        const result = await res.json();
        setRoomTypes(result.data || []);
        console.log("Fetched room types:", result.data || []);
      } catch (err) {
        console.error("Failed to fetch room types:", err);
      }
    };
    fetchRoomTypes();
  }, []);

  return (
    <section className="bg-white py-[50px]">
      <h2 className="text-3xl pt-2 font-semibold text-gray-800 mb-[60px]">
        Explore Our Hotel
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mx-auto">
        {roomTypes.map((type) => (
          <CategoriesRoomTypeCard
            key={type.id}
            id={type.id}
            imageUrl={type.image_url}
            type={type.type}
          />
        ))}
      </div>
    </section>
  );
};

export default RoomType;
