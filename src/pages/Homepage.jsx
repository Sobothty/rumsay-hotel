import RoomType from "./layouts/CategoriesRoomType";
import ExploreALlRoomType from "./layouts/ExploreRoom";
import Gallery from "../components/Gallery";

import {
  FaConciergeBell,
  FaKey,
  FaDumbbell,
  FaWifi,
  FaParking,
  FaTshirt,
  FaUsers,
  FaCar,
  FaDog,
  FaSwimmer,
  FaUtensils,
  FaSpa,
} from "react-icons/fa";

import {
  ChevronDownIcon,
  BedIcon,
  SparklesIcon,
  WineIcon,
  ArrowRightIcon,
} from "lucide-react";

const amenities = [
  { icon: <FaConciergeBell />, label: "Concierge" },
  { icon: <FaKey />, label: "Digital Key" },
  { icon: <FaDumbbell />, label: "Fitness Center" },
  { icon: <FaWifi />, label: "Free Internet Access" },
  { icon: <FaParking />, label: "Free Parking" },
  { icon: <FaTshirt />, label: "Laundry" },
  { icon: <FaUsers />, label: "Meeting Facilities" },
  { icon: <FaCar />, label: "Valet Parking" },
  { icon: <FaDog />, label: "Pet Friendly" },
  { icon: <FaSwimmer />, label: "Pool" },
  { icon: <FaUtensils />, label: "Restaurant On-Site" },
  { icon: <FaConciergeBell />, label: "Room Service" }, // Reuse this icon
  { icon: <FaSpa />, label: "Spa" },
];

export default function Homepage() {



  return (
    <>
      <main className="w-full m-auto max-w-7xl ">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[600px] bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden rounded-3xl shadow-2xl mt-10 mb-20">
          {/* Background Image with Parallax Effect */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center transform hover:scale-105 transition-transform duration-1000"></div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center items-center text-center px-6">
            {/* 5-Star Badge */}
            <div className="mb-6 px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-gold-400 text-lg">★★★★★</span>
              <span className="ml-2 text-white font-medium">
                LUXURY COLLECTION
              </span>
            </div>

            {/* Hotel Name */}
            <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tight text-white mb-4">
              ROMSAY
            </h1>

            {/* Divider */}
            <div className="w-24 h-0.5 bg-gold-400 my-6"></div>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mb-10">
              Redefining elegance in the heart of the city
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-gold-500 hover:bg-gold-600 text-white rounded-full font-medium transition-all hover:shadow-lg">
                Book Now
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white/30 hover:border-white/60 text-white rounded-full font-medium transition-all">
                Explore Suites
              </button>
            </div>
          </div>

          {/* Scrolling Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDownIcon className="h-6 w-6 text-white/80" />
          </div>
        </section>

        {/* --- Features Grid --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: <BedIcon className="h-8 w-8 text-gold-500" />,
              title: "Luxury Suites",
              desc: "Spacious rooms with panoramic city views",
            },
            {
              icon: <SparklesIcon className="h-8 w-8 text-gold-500" />,
              title: "Premium Spa",
              desc: "Award-winning wellness experiences",
            },
            {
              icon: <WineIcon className="h-8 w-8 text-gold-500" />,
              title: "Fine Dining",
              desc: "Michelin-starred culinary excellence",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-serif font-medium mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* --- Image Gallery Preview --- */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-serif font-light">Our Spaces</h2>
            <button className="text-gold-600 hover:text-gold-700 font-medium flex items-center">
              View Gallery <ArrowRightIcon className="ml-2 h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative h-64 rounded-xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gray-800 group-hover:opacity-90 transition-opacity">
                  <img
                    src={`https://source.unsplash.com/random/600x600/?hotel,luxury,${i}`}
                    alt="Hotel space"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                  <h3 className="text-white font-medium">
                    {["Lobby", "Suite", "Pool", "Restaurant"][i - 1]}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* categories */}
        <RoomType />

        {/* Amenities Section */}
        <section className="bg-white py-16 text-[#2a1a4a]">
          <h2 className="text-3xl font-semibold mb-[70px]">Ameneties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
            {amenities.map((item, index) => (
              <div key={index} className="flex items-center gap-8 text-left">
                <div className="text-2xl text-[#2a1a4a] opacity-80">
                  {item.icon}
                </div>
                <span className="text-lg">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* explore all room type */}
        <section>
          <ExploreALlRoomType />
        </section>

        {/* preview */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <img
              src="/preview-hotel.jpg" // Change this to your preview image path
              alt="Hotel Preview"
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
            <div>
              <h2 className="text-4xl font-bold text-blue-700 mb-4">
                Discover Luxury & Comfort
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Experience the best stay at our hotel in Cambodia. From cozy
                standard rooms to elegant VIP suites, we make every night
                special. Let us pamper you with top amenities and beautiful
                views.
              </p>
              <a
                href="#rooms"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
              >
                Explore Rooms
              </a>
            </div>
          </div>
        </section>
        {/* Gallery */}
        <section className="w-full">
          <Gallery />
        </section>
      </main>
    </>
  );
}
