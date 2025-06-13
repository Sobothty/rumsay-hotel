import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, Image as LucideImage } from "lucide-react";
import { toast } from "react-toastify";

const RoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editType, setEditType] = useState(null);
  const [form, setForm] = useState({
    type: "",
    price: "",
    capacity: "",
    desc: "",
    image: null,
  });
  const [error, setError] = useState("");

  // Add a new state for form loading
  const [formLoading, setFormLoading] = useState(false);

  // Fetch all room types
  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const fetchRoomTypes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/room-types`
      );
      setRoomTypes(Array.isArray(res.data.data) ? res.data.data : []);
    } catch {
      setRoomTypes([]);
    }
    setLoading(false);
  };

  // Open modal for create/edit
  const openModal = (type = null) => {
    setError("");
    setEditType(type);
    if (type) {
      setForm({
        type: type.type || "",
        price: type.price || "",
        capacity: type.capacity || "",
        desc: type.desc || "",
        image: null,
      });
    } else {
      setForm({
        type: "",
        price: "",
        capacity: "",
        desc: "",
        image: null,
      });
    }
    setShowModal(true);
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type: inputType, files } = e.target;
    if (inputType === "file") {
      setForm((prev) => ({
        ...prev,
        [name]: files[0] || null,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Create or update room type
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFormLoading(true); // Start loading
    try {
      let payload;
      let config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      // Prepare FormData for all cases to match your API (see Postman screenshot)
      payload = new FormData();
      payload.append("type", form.type);
      payload.append("price", form.price);
      payload.append("capacity", form.capacity);
      payload.append("description", form.desc); // Use "description" key as in your API
      if (form.image) {
        payload.append("image", form.image);
      }

      config.headers["Content-Type"] = "multipart/form-data";

      if (editType) {
        // Update
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/room-types/${
            editType.id
          }?_method=PUT`,
          payload,
          config
        );
        toast.success("Room type updated successfully!");
      } else {
        // Create
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/room-types`,
          payload,
          config
        );
        toast.success("Room type created successfully!");
      }
      await fetchRoomTypes();
      setShowModal(false);
    } catch (err) {
      // Debugging: log the error and response
      console.error("Room type create error:", err, err?.response);
      setError(
        err.response?.data?.message ||
          "Failed to save room type. Please check your input."
      );
      toast.error(
        err.response?.data?.message ||
          "Failed to save room type. Please check your input."
      );
    } finally {
      setFormLoading(false); // End loading
    }
  };

  // Delete room type
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room type?"))
      return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/room-types/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setRoomTypes((prev) => prev.filter((rt) => rt.id !== id));
      toast.success("Room type deleted successfully!");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to delete room type. Please try again."
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Room Types</h1>
      {/* Loading spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid"></div>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">All Room Types</h2>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-blue-700 transition"
                onClick={() => openModal()}
              >
                <Plus size={18} /> Add Type
              </button>
            </div>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : roomTypes.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                No room types found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {roomTypes.map((rt) => (
                  <div
                    key={rt.id}
                    className="flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-5 relative group transition hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-20 h-20 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700">
                        {rt.image_url ? (
                          <img
                            src={rt.image_url}
                            alt={rt.type}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <LucideImage size={40} className="text-gray-400" />
                        )}
                      </div>
                      <div>
                        <div className="text-xl font-bold text-primary dark:text-blue-200">
                          {rt.type}
                        </div>
                        <div className="text-gray-500 dark:text-gray-300 text-sm mt-1">
                          {rt.desc}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-2">
                      <div className="flex-1">
                        <div className="text-xs text-gray-500">Price</div>
                        <div className="font-semibold text-blue-700 dark:text-blue-200">
                          {rt.price ? `$${rt.price}` : "-"}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500">Capacity</div>
                        <div className="font-semibold">{rt.capacity}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900"
                          onClick={() => openModal(rt)}
                          title="Edit"
                        >
                          <Pencil size={18} className="text-blue-600" />
                        </button>
                        <button
                          className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900"
                          onClick={() => handleDelete(rt.id)}
                          title="Delete"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Modal for Create/Edit Room Type */}
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
                  {editType ? "Edit Room Type" : "Add Room Type"}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4 relative">
                  {/* Modern loading overlay */}
                  {formLoading && (
                    <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center z-20 rounded-xl">
                      <div className="flex flex-col items-center gap-2">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
                        <span className="text-primary font-semibold mt-2">
                          Saving...
                        </span>
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Type
                    </label>
                    <input
                      type="text"
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg outline-none bg-white dark:bg-gray-800"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg outline-none bg-white dark:bg-gray-800"
                      min={0}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Capacity
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      value={form.capacity}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg outline-none bg-white dark:bg-gray-800"
                      min={1}
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
                      className="w-full px-3 py-2 border rounded-lg outline-none bg-white dark:bg-gray-800"
                      rows={2}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg outline-none bg-white dark:bg-gray-800"
                    />
                    {form.image && typeof form.image === "object" && (
                      <div className="mt-2">
                        <img
                          src={URL.createObjectURL(form.image)}
                          alt="Preview"
                          className="h-20 rounded-lg object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-primary text-white rounded-lg font-bold hover:bg-blue-700 transition"
                      disabled={loading || formLoading}
                    >
                      {editType ? "Update Type" : "Create Type"}
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

export default RoomTypes;
