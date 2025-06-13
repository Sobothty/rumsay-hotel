import { useEffect, useState } from "react";
import axios from "axios";
import { Users } from "lucide-react";

export default function DashboardHome() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [rooms, setRooms] = useState([]); // <-- add this line
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/regularUsers`
    );
    const fetchRooms = axios.get(`${import.meta.env.VITE_BASE_URL}/api/rooms`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    Promise.all([fetchUsers, fetchRooms])
      .then(([userRes, roomRes]) => {
        // Users
        const allUsers = userRes.data.data;
        setData(allUsers);
        setCount(Array.isArray(allUsers) ? allUsers.length : 0);

        // Rooms
        const allRooms = roomRes.data.data;
        setRoomCount(Array.isArray(allRooms) ? allRooms.length : 0);
        setRooms(Array.isArray(allRooms) ? allRooms : []);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setError("Failed to load data.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid"></div>
      </div>
    );

  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-200 via-blue-100 to-blue-400 dark:from-blue-900 dark:via-gray-800 dark:to-blue-900 rounded-2xl shadow-xl p-7 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 border border-blue-300 dark:border-blue-800 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 opacity-10 text-blue-400 dark:text-blue-200 pointer-events-none">
            <Users size={120} />
          </div>
          <div className="flex items-center gap-3 z-10">
            <div className="bg-blue-500 dark:bg-blue-700 rounded-full p-3 shadow-lg">
              <Users size={36} className="text-white" />
            </div>
            <span className="text-5xl font-extrabold text-blue-700 dark:text-blue-200 drop-shadow-lg">
              {count}
            </span>
          </div>
          <span className="mt-4 text-lg font-semibold text-blue-900 dark:text-blue-100 tracking-wide z-10">
            Regular Users
          </span>
        </div>
        {/* Room Count Card */}
        <div className="bg-gradient-to-br from-green-200 via-green-100 to-green-400 dark:from-green-900 dark:via-gray-800 dark:to-green-900 rounded-2xl shadow-xl p-7 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 border border-green-300 dark:border-green-800 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 opacity-10 text-green-400 dark:text-green-200 pointer-events-none">
            {/* You can use another Lucide icon if you want */}
            <svg
              width="120"
              height="120"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-green-400 dark:text-green-200"
            >
              <rect x="3" y="7" width="18" height="13" rx="2" strokeWidth="2" />
              <path d="M16 3v4M8 3v4M3 11h18" strokeWidth="2" />
            </svg>
          </div>
          <div className="flex items-center gap-3 z-10">
            <div className="bg-green-500 dark:bg-green-700 rounded-full p-3 shadow-lg">
              {/* Use a Lucide icon for room/bed/door if available */}
              <svg
                width="36"
                height="36"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="text-white"
              >
                <rect
                  x="3"
                  y="7"
                  width="18"
                  height="13"
                  rx="2"
                  strokeWidth="2"
                />
                <path d="M16 3v4M8 3v4M3 11h18" strokeWidth="2" />
              </svg>
            </div>
            <span className="text-5xl font-extrabold text-green-700 dark:text-green-200 drop-shadow-lg">
              {roomCount}
            </span>
          </div>
          <span className="mt-4 text-lg font-semibold text-green-900 dark:text-green-100 tracking-wide z-10">
            Rooms
          </span>
        </div>
        {/* Add more animated cards/widgets here as needed */}
      </div>
      <div className="transition-all duration-500 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User List */}
        <div>
          <h2 className="text-lg font-semibold mb-4">User List</h2>
          <div
            className="overflow-x-auto rounded-lg shadow"
            style={{ maxHeight: "336px", overflowY: "auto" }} // 7 rows * 48px
          >
            <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
                    Email
                  </th>
                  {/* Removed Role column */}
                </tr>
              </thead>
              <tbody>
                {data.map((user, idx) => (
                  <tr
                    key={user._id}
                    className="transition-colors duration-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                    style={{
                      animation: `fadeInUp 0.4s ease ${idx * 0.05}s both`,
                      height: "48px",
                    }}
                  >
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    {/* Removed Role cell */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Room List */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Room List</h2>
          <div
            className="overflow-x-auto rounded-lg shadow"
            style={{ maxHeight: "336px", overflowY: "auto" }} // 7 rows * 48px
          >
            <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
                    Room Name
                  </th>
                  <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
                    Price
                  </th>
                  <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room, idx) => (
                  <tr
                    key={room.id || room._id || idx}
                    className="transition-colors duration-300 hover:bg-green-50 dark:hover:bg-gray-800"
                    style={{
                      animation: `fadeInUp 0.4s ease ${idx * 0.05}s both`,
                      height: "48px",
                    }}
                  >
                    <td className="px-4 py-2">
                      {room.room_number || `Room ${idx + 1}`}
                    </td>
                    <td className="px-4 py-2">{room.room_type?.type || "-"}</td>
                    <td className="px-4 py-2">
                      {room.room_type?.price ? `$${room.room_type.price}` : "-"}
                    </td>
                    <td className="px-4 py-2">
                      {room.is_active ? (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-700">
                          Available
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-700">
                          Inactive
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Add more dashboard widgets/components here */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fadeInUp 0.7s cubic-bezier(.4,0,.2,1) both;
          }
        `}
      </style>
    </div>
  );
}
