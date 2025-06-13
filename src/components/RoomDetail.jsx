import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/room-types`
        );
        const result = await res.json();
        // Find the room with matching id (ensure both are numbers for comparison)
        const foundRoom = (result.data || []).find(
          (r) => String(r.id) === String(id)
        );
        setRoom(foundRoom || null);
        console.log("Fetched room details:", foundRoom);
      } catch (err) {
        setRoom(null);
      }
    };
    fetchRoomTypes();
  }, [id]);

  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin opacity-50"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
        <p className="text-xl text-gray-600 font-medium">
          Loading room details...
        </p>
        <div className="mt-4 flex space-x-1">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Image Section */}
          <div className="relative h-96 overflow-hidden">
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 z-10"></div>

            <img
              src={room.image_url || "/src/assets/categories/category-room.jpg"}
              alt={room.type}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
            />

            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="absolute top-6 left-6 z-20 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform inline-block">
                ←
              </span>{" "}
              Back
            </button>

            {/* Room Type Badge */}
            <div className="absolute top-6 right-6 z-20 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/30 shadow-lg">
              <span className="font-bold text-sm uppercase tracking-wider">
                {room.type}
              </span>
            </div>

            {/* Floating Elements */}
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <div className="flex items-end justify-between">
                <div className="text-white">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ⭐
                      </span>
                    ))}
                    <span className="ml-2 text-white/90 font-medium">4.9</span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/30">
                  <span className="text-white font-bold text-lg">
                    ${room.price}/night
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {room.type}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {room.description}
              </p>
            </div>

            {/* Room Info Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl p-6 border border-indigo-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center text-white text-xl">
                    👥
                  </div>
                  <div>
                    <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wide">
                      Capacity
                    </p>
                    <p className="text-2xl font-bold text-gray-800">
                      {room.capacity} Guests
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl p-6 border border-pink-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-white text-xl">
                    💰
                  </div>
                  <div>
                    <p className="text-pink-600 font-semibold text-sm uppercase tracking-wide">
                      Price
                    </p>
                    <p className="text-2xl font-bold text-gray-800">
                      ${room.price}/night
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Button */}
            <div className="text-center">
              <button
                className="relative px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden group"
                onClick={() => {
                  if (window.__addToCart) window.__addToCart(room);
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Book This Room</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Tags Section */}
            <div className="flex flex-wrap justify-center gap-3">
              <span className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 px-6 py-2 rounded-full text-sm font-bold border border-purple-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                #GenZVibes
              </span>
              <span className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-6 py-2 rounded-full text-sm font-bold border border-blue-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                #Aesthetic
              </span>
              <span className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-6 py-2 rounded-full text-sm font-bold border border-orange-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                #ChillStay
              </span>
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center space-x-8 pt-4">
              <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
              <div className="w-8 h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full"></div>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-30">
          <button className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300">
            <span className="text-xl">💬</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
