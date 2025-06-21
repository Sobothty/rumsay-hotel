import { useEffect, useState } from "react";
import AllRoomsType from "../components/RoomCardBooking";
import RoomFilter from "./layouts/filter";
import { useNavigate } from "react-router-dom";

const BookingRoom = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]); // ensure array
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [guests, setGuests] = useState(null);
  const [searchRoomNumber, setSearchRoomNumber] = useState(""); // Add this state
  const token = localStorage.getItem("authToken");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

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
          <div className="flex w-full justify-between items-center px-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              Available Rooms
            </h1>
            {/* searching place */}
            <input
              type="text"
              placeholder="Search by Room Number"
              value={searchRoomNumber}
              onChange={(e) => setSearchRoomNumber(e.target.value)}
              className="border rounded px-3 py-2 mb-4 w-full max-w-xs"
            />
          </div>
          <AllRoomsType
            onBook={(roomType) => {
              if (window.__addToCart) window.__addToCart(roomType);
            }}
            selectedPrices={selectedPrice}
            selectedTypes={selectedTypes}
            searchRoomNumber={searchRoomNumber} // Pass as prop
          />
        </section>
      </main>
    </>
  );
};

export default BookingRoom;
