import { useState } from "react";
import { Home, User, Settings, LogOut, List, Menu, X, ArrowRightLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const PageLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/logout');
      console.log('Logout successful:', response.data);
      // Redirect to login page after logout
      localStorage.removeItem("valid")
      navigate('/adminlogin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation Bar */}
      <div className="w-full bg-[#669bbc] text-white flex items-center justify-between px-4 py-2 shadow-md navbar">
        <div className="flex items-center space-x-4">
          <img src="/logo.svg" alt="Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <nav className="hidden md:flex space-x-6 navbar-center">
          <span className="font-semibold">Employee Management</span>
        </nav>
        <div>{/* Placeholder for any additional top right content */}</div>
        {/* Toggle Button for Mobile */}
        <button
          className="md:hidden p-2 text-white hover:text-[#ff6f61] transition duration-200"
          onClick={handleToggleSidebar}
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div
          className={`fixed md:static top-0 left-0 z-50 w-64 bg-[#669bbc] text-white flex flex-col shadow-md border-r border-gray-300 transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <nav className="mt-10 flex flex-col">
            <Link
              to="/dashboard"
              className="flex items-center py-2 px-6 text-white hover:bg-[#bde0fe] hover:text-[#669bbc] transition duration-200"
            >
              <Home className="w-5 h-5" />
              <span className="mx-4">Dashboard</span>
            </Link>
            <Link
              to="/dashboard/employees"
              className="flex items-center py-2 px-6 text-white hover:bg-[#bde0fe] hover:text-[#669bbc] transition duration-200"
            >
              <User className="w-5 h-5" />
              <span className="mx-4">Employee Management</span>
            </Link>
            <Link
              to="/dashboard/category"
              className="flex items-center py-2 px-6 text-white hover:bg-[#bde0fe] hover:text-[#669bbc] transition duration-200"
            >
              <List className="w-5 h-5" />
              <span className="mx-4">Categories</span>
            </Link>
            <Link
              to="/dashboard/profile"
              className="flex items-center py-2 px-6 text-white hover:bg-[#bde0fe] hover:text-[#669bbc] transition duration-200"
            >
              <Settings className="w-5 h-5" />
              <span className="mx-4">Profile</span>
            </Link>
            <Link
              to="/portal"
              className="flex items-center py-2 px-6 text-white hover:bg-[#bde0fe] hover:text-[#669bbc] transition duration-200"
            >
              <ArrowRightLeft className="w-5 h-5"/>
             
              <span className="mx-4 capitalize">Switch role</span>
            </Link>
          </nav>
          <div className="mt-auto">
            <a
              href="/adminlogin"
              onClick={handleLogout}
              className="flex items-center py-2 px-6 text-white hover:bg-[#bde0fe] hover:text-[#669bbc] transition duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="mx-4">Logout</span>
            </a>
          </div>
        </div>

        {/* Workspace */}
        <div className="flex-1 p-6 bg-[#f0f4f8]">
          {children}
          {/* Add your workspace content here */}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
