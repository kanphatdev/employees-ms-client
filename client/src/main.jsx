import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Manange from './pages/Manange.jsx';
import Category from './pages/Category.jsx';
import Profile from './pages/Profile.jsx';
import AddCategory from './pages/AddCategory.jsx';
import AddEmployee from './pages/AddEmployee.jsx';
import EditEmployee from './pages/EditEmployee.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/adminlogin",
    element: <Login/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/dashboard/employees",
    element: <Manange/>,
  },
  {
    path: "/dashboard/category",
    element: <Category/>,
  },
  {
    path: "/dashboard/profile",
    element: <Profile/>,
  },
  {
    path: "/dashboard/add_category",
    element: <AddCategory/>,
  },
  {
    path: "/dashboard/add_category",
    element: <AddCategory/>,
  },
  {
    path: "/dashboard/add_employee",
    element: <AddEmployee/>,
  },
  {
    path: "/dashboard/edit_employee/:id",
    element: <EditEmployee/>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
