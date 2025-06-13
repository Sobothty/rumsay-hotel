import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Reservation = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setBookings([]);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/admin/booking-rooms`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data && Array.isArray(res.data.data)) {
          setBookings(res.data.data.reverse());
        } else if (res.data && res.data.data) {
          setBookings([res.data.data]);
        } else {
          setBookings([]);
        }
      } catch (err) {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleEdit = (bookingId) => {
    // TODO: Implement edit logic or navigation
    toast.info(`Edit booking ${bookingId}`);
  };

  // Confirm booking
  const handleConfirm = async (bookingId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("No auth token found.");
      return;
    }
    try {
      await axios.put(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/admin/booking-rooms/${bookingId}/confirm`,
        null,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, booking_status: "confirmed" } : b
        )
      );
      toast.success("Booking confirmed successfully!");
    } catch (err) {
      console.error("Confirm booking error:", err);
      toast.error("Failed to confirm booking.");
    }
  };

  // Checkout booking
  const handleCheckout = async (bookingId, roomIds) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("No auth token found.");
      return;
    }
    try {
      // Update booking status to completed
      await axios.put(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/admin/booking-rooms/${bookingId}/complete`,
        null,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update all related rooms' have_been_booking to true
      await Promise.all(
        roomIds.map((roomId) =>
          axios.put(
            `${
              import.meta.env.VITE_BASE_URL
            }/api/admin/rooms/${roomId}/update-booking-status`,
            { have_been_booking: true },
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
        )
      );
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, booking_status: "completed" } : b
        )
      );
      toast.success("Booking checked out successfully!");
    } catch (err) {
      console.error("Checkout booking error:", err);
      toast.error("Failed to checkout booking.");
    }
  };

  const handleDelete = async (bookingId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("No auth token found.");
      return;
    }
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/bookings/${bookingId}/cancel`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, booking_status: "cancelled" } : b
        )
      );
      toast.success("Booking cancelled successfully!");
    } catch (err) {
      toast.error("Failed to cancel booking.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Booking List</h2>
      {/* Status summary blocks */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 min-w-[160px] bg-yellow-100 border-l-4 border-yellow-400 rounded-xl p-4 flex items-center gap-3 shadow">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-400"></span>
          <div>
            <div className="text-lg font-bold text-yellow-800">
              {bookings.filter((b) => b.booking_status === "pending").length}
            </div>
            <div className="text-sm text-yellow-700">Pending</div>
          </div>
        </div>
        <div className="flex-1 min-w-[160px] bg-green-100 border-l-4 border-green-400 rounded-xl p-4 flex items-center gap-3 shadow">
          <span className="inline-block w-3 h-3 rounded-full bg-green-400"></span>
          <div>
            <div className="text-lg font-bold text-green-800">
              {bookings.filter((b) => b.booking_status === "confirmed").length}
            </div>
            <div className="text-sm text-green-700">Confirmed</div>
          </div>
        </div>
        <div className="flex-1 min-w-[160px] bg-red-100 border-l-4 border-red-400 rounded-xl p-4 flex items-center gap-3 shadow">
          <span className="inline-block w-3 h-3 rounded-full bg-red-400"></span>
          <div>
            <div className="text-lg font-bold text-red-800">
              {bookings.filter((b) => b.booking_status === "cancelled").length}
            </div>
            <div className="text-sm text-red-700">Cancelled</div>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          {/* Spinner */}
          <div className="mb-4">
            <svg
              className="animate-spin h-10 w-10 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </div>
          {/* Skeleton Table */}
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700">
              <thead>
                <tr className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900">
                  <th className="py-3 px-4 text-left font-semibold">
                    Booking ID
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">
                    Username
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">
                    Room Numbers
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">Status</th>
                  <th className="py-3 px-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-gray-100 dark:border-gray-800"
                  >
                    {[...Array(5)].map((__, colIdx) => (
                      <td key={colIdx} className="py-3 px-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-gray-400 text-sm">Loading bookings...</div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700">
            <thead>
              <tr className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900">
                <th className="py-3 px-4 text-left font-semibold">
                  Booking ID
                </th>
                <th className="py-3 px-4 text-left font-semibold">Username</th>
                <th className="py-3 px-4 text-left font-semibold">
                  Room Numbers
                </th>
                <th className="py-3 px-4 text-left font-semibold">Status</th>
                <th className="py-3 px-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-t border-gray-100 dark:border-gray-800 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="py-3 px-4">{booking.id}</td>
                  <td className="py-3 px-4">
                    {booking.user?.email || booking.user?.username || "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    {booking.rooms && booking.rooms.length > 0
                      ? booking.rooms.map((r) => r.room_number).join(", ")
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        booking.booking_status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : booking.booking_status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {booking.booking_status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2 justify-center">
                    {/* Show Confirm button only if pending */}
                    {booking.booking_status === "pending" && (
                      <button
                        onClick={() => handleConfirm(booking.id)}
                        className="px-4 py-1 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
                      >
                        Confirm
                      </button>
                    )}
                    {/* Show Checkout button only if confirmed */}
                    {booking.booking_status === "confirmed" && (
                      <button
                        onClick={() =>
                          handleCheckout(
                            booking.id,
                            booking.rooms ? booking.rooms.map((r) => r.id) : []
                          )
                        }
                        className="px-4 py-1 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                      >
                        Checkout
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="px-4 py-1 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
