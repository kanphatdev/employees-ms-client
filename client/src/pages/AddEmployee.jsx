import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "./layout";
import axios from "axios";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category: "",
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/category");
        setCategories(response.data);
      } catch (err) {
        setErrorCategories("Failed to fetch categories.");
        console.error(err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form Data Submitted:", formData);
  };

  if (loadingCategories) return <div>Loading categories...</div>;
  if (errorCategories) return <div>{errorCategories}</div>;

  return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-3xl mx-auto p-6 md:p-12 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#457b9d]">
            Add Employee
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-[#457b9d] mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#669bbc]"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[#457b9d] mb-2">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#669bbc]"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[#457b9d] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#669bbc]"
                required
              />
            </div>

            <div>
              <label htmlFor="salary" className="block text-[#457b9d] mb-2">
                Salary
              </label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#669bbc]"
                required
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-[#457b9d] mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#669bbc]"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-[#457b9d] mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#669bbc]"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="image" className="block text-[#457b9d] mb-2">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="file-input file-input-ghost w-full max-w-xs"
              />
            </div>

            <div className="flex justify-between space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-gray-400 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#ffb07c] text-black py-2 px-6 rounded-md hover:bg-[#e5a186] transition-colors duration-300"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default AddEmployee;
