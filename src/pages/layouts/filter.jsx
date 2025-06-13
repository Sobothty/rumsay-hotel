import { useEffect, useState } from "react";

const priceRanges = [
  { label: "$0 - $50", min: 0, max: 50 },
  { label: "$51 - $100", min: 51, max: 100 },
  { label: "$101+", min: 101, max: Infinity },
];
const amenitiesList = [
  "Free Wi-Fi",
  "Air Conditioning",
  "Bathtub",
  "Balcony",
  "Breakfast Included",
];
const guestOptions = [1, 2, 3, 4, 5];

// RoomFilter component
const RoomFilter = ({
  selectedTypes,
  setSelectedTypes,
  selectedPrice, // now should be selectedPrices (array)
  setSelectedPrice, // now should be setSelectedPrices
  selectedAmenities,
  setSelectedAmenities,
  guests,
  setGuests,
}) => {
  // Fetch room types from API
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/room-types`
        );
        const result = await res.json();
        // Extract unique types from API data
        const types = Array.from(
          new Set((result.data || []).map((r) => r.type))
        );
        setRoomTypes(types);
      } catch (err) {
        setRoomTypes([]);
      }
    };
    fetchRoomTypes();
  }, []);

  // Ensure selectedPrices is always an array
  const selectedPrices = Array.isArray(selectedPrice) ? selectedPrice : [];

  const setSelectedPrices = setSelectedPrice;

  const toggleItem = (stateSetter, value) => {
    stateSetter((prev) => {
      // Ensure prev is always an array
      const arr = Array.isArray(prev) ? prev : [];
      return arr.includes(value)
        ? arr.filter((item) => item !== value)
        : [...arr, value];
    });
  };

  return (
    <aside className="w-72 p-6 bg-white rounded-2xl flex flex-col items-start h-fit">
      <h2 className="text-2xl font-extrabold mb-6 text-[#2a1a4a]">
        Filter Rooms
      </h2>
      {/* Room Types */}
      <div className="mb-6 w-full">
        <h3 className="text-lg font-semibold mb-3">Room Type</h3>
        {roomTypes.length === 0 ? (
          <div className="text-gray-400 text-sm">Loading...</div>
        ) : (
          roomTypes.map((type) => (
            <label key={type} className="block text-sm mb-2 cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 accent-[#2a1a4a]"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleItem(setSelectedTypes, type)}
              />
              {type}
            </label>
          ))
        )}
      </div>
      {/* Price Range */}
      <div className="mb-6 w-full">
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        {priceRanges.map((range, i) => (
          <label key={i} className="block text-sm mb-2 cursor-pointer">
            <input
              type="checkbox"
              className="mr-2 accent-[#2a1a4a]"
              checked={selectedPrices.some(
                (r) => r.min === range.min && r.max === range.max
              )}
              onChange={() => toggleItem(setSelectedPrices, range)}
            />
            {range.label}
          </label>
        ))}
      </div>
      {/* Amenities */}
      <div className="mb-6 w-full">
        <h3 className="text-lg font-semibold mb-3">Amenities</h3>
        {amenitiesList.map((item) => (
          <label key={item} className="block text-sm mb-2 cursor-pointer">
            <input
              type="checkbox"
              className="mr-2 accent-[#2a1a4a]"
              checked={selectedAmenities.includes(item)}
              onChange={() => toggleItem(setSelectedAmenities, item)}
            />
            {item}
          </label>
        ))}
      </div>
      {/* Number of Guests */}
      <div className="mb-6 w-full">
        <h3 className="text-lg font-semibold mb-3">Guests</h3>
        <select
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
          value={guests || ""}
          onChange={(e) => setGuests(Number(e.target.value))}
        >
          <option value="">Select guests</option>
          {guestOptions.map((num) => (
            <option key={num} value={num}>
              {num} Guest{num > 1 && "s"}
            </option>
          ))}
        </select>
      </div>
      {/* Clear Filters Button */}
      <button
        className="mt-6 w-full py-2 bg-[#2a1a4a] text-white rounded-lg font-semibold hover:bg-[#1d1335] transition disabled:opacity-50 text-sm"
        onClick={() => {
          setSelectedTypes([]);
          setSelectedPrice(null);
          setSelectedAmenities([]);
          setGuests(null);
        }}
        disabled={
          selectedTypes.length === 0 &&
          !selectedPrice &&
          selectedAmenities.length === 0 &&
          !guests
        }
      >
        Clear All Filters
      </button>
    </aside>
  );
};

export default RoomFilter;
