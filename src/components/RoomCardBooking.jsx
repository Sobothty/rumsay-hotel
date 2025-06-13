import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllRoomsType = ({ onBook, selectedPrices = [], selectedTypes = [] }) => {
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/room-types`
        );
        const result = await res.json();
        setRoomTypes(result.data || []);
      } catch (err) {
        console.error("Failed to fetch room types:", err);
      }
    };
    fetchRoomTypes();
  }, []);

  // Filter by selectedPrices and selectedTypes
  const filteredRooms = roomTypes
    .filter((room) =>
      selectedPrices.length === 0
        ? true
        : selectedPrices.some(
            (range) => room.price >= range.min && room.price <= range.max
          )
    )
    .filter((room) =>
      selectedTypes.length === 0 ? true : selectedTypes.includes(room.type)
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
      {filteredRooms.map((room) => (
        <div
          key={room.id}
          className="rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100 bg-white flex flex-col group"
        >
          <div className="relative">
            <img
              src={room.image_url || "src/assets/categories/category-room.jpg"}
              alt={room.type}
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute top-4 left-4 bg-gradient-to-r from-[#2a1a4a] to-[#4b2e83] text-white px-4 py-1 rounded-full text-xs font-semibold shadow">
              {room.type}
            </span>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-2xl font-extrabold text-[#2a1a4a] mb-2">
              {room.type}
            </h3>
            <p className="text-gray-600 text-base mb-4 line-clamp-2">
              {room.description}
            </p>
            <ul className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
              <li className="flex items-center gap-1">
                <span role="img" aria-label="guests">
                  👥
                </span>{" "}
                {room.capacity} Guests
              </li>
            </ul>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-2xl font-bold text-[#2a1a4a]">
                ${room.price}
                <span className="text-base font-medium text-gray-500">
                  /night
                </span>
              </span>
              <div className="flex gap-2">
                <Link
                  to={`/room-detail/${room.id}`}
                  className="px-4 py-2 rounded-full bg-white border border-primary text-primary font-semibold shadow hover:bg-primary hover:text-white transition"
                >
                  View Details
                </Link>
                <button
                  className="px-5 py-2 bg-gradient-to-r from-[#2a1a4a] to-[#4b2e83] text-white rounded-full text-base font-semibold shadow hover:scale-105 transition"
                  onClick={() => {
                    if (onBook) onBook(room);
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllRoomsType;
