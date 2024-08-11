import React, { useState } from 'react';
import { Lock, User } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    axios
      .post("http://localhost:5000/employee/employee_login", values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid",true)
          navigate("/employee_detail/" + result.data.id);
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Login failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <img src="./logo.svg" alt="Logo" width={50} height={50} />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 capitalize" style={{ color: "#52575D" }}>
          Employee Login
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
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}
          <button
            type="submit"
            className={`w-full ${
              loading ? "bg-[#ffb07c]" : "bg-[#e5a186]"
            } text-white py-2 rounded-lg hover:bg-[#457b9d] transition duration-200`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-sm mt-4 capitalize" style={{ color: "#52575D" }}>
          Switch role{" "}
          <a href="/adminlogin" className="text-[#669bbc] hover:underline">
            admin side
          </a>
        </p>
      </div>
    </div>
  );
};

export default EmployeeLogin;
