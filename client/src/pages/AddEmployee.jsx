import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import PageLayout from "./layout";
import axios from "axios";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [categorytype, setCategoryType] = useState([]);
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);
  const [isCategoryAccordionOpen, setIsCategoryAccordionOpen] = useState(false);
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
    const { name, value } = e.target;
    console.log(`Field changed: ${name} = ${value}`);
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "salary":
        setSalary(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "image":
        setImage(value);
        break;
      default:
        break;
    }
  };

  const handleCategoryChange = (category) => {
    setCategoryType((prevCategoryType) =>
      prevCategoryType.includes(category)
        ? prevCategoryType.filter((c) => c !== category)
        : [...prevCategoryType, category]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/add_employee", {
        name,
        email,
        password,
        salary,
        address,
        categorytype,
        image,
      });

      console.log("Employee added successfully:", response.data);
      navigate("/dashboard/employees"); // Redirect upon successful form submission
    } catch (error) {
      console.error("Error adding employee:", error);
      // Optionally, you can set an error state to show an error message to the user
    }
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
                value={name}
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
                type="email"
                id="email"
                name="email"
                value={email}
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
                value={password}
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
                value={salary}
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
                value={address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#669bbc]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-[#457b9d] mb-2 cursor-pointer flex items-center"
                onClick={() => setIsCategoryAccordionOpen(!isCategoryAccordionOpen)}
              >
                Category
                {isCategoryAccordionOpen ? (
                  <ChevronUp className="ml-2 h-5 w-5 text-[#457b9d]" />
                ) : (
                  <ChevronDown className="ml-2 h-5 w-5 text-[#457b9d]" />
                )}
              </label>
              <div
                className={`p-4 rounded-md transition-all duration-300 ${
                  isCategoryAccordionOpen ? "bg-[#f1f5f9]" : "bg-transparent"
                }`}
              >
                {isCategoryAccordionOpen && (
                  <div className="flex flex-wrap">
                    {categories.map((category) => (
                      <div key={category.id} className="mr-4 mb-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="category"
                            value={category.id}
                            checked={categorytype.includes(category.id)}
                            onChange={() => handleCategoryChange(category.id)}
                            className="form-checkbox h-5 w-5 text-[#669bbc]"
                          />
                          <span className="ml-2 text-[#457b9d]">{category.name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="image" className="block text-[#457b9d] mb-2">
                Image
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={image}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#669bbc]"
                required
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
