import {
  Award,
  Clock,
  MapPin,
  Users,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Waves,
  Star,
} from "lucide-react";
import React, { useState, useEffect } from "react";
// import { Star } from "lucide-react";

import KoukLin from "../assets/member/kouk-lin.png";
import Dara from "../assets/member/dara.png";
import Dina from "../assets/member/dina.png";
import Seth from "../assets/member/seth.png";
import Bothty from "../assets/member/bothty.png";

export default function About() {
  const [rating, setRating] = useState([]);
  const hospitalityExperts = [
    {
      name: "James Richardson",
      position: "General Manager",
      description: "With 20+ years in luxury hospitality, James ensures every guest receives world-class service.",
      image: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Maria Santos",
      position: "Executive Chef",
      description:
        "Award-winning chef creating culinary masterpieces that blend international flavors with local ingredients.",
      image: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "David Park",
      position: "Guest Relations Manager",
      description: "Dedicated to creating memorable experiences and ensuring every guest feels welcomed and valued.",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Sarah Williams",
      position: "Operations Manager",
      description:
        "Ensures seamless daily operations and maintains the highest standards of service across all departments.",
      image: "https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]


  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/ratings`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch rating");
        }
        const data = await res.json();
        console.log("Data", data);
        setRating(data?.data || []);
      } catch (error) {
        toast.error("Error fetching rating:", error);
      }
    };
    fetchRating();
  }, []);




  return (
    <div className="container w-full mx-auto text-center">
      <main className="w-full m-auto max-w-7xl py-12 px-4 sm:px-6 bg-gray-50 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to <span className="text-blue-600">Romsay Hotel</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Where luxury meets comfort. Experience unparalleled hospitality in
            good environment.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <div className="rounded-md shadow flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-white bg-blue-600 md:py-4 md:text-lg md:px-10">
              Best Service
            </div>
            <div className="rounded-md shadow flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-white bg-blue-600 md:py-4 md:text-lg md:px-10">
              Best Hotel
            </div>
          </div>
        </div>

        {/* Hotel Overview */}
        <div className="relative bg-white p-8 rounded-2xl shadow-lg mb-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl text-left">
                Our Story
              </h2>
              <p className="mt-3 text-lg text-gray-500 text-left">
                Established in 1985, Romsay Hotel has been a beacon of luxury
                and comfort for over three decades. Our commitment to
                exceptional service and attention to detail has made us a
                preferred destination for travelers from around the world.
              </p>
              <div className="mt-8 space-y-4 text-left">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Star className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-500">
                    5-star luxury accommodations with personalized service
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-500">
                    Prime location in the downtown with easy access to
                    attractions
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Award className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-500">
                    Award-winning hospitality and sustainable tourism practices
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 flex items-center justify-center">
              <img
                src="src/assets/banner.jpg"
                alt="Grand Vista Hotel exterior"
                className="rounded-lg shadow-lg w-full max-w-md"
              />
            </div>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="bg-white py-12 rounded-2xl shadow-lg mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
                Premium Amenities
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need for a perfect stay
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                From world-class dining to relaxing spa services, we offer
                amenities that exceed expectations.
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* Amenity 1 */}
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <Utensils className="h-8 w-8 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        Fine Dining
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        Award-winning restaurant featuring international cuisine
                        and local specialties prepared by renowned chefs.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amenity 2 */}
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <Waves className="h-8 w-8 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        Spa & Wellness
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        Full-service spa with massage therapy, beauty
                        treatments, and wellness programs for complete
                        relaxation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amenity 3 */}
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <Dumbbell className="h-8 w-8 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        Fitness Center
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        State-of-the-art fitness facility with modern equipment,
                        personal training, and group classes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amenity 4 */}
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <Wifi className="h-8 w-8 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        Business Center
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        Fully equipped business center with high-speed internet,
                        meeting rooms, and conference facilities.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amenity 5 */}
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <Car className="h-8 w-8 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        Valet Parking
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        Complimentary valet parking service with 24/7 security
                        for your peace of mind. Guaranteed safe parking for your
                        vehicle.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amenity 6 */}
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <Users className="h-8 w-8 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        Concierge Service
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        Dedicated concierge team to assist with reservations,
                        tours, and local recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Management Team */}
        {/* Management Team */}
      <div className="bg-white py-12 rounded-2xl shadow-lg mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Leadership Team</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Meet our hospitality experts
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Experienced professionals dedicated to making your stay exceptional.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {hospitalityExperts.map((expert, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-200 rounded-md shadow-lg">
                          <img
                            className="h-16 w-16 rounded-full bg-white object-cover"
                            src={expert.image || "https://via.placeholder.com/64x64"}
                            alt={expert.name}
                          />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{expert.name}</h3>
                      <p className="mt-2 text-base text-gray-500">{expert.position}</p>
                      <p className="mt-5 text-base text-gray-500">{expert.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

        {/* Awards & Recognition */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
                Awards & Recognition
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Excellence recognized worldwide
              </p>
            </div>

            <div className="mt-10 space-y-10">
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-start">
                  <span className="bg-white px-3 text-lg font-medium text-gray-900">
                    2023
                  </span>
                </div>
              </div>

              <div className="relative pl-8 sm:pl-32">
                <div className="flex flex-col sm:flex-row items-start mb-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4 sm:mb-0">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="sm:ml-6 text-left">
                    <h3 className="text-lg font-medium text-gray-900">
                      Best Luxury Hotel Award
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      Recognized by the International Hotel Awards for
                      outstanding luxury accommodations and service excellence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-start">
                  <span className="bg-white px-3 text-lg font-medium text-gray-900">
                    2022
                  </span>
                </div>
              </div>

              <div className="relative pl-8 sm:pl-32">
                <div className="flex flex-col sm:flex-row items-start mb-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4 sm:mb-0">
                    <Star className="h-6 w-6" />
                  </div>
                  <div className="sm:ml-6 text-left">
                    <h3 className="text-lg font-medium text-gray-900">
                      5-Star TripAdvisor Certificate
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      Achieved 5-star rating on TripAdvisor with over 2,000
                      excellent reviews from satisfied guests.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-start">
                  <span className="bg-white px-3 text-lg font-medium text-gray-900">
                    2021
                  </span>
                </div>
              </div>

              <div className="relative pl-8 sm:pl-32">
                <div className="flex flex-col sm:flex-row items-start">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4 sm:mb-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div className="sm:ml-6 text-left">
                    <h3 className="text-lg font-medium text-gray-900">
                      Sustainable Tourism Award
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      Honored for our commitment to environmental sustainability
                      and responsible tourism practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Guest Ratings Section --- */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Star className="w-4 h-4 fill-current" />
                Guest Reviews
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real experiences from real people who've stayed with us
              </p>
            </div>

            {/* Ratings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rating.length === 0 ? (
                <div className="col-span-2 text-center py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg">No reviews yet. Be the first to share your experience!</p>
                </div>
              ) : (
                rating.map((item) => (
                  <div
                    key={item.id}
                    className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-white/90 backdrop-blur-sm rounded-2xl p-8 relative overflow-hidden"
                  >
                    {/* Decorative gradient top border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                    {/* Quote decoration */}
                    <div className="absolute top-4 right-6 opacity-10">
                      <svg className="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 transition-colors ${
                              i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                        {item.rating}.0
                      </span>
                    </div>

                    {/* Comment */}
                    <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 font-medium relative z-10">
                      "{item.comment}"
                    </blockquote>

                    {/* User Info */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{item.user?.name || "Anonymous"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 font-medium">
                          {new Date(item.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Subtle background pattern */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
                      <div className="w-full h-full bg-gradient-to-tl from-blue-500 to-transparent rounded-full"></div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Average Rating Summary */}
            {rating.length > 0 && (
              <div className="text-center mt-16">
                <div className="inline-flex items-center gap-4 text-gray-600 bg-white px-8 py-4 rounded-full shadow-xl border border-gray-100 backdrop-blur-sm">
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-lg text-gray-800">
                    Average rating: {(rating.reduce((acc, r) => acc + r.rating, 0) / rating.length).toFixed(1)} out of 5
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500 font-medium">
                    {rating.length} review{rating.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Contact & Booking Section */}
        <div id="contact" className="bg-blue-700 rounded-2xl shadow-lg">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to experience luxury?</span>
              <span className="block text-blue-200">
                Book your stay with us today.
              </span>
            </h2>
          </div>
        </div>

        {/* Mentor and member team */}
        <section className="my-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8 text-center">
            Meet Our Menter
          </h2>
          {/* Mentor Card */}
          <div className="w-full flex flex-col items-center mb-12">
            <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center w-full max-w-3xl mx-auto p-8">
              <img
                src="https://media.licdn.com/dms/image/v2/C4D03AQFuXFCZyhZ7vg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1531034054025?e=2147483647&v=beta&t=lHBoqLa0drjtaZD3Yif1_doxO3nKON0PZb3Cvbbz9Lw"
                alt="Mentor"
                className="h-32 w-32 rounded-full object-cover mb-4 md:mb-0 md:mr-8"
              />
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900">
                  Mr. Touch NgounChhay
                </h3>
                <p className="text-base text-gray-500 mt-2">Project Mentor</p>
                <p className="text-gray-500 mt-4">
                  Lecturer of Web Technology and Cloud Computing
                </p>
              </div>
            </div>
          </div>

          {/* Member Cards */}
          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-6 text-center">
              Our Team Members
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 mb-8">
              {/* Member 1 */}
              <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-6">
                <img
                  src={Dara}
                  alt="Member 1"
                  className="h-24 w-24 rounded-full object-cover mb-4"
                />
                <h4 className="text-lg font-medium text-gray-900">
                  Kong Sisovandara
                </h4>
              </div>
              {/* Member 2 */}
              <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-6">
                <img
                  src={Bothty}
                  alt="Member 2"
                  className="h-24 w-24 rounded-full object-cover mb-4"
                />
                <h4 className="text-lg font-medium text-gray-900">
                  Kry Sobothty
                </h4>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8">
              {/* Member 3 */}
              <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-6">
                <img
                  src={Seth}
                  alt="Member 3"
                  className="h-24 w-24 rounded-full object-cover mb-4"
                />
                <h4 className="text-lg font-medium text-gray-900">
                  Mony ChanSeth
                </h4>
              </div>
              {/* Member 4 */}
              <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-6">
                <img
                  src={Dina}
                  alt="Member 4"
                  className="h-24 w-24 rounded-full object-cover mb-4"
                />
                <h4 className="text-lg font-medium text-gray-900">Preap Dina</h4>
              </div>
              {/* Member 5 */}
              <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-6">
                <img
                  src={KoukLin}
                  alt="Member 5"
                  className="h-24 w-24 rounded-full object-cover mb-4"
                />
                <h4 className="text-lg font-medium text-gray-900">
                  Kouk Lin
                </h4>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
