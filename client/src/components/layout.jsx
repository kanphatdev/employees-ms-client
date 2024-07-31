import React from 'react'
import { Home, User, Settings, LogOut, List } from "lucide-react";
import { Link } from "react-router-dom";
const PageLayout = ({children}) => {
  return (
    <div className="flex flex-col h-screen">
    {/* Top Navigation Bar */}
    <div className="w-full bg-[#a2d2ff] text-[#001f3f] flex items-center justify-between px-4 py-2 shadow-md navbar">
      <div className="flex items-center space-x-4">
        <img src="/logo.svg" alt="Logo" className="h-10 w-10" />
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      <nav className="flex space-x-6 navbar-center">
        <span className="font-semibold">Employee Management</span>
      </nav>
      <div>
        <a href="#" className="flex items-center text-[#001f3f] hover:text-[#ff6f61] transition duration-200">
          <LogOut className="w-5 h-5 mr-2" />
          <span>Logout</span>
        </a>
      </div>
    </div>

    {/* Main Content Area */}
    <div className="flex flex-grow">
      {/* Sidebar */}
      <div className="w-64 bg-[#669bbc] text-white flex flex-col shadow-md">
        <nav className="mt-10 flex flex-col">
          <Link
            to="/dashboard"
            className="flex items-center py-2 px-6 text-white hover:bg-[#bde0fe] hover:text-[#669bbc] transition duration-200"
          >
            <Home className="w-5 h-5" />
            <span className="mx-4">Dashboard</span>
          </Link>
          <Link
            to="/dashboard/manange"
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
        </nav>
        <div className="mt-auto">
          <a
            href="#"
            className="flex items-center py-2 px-6 text-white hover:bg-[#bde0fe] hover:text-[#669bbc] transition duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="mx-4">Logout</span>
          </a>
        </div>
      </div>

      {/* Workspace */}
      <div className="flex-1 p-6 bg-gray-100">
      {children}
     
        {/* Add your workspace content here */}
      </div>
    </div>
  </div>
  )
}

export default PageLayout