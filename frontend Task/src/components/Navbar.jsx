import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-blue-600 text-white flex justify-between items-center px-6 py-3">
      <h1 className="text-lg font-bold cursor-pointer" onClick={() => navigate("/dashboard")}>
        Task Manager
      </h1>

      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="cursor-pointer bg-white text-blue-600 px-3 py-1 rounded-full"
        >
          👤
        </div>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded">
            <div
              onClick={() => navigate("/profile")}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              Profile
            </div>

            <div
              onClick={logout}
              className="p-2 hover:bg-gray-100 cursor-pointer text-red-500"
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
