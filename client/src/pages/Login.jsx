import { useState } from "react";
import { Lock, User } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // For error handling
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();
  axios.defaults.withCredentials = true; // Store credentials

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the request
    setError(""); // Clear previous errors

    axios
      .post("http://localhost:5000/auth/adminlogin", values)
      .then((result) => {
        console.log(result);
        if (result.data.loginStatus) {
          localStorage.setItem("valid",true)
          navigate("/dashboard");
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Login failed. Please try again."); // Set error message
      })
      .finally(() => {
        setLoading(false); // Set loading to false after request completes
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <img src="./logo.svg" alt="Logo" width={50} height={50} />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 capitalize" style={{ color: "#52575D" }}>
        admin  Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium" style={{ color: "#52575D" }}>
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3" style={{ color: "#457b9d" }}>
                <User />
              </span>
              <input
                type="email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                className="w-full py-2 px-3 focus:outline-none"
                placeholder="Enter your email"
                required
                autoComplete="off"
                name="email"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium" style={{ color: "#52575D" }}>
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3" style={{ color: "#457b9d" }}>
                <Lock />
              </span>
              <input
                type="password"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                className="w-full py-2 px-3 focus:outline-none"
                placeholder="Enter your password"
                required
                name="password"
              />
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p> // Display error message
          )}
          <button
            type="submit"
            className={`w-full ${
              loading ? "bg-[#ffb07c]" : "bg-[#e5a186]"
            } text-white py-2 rounded-lg hover:bg-[#457b9d] transition duration-200`}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-sm mt-4 capitalize" style={{ color: "#52575D" }}>
         switch role{" "}
          <a href="/employee_login" className="text-[#669bbc] hover:underline">
            employee side
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
