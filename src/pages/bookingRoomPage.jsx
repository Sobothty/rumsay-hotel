import { useState } from "react";
import AllRoomsType from "../components/RoomCardBooking";
import RoomFilter from "./layouts/filter";

const BookingRoom = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]); // ensure array
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [guests, setGuests] = useState(null);

  return (
    <>
      <main className="flex m-auto max-w-7xl py-5">
        {/* Sidebar */}
        <div className="sticky top-24 h-fit">
          <RoomFilter
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            selectedAmenities={selectedAmenities}
            setSelectedAmenities={setSelectedAmenities}
            guests={guests}
            setGuests={setGuests}
          />
        </div>
        <section className="flex-1 h-[calc(100vh-5rem)] overflow-y-auto pl-8 pt-5">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Available Rooms
          </h1>
          <AllRoomsType
            onBook={(roomType) => {
              if (window.__addToCart) window.__addToCart(roomType);
            }}
            selectedPrices={selectedPrice}
            selectedTypes={selectedTypes}
          />
        </section>
      </main>
    </>
  );
};

export default BookingRoom;