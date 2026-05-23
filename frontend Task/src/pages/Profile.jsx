import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setUser(res.data);
      } catch (err) {
        alert("Unauthorized");
        navigate("/");
      }
    };

    fetchProfile();
  }, []);

  // Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put("/auth/profile", user);
      alert("Profile Updated");
    } catch (err) {
      alert("Update Failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>

      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">

        <form onSubmit={handleUpdate} className="bg-white p-6 rounded-xl shadow-md w-80">
          <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>

          <input
            type="text"
            value={user.name}
            className="w-full mb-3 p-2 border rounded"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <input
            type="email"
            value={user.email}
            className="w-full mb-3 p-2 border rounded"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <button className="w-full bg-blue-500 text-white py-2 rounded mb-2">
            Update
          </button>

          <button
            type="button"
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 rounded"
          >
            Logout
          </button>
        </form>
      </div>
    
    </>
  );
}

export default Profile;