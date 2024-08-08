import { useEffect, useState } from "react";
import PageLayout from "./layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const employeeResponse = await axios.get(`http://localhost:5000/auth/employee/${id}`);
        const employee = employeeResponse.data;
        setName(employee.name);
        setEmail(employee.email);
        setSalary(employee.salary);
        setAddress(employee.address);
        setCategory(employee.category_name);
        setImage(employee.image);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch employee data.");
        console.error(err);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoriesResponse = await axios.get("http://localhost:5000/auth/category");
        setCategories(categoriesResponse.data);
      } catch (err) {
        setError("Failed to fetch categories.");
        console.error(err);
      }
    };

    fetchEmployee();
    fetchCategories();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/auth/edit_employee/${id}`, {
        name,
        email,
        salary,
        address,
        category_name: category,
        image,
      });
      navigate("/dashboard/employees");
    } catch (err) {
      setError("Failed to update employee data.");
      console.error(err);
    }
  };

  return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-[#e5a186]">Edit Employee</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-[#e5a186] mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb07c]"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#e5a186] mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb07c]"
                  required
                />
              </div>

              <div>
                <label htmlFor="salary" className="block text-[#e5a186] mb-2">Salary</label>
                <input
                  type="number"
                  id="salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb07c]"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-[#e5a186] mb-2">Address</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb07c]"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-[#e5a186] mb-2">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb07c]"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="image" className="block text-[#e5a186] mb-2">Image URL</label>
                <input
                  type="text"
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb07c]"
                  placeholder="Enter image URL"
                />
              </div>

              <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-gray-400 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#e5a186] text-black py-2 px-6 rounded-md hover:bg-[#ffb07c] transition-colors duration-300"
                >
                  Update Employee
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default EditEmployee;
