import { useState, useEffect } from "react";
import {
  User,
  Edit3,
  Calendar,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Shield,
  Tag,
} from "lucide-react";
import { toast } from "react-toastify";

const ProfileDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [ratingDialog, setRatingDialog] = useState({
    open: false,
    bookingId: null,
  });
  const [ratingValue, setRatingValue] = useState(5);
  const [ratingComment, setRatingComment] = useState("");
  const [ratingLoading, setRatingLoading] = useState(false);
  const [cancelDialog, setCancelDialog] = useState({
    open: false,
    bookingId: null,
  });
  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");

  useEffect(() => {
    fetchUserData();
    fetchBookings();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      if (json.result && json.data) {
        setProfile(json.data);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
    setLoading(false);
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      if (json.result && Array.isArray(json.data)) {
        setBookings(json.data);
      } else {
        console.warn("Unexpected bookings format", json);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setForm({ ...profile });
  };

  const handleCancel = () => {
    setEditing(false);
    setForm({});
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      const token = localStorage.getItem("authToken");
      // remove avatar (ignore profile image field)
      const { avatar, ...formDataWithoutAvatar } = form;
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/profile`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataWithoutAvatar),
        }
      );

      const json = await response.json();
      console.log("API response:", json); // Add debug info
      if (response.ok && json.result && json.data) {
        setProfile(json.data); // Update profile with returned data
        setEditing(false);
      } else {
        console.error("Profile update failed:", json.message || json);
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong. Please try again.");
    }
    setSaving(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-3 h-3" />;
      case "pending":
        return <Clock className="w-3 h-3" />;
      case "cancelled":
        return <AlertCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const filteredBookings =
    bookingStatusFilter === "all"
      ? bookings
      : bookings.filter((b) => b.booking_status === bookingStatusFilter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-600">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl m-auto bg-white/90 to-indigo-100">
      {/* Header */}
      <div className="bg-while/90 w-full pt-20">
        <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
          Profile Dashboard
        </h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 sticky top-24">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img
                  src={profile?.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full p-2 shadow-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-1">
                {profile?.name}
              </h2>
              <p className="text-sm text-gray-600">
                Member since{" "}
                {new Date(profile?.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="space-y-4 mb-6 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-500" />
                {profile?.email}
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-blue-500" />
                {profile?.gender}
              </div>
            </div>

            <button
              onClick={handleEdit}
              disabled={editing}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Bookings */}
        <div className="lg:col-span-2">
          <div className="bg-white/90 p-8 rounded-3xl shadow-xl border border-white/20">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                My Bookings
              </h3>
              <div className="text-sm text-gray-500">
                {bookings.length} active bookings
              </div>
            </div>

            {/* Booking Status Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Filter by Status
              </label>
              <select
                value={bookingStatusFilter}
                onChange={(e) => setBookingStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-transform hover:scale-[1.02]"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {booking.rooms.length > 0 ? (
                          booking.rooms.map((room) => (
                            <div key={room.id}>
                              <h4 className="text-lg font-semibold text-gray-600">
                                Room No: {room.room_number} -{" "}
                                {room.room_type?.type}
                              </h4>
                            </div>
                          ))
                        ) : (
                          <h4 className="text-lg font-semibold text-gray-600 italic">
                            No rooms assigned
                          </h4>
                        )}
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                            booking.booking_status
                          )}`}
                        >
                          {getStatusIcon(booking.booking_status)}
                          {booking.booking_status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          check-in-date -{" "}
                          {new Date(booking.check_in_date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          check-out-date -{" "}
                          {new Date(
                            booking.check_out_date
                          ).toLocaleDateString()}
                        </div>

                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {booking.rooms[0] && booking.rooms[0].room_type
                            ? `$${booking.rooms[0].room_type.price}/night`
                            : "-"}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <div className="text-2xl font-bold text-blue-600">
                        ${booking.payment.total_payment}
                      </div>
                      {/* Show Rating button only if booking is NOT completed */}
                      {booking.booking_status !== "completed" &&
                        booking.booking_status !== "cancelled" && (
                          <button
                            className="mt-2 px-4 py-2 bg-yellow-400 text-white rounded-lg font-semibold hover:bg-yellow-500 transition"
                            onClick={() => {
                              setRatingDialog({
                                open: true,
                                bookingId: booking.id,
                              });
                            }}
                          >
                            Rating
                          </button>
                        )}
                      {/* Show Cancel button only if booking is confirmed */}
                      {booking.booking_status === "confirmed" && (
                        <button
                          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                          onClick={() =>
                            setCancelDialog({
                              open: true,
                              bookingId: booking.id,
                            })
                          }
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Edit Profile
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <select
                  name="gender"
                  value={form.gender || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold shadow-md flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rating Dialog */}
      {ratingDialog?.open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Rate Your Stay
            </h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setRatingLoading(true);
                try {
                  const token = localStorage.getItem("authToken");
                  const completeBooking = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/api/bookings/${
                      ratingDialog.bookingId
                    }/complete`,
                    {
                      method: "PUT",
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/api/ratings`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        booking_id: ratingDialog.bookingId,
                        rating: ratingValue,
                        comment: ratingComment,
                      }),
                    }
                  );
                  const json = await response.json();
                  if (response.ok && json.result) {
                    alert("Thank you for your rating!");
                    setRatingDialog({ open: false, bookingId: null });
                    setRatingValue(5);
                    setRatingComment("");
                  } else {
                    alert(json.message || "Failed to submit rating.");
                  }
                } catch (err) {
                  alert("Failed to submit rating.");
                }
                setRatingLoading(false);
              }}
            >
              <div className="mb-4 flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRatingValue(star)}
                    className="focus:outline-none"
                  >
                    <svg
                      className={`w-8 h-8 ${
                        ratingValue >= star
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                    </svg>
                  </button>
                ))}
              </div>
              <div className="mb-4">
                <textarea
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Leave a comment..."
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={ratingLoading}
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-3 px-4 rounded-xl font-semibold shadow-md flex items-center justify-center gap-2"
                >
                  {ratingLoading ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setRatingDialog({ open: false, bookingId: null })
                  }
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cancel Dialog */}
      {cancelDialog.open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              📢 Cancellation Policy
            </h3>
            <ul className="mb-6 text-gray-700 text-sm list-disc pl-5 space-y-1">
              <li>Free cancellation up to 48 hours before check-in.</li>
              <li>100% charge if canceled.</li>
              <li>No refund if canceled within 5 hours or for no-shows.</li>
              <li>
                Refunds (if applicable) are processed within 5-7 business days.
              </li>
            </ul>
            <p className="mb-6 text-gray-800 font-medium">
              Do you accept these terms and wish to proceed with your booking
              cancellation?
            </p>
            <div className="flex gap-4">
              <button
                className="flex-1 bg-red-500 text-white py-3 px-4 rounded-xl font-semibold shadow-md hover:bg-red-600"
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("authToken");
                    const response = await fetch(
                      `${import.meta.env.VITE_BASE_URL}/api/bookings/${
                        cancelDialog.bookingId
                      }/cancel`,
                      {
                        method: "DELETE",
                        headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    const json = await response.json();
                    if (response.ok && json.result) {
                      toast.success("Booking cancelled successfully!");
                      setCancelDialog({ open: false, bookingId: null });
                      fetchBookings();
                    } else {
                      toast.error(json.message || "Failed to cancel booking.");
                    }
                  } catch (err) {
                    alert("Failed to cancel booking.");
                  }
                }}
              >
                Accept
              </button>
              <button
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200"
                onClick={() =>
                  setCancelDialog({ open: false, bookingId: null })
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDashboard;
