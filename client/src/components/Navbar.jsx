import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/users/userInfo",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else if (response.status === 401) {
          console.warn("Token expired. Logging out...");
          logout();
          navigate("/login");
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    if (isLoggedIn) {
      fetchUser();
    }
  }, [isLoggedIn, navigate, logout]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "FAQs", path: "/faqs" },
    { name: "Submit Complaints", path: "/complaints" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className=" text-white px-8 py-4 flex justify-between items-center shadow-md"
     style={{ backgroundColor: "#83a2d4" }}>
      <Link to={"/"} className="text-2xl font-bold">e-Jansamvad</Link>

      <nav className="relative">
        <ul className="flex space-x-6 relative">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="relative cursor-pointer px-4 py-2 transition group"
              onClick={() => setActive(item.name)}
            >
              {/* Capsule Effect (Stays when active) */}
              <span
                className={`absolute inset-0 bg-white rounded-full transition-all duration-300 ease-in-out 
                  ${
                    active === item.name
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  }`}
              ></span>
              {/* Menu Item Text */}
              <Link to={item.path}>
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    active === item.name ? "text-blue-900" : "group-hover:text-blue-900"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        {isLoggedIn ? (
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="bg-white text-blue-900 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-blue-900 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
