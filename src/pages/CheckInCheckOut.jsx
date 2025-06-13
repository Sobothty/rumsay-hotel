import React, { useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";

const CheckinCheckout = () => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return {
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
    };
  };

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };
  
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    return Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
    );
  };

  const checkInFormatted = formatDate(checkInDate);
  const checkOutFormatted = formatDate(checkOutDate);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#e0e7ff] via-[#f0f9ff] to-[#c7d2fe] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Brand Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#38B6FF] to-[#6366f1] drop-shadow-lg mb-2 tracking-tight">
            RUMSAY
          </h1>
          <p className="text-gray-700 text-lg font-medium">Select your dates</p>
        </div>

        {/* Main Card with glassmorphism */}
        <div className="rounded-3xl shadow-2xl border border-white/30 bg-white/60 backdrop-blur-xl overflow-hidden transition-all duration-300">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Check-in Section */}
              <div className="group">
                <label className="block text-gray-700 text-xs font-bold mb-3 uppercase tracking-widest">
                  Check-in
                </label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10">
                    <Calendar className="text-[#38B6FF] opacity-80" size={22} />
                  </div>
                  <input
                    type="date"
                    value={checkInDate}
                    min={getTodayDate()}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full pl-14 pr-4 py-5 bg-white/80 border border-gray-200 rounded-2xl text-gray-800 font-semibold text-base focus:outline-none focus:border-[#38B6FF] focus:bg-white transition-all duration-300 hover:border-[#38B6FF] hover:bg-white cursor-pointer shadow-sm"
                  />
                  {checkInDate && (
                    <div className="mt-4 text-center">
                      <div className="inline-flex flex-col items-center bg-[#38B6FF]/10 rounded-xl px-5 py-3 border border-[#38B6FF]/20 shadow">
                        <span className="text-[#38B6FF] font-bold text-2xl">
                          {checkInFormatted.day}
                        </span>
                        <span className="text-[#38B6FF] font-medium text-xs">
                          {checkInFormatted.month} {checkInFormatted.weekday}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Check-out Section */}
              <div className="group">
                <label className="block text-gray-700 text-xs font-bold mb-3 uppercase tracking-widest">
                  Check-out
                </label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10">
                    <Calendar className="text-[#6366f1] opacity-80" size={22} />
                  </div>
                  <input
                    type="date"
                    value={checkOutDate}
                    min={checkInDate || getTomorrowDate()}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full pl-14 pr-4 py-5 bg-white/80 border border-gray-200 rounded-2xl text-gray-800 font-semibold text-base focus:outline-none focus:border-[#6366f1] focus:bg-white transition-all duration-300 hover:border-[#6366f1] hover:bg-white cursor-pointer shadow-sm"
                  />
                  {checkOutDate && (
                    <div className="mt-4 text-center">
                      <div className="inline-flex flex-col items-center bg-[#6366f1]/10 rounded-xl px-5 py-3 border border-[#6366f1]/20 shadow">
                        <span className="text-[#6366f1] font-bold text-2xl">
                          {checkOutFormatted.day}
                        </span>
                        <span className="text-[#6366f1] font-medium text-xs">
                          {checkOutFormatted.month} {checkOutFormatted.weekday}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Duration Display */}
            {checkInDate && checkOutDate && (
              <div className="mt-8 text-center">
                <div className="inline-flex items-center justify-center space-x-4 bg-gradient-to-r from-[#38B6FF]/10 to-[#6366f1]/10 rounded-2xl px-8 py-4 border border-[#38B6FF]/10 shadow">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#38B6FF] rounded-full"></div>
                    <span className="text-gray-700 font-semibold">
                      {checkInFormatted.month} {checkInFormatted.day}
                    </span>
                  </div>

                  <ArrowRight className="text-[#38B6FF]" size={20} />

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-700 font-semibold">
                      {checkOutFormatted.month} {checkOutFormatted.day}
                    </span>
                    <div className="w-3 h-3 bg-[#6366f1] rounded-full"></div>
                  </div>
                  <div className="ml-6 px-4 py-2 bg-gradient-to-r from-[#38B6FF] to-[#6366f1] rounded-full shadow">
                    <span className="text-white font-bold text-sm tracking-wide">
                      {getNights()} night{getNights() !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="mt-10 text-center">
              <button
                disabled={!checkInDate || !checkOutDate}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`group relative inline-flex items-center justify-center px-14 py-5 bg-gradient-to-r from-[#38B6FF] to-[#6366f1] rounded-2xl text-white font-extrabold text-lg shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-xl ${
                  isHovered && checkInDate && checkOutDate
                    ? "brightness-110"
                    : ""
                }`}
              >
                <span className="relative z-10 flex items-center tracking-wide">
                  Confirm Dates
                  <ArrowRight
                    className={`ml-3 transition-transform duration-300 ${
                      isHovered && checkInDate && checkOutDate
                        ? "translate-x-1"
                        : ""
                    }`}
                    size={22}
                  />
                </span>
                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#38B6FF] to-[#6366f1] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Helper Text */}
            {(!checkInDate || !checkOutDate) && (
              <p className="text-center text-gray-500 text-sm mt-4 font-medium">
                Please select both check-in and check-out dates
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckinCheckout;
