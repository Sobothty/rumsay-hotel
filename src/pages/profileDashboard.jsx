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

const ProfileDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
            Profile Dashboard
          </h1>
        </div>
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

            <div className="space-y-4">
              {bookings.map((booking) => (
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
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        ${booking.payment.total_payment}
                      </div>
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
              {/* <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <input
                  type="text"
                  name="gender"
                  value={form.gender || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div> */}
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
    </div>
  );
};

export default ProfileDashboard;