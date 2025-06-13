import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const AllRoom = () => {
  const [selectedType, setSelectedType] = useState("Regular");
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]); // fetch from API
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [form, setForm] = useState({
    room_number: "",
    desc: "",
    room_type_id: "",
    price: "",
    is_active: true,
  });
  const [error, setError] = useState("");

  // Fetch all room types and rooms from API
  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/room-types`).then((res) => {
      setRoomTypes(Array.isArray(res.data.data) ? res.data.data : []);
      // Set default selectedType to first type if available
      if (res.data.data && res.data.data.length > 0) {
        setSelectedType(res.data.data[0].type);
      }
    });

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/rooms`)
      .then((res) => {
        setRooms(Array.isArray(res.data.data) ? res.data.data : []);
        setLoading(false);
      })
      .catch(() => {
        setRooms([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Only keep dark mode sync logic, no theme button or state here
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  // Filter rooms by selected type
  const filteredRooms = rooms.filter(
    (room) => room.room_type?.type === selectedType
  );

  // Find selected room type object and its capacity
  const selectedRoomTypeObj = roomTypes.find((rt) => rt.type === selectedType);
  const selectedTypeCapacity = selectedRoomTypeObj?.capacity || 0;
  const selectedTypeRoomCount = filteredRooms.length;
  const isAddDisabled = selectedTypeRoomCount >= selectedTypeCapacity;

  // Handle open modal for create/edit
  const openModal = (room = null) => {
    setError("");
    setEditRoom(room);
    if (room) {
      setForm({
        room_number: room.room_number || "",
        desc: room.desc || "",
        room_type_id: room.room_type?.id || "",
        price: room.room_type?.price || "",
        is_active: room.is_active ?? true,
      });
    } else {
      // Default to selected type's id
      const selectedRoomType = roomTypes.find((rt) => rt.type === selectedType);
      setForm({
        room_number: "",
        desc: selectedRoomType
          ? selectedRoomType.desc || selectedRoomType.description || ""
          : "",
        room_type_id: selectedRoomType ? selectedRoomType.id : "",
        price: selectedRoomType ? selectedRoomType.price : "",
        is_active: true,
      });
    }
    setShowModal(true);
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "room_type_id") {
      // When room type changes, update price accordingly
      const selectedRoomType = roomTypes.find((rt) => String(rt.id) === value);
      setForm((prev) => ({
        ...prev,
        room_type_id: value,
        price: selectedRoomType ? selectedRoomType.price : "",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Handle create or update room
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editRoom) {
        // Update
        const payload = {
          room_number: form.room_number,
          room_type_id: form.room_type_id,
          desc: form.desc,
        };
        await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/admin/rooms/${editRoom.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify(payload),
          }
        );
        // Refresh room list
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/rooms`);
        const data = await res.json();
        setRooms(Array.isArray(data.data) ? data.data : []);
        setShowModal(false);
        toast.success("Room updated successfully!");
      } else {
        // Create
        const payload = {
          room_number: form.room_number,
          room_type_id: form.room_type_id,
          desc: form.desc,
        };
        await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/rooms`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(payload),
        });
        // Refresh room list
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/rooms`);
        const data = await res.json();
        setRooms(Array.isArray(data.data) ? data.data : []);
        setShowModal(false);
        toast.success("Room created successfully!");
      }
    } catch (err) {
      setError("Failed to save room. Please check your input.");
      toast.error("Failed to save room. Please check your input.");
    }
  };

  // Handle delete room
  const handleDelete = async (roomId) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/admin/rooms/${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setRooms((prev) => prev.filter((room) => room.id !== roomId));
      toast.success("Room deleted successfully!");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to delete room. Please try again."
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 dark:text-gray-100 text-gray-800 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6">All Room Types</h1>
      {/* Loading spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid"></div>
        </div>
      ) : (
        <>
          {/* Room Type Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {roomTypes.map((rt) => (
              <button
                key={rt.id}
                className={`group flex flex-col items-center p-0 rounded-2xl shadow-lg bg-white dark:bg-gray-800 border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden relative ${
                  selectedType === rt.type
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-gray-200 dark:border-gray-700"
                }`}
                onClick={() => setSelectedType(rt.type)}
                style={{ minHeight: 260 }}
              >
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  {rt.image_url ? (
                    <img
                      src={rt.image_url}
                      alt={rt.type}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-5xl">🛏️</span>
                  )}
                </div>
                <div className="flex-1 flex flex-col items-center justify-center px-4 py-4 w-full">
                  <span className="text-lg font-bold mb-1 text-primary dark:text-blue-200 text-center">
                    {rt.type}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300 mb-2 text-center">
                    {rt.desc || rt.description}
                  </span>
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs font-semibold mt-2">
                    ${rt.price}
                  </span>
                </div>
                {selectedType === rt.type && (
                  <span className="absolute top-2 right-2 bg-primary text-white text-xs px-3 py-1 rounded-full shadow">
                    Selected
                  </span>
                )}
              </button>
            ))}
          </div>
          {/* Room List */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{selectedType} Rooms</h2>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
                onClick={() => openModal()}
                disabled={isAddDisabled}
                title={
                  isAddDisabled
                    ? "Cannot add more rooms: capacity reached"
                    : "Add Room"
                }
              >
                <Plus size={18} /> Add Room
              </button>
            </div>
            {isAddDisabled && (
              <div className="text-blue-600 text-center mb-4 font-semibold">
                The rooms in ({selectedType}) are full.
              </div>
            )}
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : filteredRooms.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                No rooms available for this type.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
                        Room Number
                      </th>
                      <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
                        Description
                      </th>
                      <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
                        Price
                      </th>
                      <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
                        Status
                      </th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRooms.map((room) => (
                      <tr
                        key={room.id}
                        className="transition-colors duration-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                      >
                        <td className="px-4 py-2 font-semibold">
                          {room.room_number}
                        </td>
                        <td className="px-4 py-2">{room.desc}</td>
                        <td className="px-4 py-2">
                          {room.room_type?.price
                            ? `$${room.room_type.price}`
                            : "-"}
                        </td>
                        <td className="px-4 py-2">
                          {room.is_active ? (
                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-700">
                              Active
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-700">
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2 flex gap-2">
                          <button
                            className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900"
                            onClick={() => openModal(room)}
                            title="Edit"
                          >
                            <Pencil size={18} className="text-blue-600" />
                          </button>
                          <button
                            className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900"
                            onClick={() => handleDelete(room.id)}
                            title="Delete"
                          >
                            <Trash2 size={18} className="text-red-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {/* Modal for Create/Edit Room */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 w-full max-w-md relative">
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
                <h3 className="text-xl font-bold mb-4">
                  {editRoom ? "Edit Room" : "Add Room"}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Room Number
                    </label>
                    <input
                      type="text"
                      name="room_number"
                      value={form.room_number}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg outline-none bg-white dark:bg-gray-800 dark:text-gray-100"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <textarea
                      name="desc"
                      value={form.desc}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg outline-none bg-white dark:bg-gray-800 dark:text-gray-100"
                      rows={2}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Room Type
                    </label>
                    <select
                      name="room_type_id"
                      value={form.room_type_id}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg outline-none bg-white dark:bg-gray-800 dark:text-gray-100"
                      required
                    >
                      {roomTypes.map((rt) => (
                        <option key={rt.id} value={rt.id}>
                          {rt.type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      readOnly
                      disabled
                      className="w-full px-3 py-2 border rounded-lg outline-none bg-gray-100 dark:bg-gray-800 dark:text-gray-400 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Status
                    </label>
                    <input
                      type="text"
                      value={form.is_active ? "Active" : "Inactive"}
                      readOnly
                      disabled
                      className="w-full px-3 py-2 border rounded-lg outline-none bg-gray-100 dark:bg-gray-800 dark:text-gray-400 text-gray-500"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-primary text-white rounded-lg font-bold hover:bg-blue-700 transition"
                      disabled={loading}
                    >
                      {editRoom ? "Update Room" : "Create Room"}
                    </button>
                  </div>
                  {error && (
                    <div className="text-red-500 text-sm text-center">
                      {error}
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllRoom;
