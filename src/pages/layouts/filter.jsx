import { useEffect, useState } from "react";

const priceRanges = [
  { label: "$0 - $50", min: 0, max: 50 },
  { label: "$51 - $100", min: 51, max: 100 },
  { label: "$101+", min: 101, max: Infinity },
];

// RoomFilter component
const RoomFilter = ({
  selectedTypes,
  setSelectedTypes,
  selectedPrice,
  setSelectedPrice,
  selectedAmenities,
  setSelectedAmenities,
  guests,
  setGuests,
}) => {
  // Fetch room types from API
  const [roomTypes, setRoomTypes] = useState([]);
  // Responsive: sidebar open state
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/room-types`
        );
        const result = await res.json();
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

  const selectedPrices = Array.isArray(selectedPrice) ? selectedPrice : [];
  const setSelectedPrices = setSelectedPrice;

  const toggleItem = (stateSetter, value) => {
    stateSetter((prev) => {
      const arr = Array.isArray(prev) ? prev : [];
      return arr.includes(value)
        ? arr.filter((item) => item !== value)
        : [...arr, value];
    });
  };

  // Responsive: handle close on overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        className="md:hidden fixed bottom-4 right-4 z-[9999] bg-[#2a1a4a] text-white p-2 rounded-full shadow-lg flex items-center justify-center"
        style={{ width: 36, height: 36, fontSize: 18 }}
        onClick={() => setOpen((prev) => !prev)} // <-- Toggle open/close
        aria-label={open ? "Close filters" : "Open filters"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M6 12h12M10 18h4"}
          />
        </svg>
      </button>

      {/* Overlay and Sidebar for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-[9999] flex md:hidden"
          onClick={handleOverlayClick}
        >
          <aside className="relative w-72 max-w-full bg-white rounded-2xl p-4 m-auto h-[90vh] max-h-screen overflow-y-auto shadow-lg animate-slide-in">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-[#2a1a4a] font-bold"
              onClick={() => setOpen(false)}
              aria-label="Close filters"
            >
              &times;
            </button>
            {/* Filter Content */}
            <FilterContent
              roomTypes={roomTypes}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              selectedPrices={selectedPrices}
              setSelectedPrices={setSelectedPrices}
              selectedAmenities={selectedAmenities}
              setSelectedAmenities={setSelectedAmenities}
              guests={guests}
              setGuests={setGuests}
              priceRanges={priceRanges}
            />
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 p-6 bg-white rounded-2xl flex-col items-start h-fit">
        <FilterContent
          roomTypes={roomTypes}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          selectedPrices={selectedPrices}
          setSelectedPrices={setSelectedPrices}
          selectedAmenities={selectedAmenities}
          setSelectedAmenities={setSelectedAmenities}
          guests={guests}
          setGuests={setGuests}
          priceRanges={priceRanges}
        />
      </aside>
    </>
  );
};

// Extracted filter content for reuse
function FilterContent({
  roomTypes,
  selectedTypes,
  setSelectedTypes,
  selectedPrices,
  setSelectedPrices,
  selectedAmenities,
  setSelectedAmenities,
  guests,
  setGuests,
  priceRanges,
}) {
  const toggleItem = (stateSetter, value) => {
    stateSetter((prev) => {
      const arr = Array.isArray(prev) ? prev : [];
      return arr.includes(value)
        ? arr.filter((item) => item !== value)
        : [...arr, value];
    });
  };

  return (
    <>
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
      {/* Clear Filters Button */}
      <button
        className="mt-6 w-full py-2 bg-[#2a1a4a] text-white rounded-lg font-semibold hover:bg-[#1d1335] transition disabled:opacity-50 text-sm"
        onClick={() => {
          setSelectedTypes([]);
          setSelectedPrices([]);
          setSelectedAmenities([]);
          setGuests(null);
        }}
        disabled={selectedTypes.length === 0 && selectedPrices.length === 0}
      >
        Clear All Filters
      </button>
    </>
  );
}

export default RoomFilter;
