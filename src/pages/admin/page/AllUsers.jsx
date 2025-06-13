import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/regularUsers`
      );
      setUsers(Array.isArray(res.data.data) ? res.data.data : []);
    } catch {
      setUsers([]);
    }
    setLoading(false);
  };

  // Open modal for create/edit
  const openModal = (user = null) => {
    setError("");
    setEditUser(user);
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        gender: user.gender || "",
        password: "",
        password_confirmation: "",
      });
    } else {
      setForm({
        name: "",
        email: "",
        gender: "",
        password: "",
        password_confirmation: "",
      });
    }
    setShowModal(true);
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create or update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editUser) {
        // Update
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/api/regularUsers/${editUser.id}`,
          {
            name: form.name,
            email: form.email,
            gender: form.gender,
            ...(form.password
              ? {
                  password: form.password,
                  password_confirmation: form.password_confirmation,
                }
              : {}),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
      } else {
        // Create
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/regularUsers`,
          form,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
      }
      await fetchUsers();
      setShowModal(false);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to save user. Please check your input."
      );
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/regularUsers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to delete user. Please try again."
      );
    }
  };

  // Filter users by search (case-insensitive)
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Regular Users</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg outline-none bg-white dark:bg-gray-800 dark:text-gray-100 text-sm"
              />
              <Search
                size={18}
                className="absolute left-2 top-2.5 text-gray-400"
              />
            </div>
          </div>
        </div>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
                    Gender
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-4 py-2 font-semibold">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2 capitalize">{user.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
