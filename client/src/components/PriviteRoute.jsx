import { Navigate } from "react-router-dom"


const PriviteRoute = ({ children }) => {
  return  localStorage.removeItem("valid") ? children : <Navigate to={"/"}/>
}

export default PriviteRoute