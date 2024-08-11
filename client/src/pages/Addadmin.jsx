import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageLayout from "./layout";

const AddAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/add_admin", {
        email,
        password,
      });

      if (response.data.success) {
        console.log("Admin added successfully");
        navigate("/dashboard");
      } else {
        setError("Failed to add admin");
      }
    } catch (error) {
      console.error("Error adding admin:", error);
      setError("An error occurred");
    }
  };

  return (
    <PageLayout>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#457b9d" }}>Add Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" style={{ color: "#52575D" }}>
              Username (Email)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
              style={{ borderColor: "#e5a186", color: "#52575D", backgroundColor: "#fff" }}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" style={{ color: "#52575D" }}>
              Password
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none"
              style={{ borderColor: "#e5a186", color: "#52575D", backgroundColor: "#fff" }}
              required
            />
          </div>
          {error && <p className="text-sm mb-4" style={{ color: "#e63946" }}>{error}</p>}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-md hover:bg-gray-600"
              style={{ backgroundColor: "#52575D", color: "#fff" }}
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md hover:bg-primary-600"
              style={{ backgroundColor: "#ffb07c", color: "#fff" }}
            >
              Add Admin
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default AddAdmin;
