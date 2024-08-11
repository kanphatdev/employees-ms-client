import React from 'react'
import ReactDOM from 'react-dom/client'

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
import Start from './pages/Start.jsx';
import EmployeeLogin from './pages/EmployeeLogin.jsx';
import EmployeeDetail from './pages/EmployeeDetail.jsx';
import Addadmin from './pages/Addadmin.jsx';
import EditAdmin from './pages/Editadmin.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start/>,
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
  {
    path: "/employee_login",
    element: <EmployeeLogin/>,
  },
  {
    path: "/portal",
    element: <Start/>,
  },
  {
    path: "/employee_detail/:id",
    element: <EmployeeDetail/>,
  },
  {
    path: "/dashboard/add_admin",
    element: <Addadmin/>,
  },
  {
    path: "/dashboard/edit_admin/:id",
    element: <EditAdmin/>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <RouterProvider router={router} />
  </React.StrictMode>
);
