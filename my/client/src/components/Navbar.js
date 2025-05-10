import { useState, useRef, useEffect } from "react";
import {
  Menu, X, User, Home, LogIn, FileText, Video, Calendar, Map,
  BarChart, Users, Box, MessageCircle, DollarSign
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // All routes mapped to icons and labels
  const menuItems = [
    { path: "/", label: "Home", icon: <Home size={18} /> },
    { path: "/login", label: "Login", icon: <LogIn size={18} /> },
    { path: "/register", label: "Register", icon: <LogIn size={18} /> },
    { path: "/files", label: "Files", icon: <FileText size={18} /> },
    { path: "/officers", label: "Officers", icon: <Users size={18} /> },
    { path: "/projects", label: "Projects", icon: <Box size={18} /> },
    { path: "/items", label: "Items", icon: <Box size={18} /> },
    { path: "/videos", label: "Videos", icon: <Video size={18} /> },
    { path: "/forum", label: "Forum", icon: <MessageCircle size={18} /> },
    { path: "/calendar", label: "Calendar", icon: <Calendar size={18} /> },
    { path: "/maps", label: "Maps", icon: <Map size={18} /> },
    { path: "/donations", label: "Donations", icon: <DollarSign size={18} /> },
    { path: "/analytics", label: "Analytics", icon: <BarChart size={18} /> },
  ];

  // Dynamic page title
  const currentPage = menuItems.find(item => item.path === location.pathname);

  return (
    <div className="navbar-wrapper">
      {/* Navbar positioned below h1 */}
      <nav className="navbar">
        <div className="navbar-left">
          <button onClick={() => setIsOpen(!isOpen)} className="menu-button">
            <Menu size={28} />
          </button>
          <h2 className="page-title">{currentPage?.label || "EATS"}</h2>
        </div>
        <div className="navbar-right">
          <User size={24} onClick={() => navigate("/profile")} className="profile-icon" />
        </div>
      </nav>

      {/* Side Menu - Grey background matching old hamburger menu */}
      {isOpen && (
        <div ref={menuRef} className="sidebar-menu">
          <button onClick={() => setIsOpen(false)} className="close-button">
            <X size={24} />
          </button>
          <ul className="menu-list">
            {menuItems.map((item) => (
              <li
                key={item.path}
                className={`menu-item ${location.pathname === item.path ? "active" : ""}`}
                onClick={() => { navigate(item.path); setIsOpen(false); }}
              >
                {item.icon}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;