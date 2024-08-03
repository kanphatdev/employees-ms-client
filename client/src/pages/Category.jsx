import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PageLayout from "./layout";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/category");
        setCategories(response.data);
      } catch (err) {
        setError("Failed to fetch categories.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Formats to 'MM/DD/YYYY, HH:MM:SS AM/PM'
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center py-8">
        <div className="flex items-center justify-between w-full max-w-4xl mb-8">
          <h1 className="text-5xl font-bold capitalize text-[#669bbc]">
            Categories List
          </h1>
          <Link to="/dashboard/add_category">
            <button className="btn capitalize bg-[#ffb07c] text-black hover:bg-[#e5a186] py-2 px-4 rounded-md transition-colors duration-300">
              Add Category
            </button>
          </Link>
        </div>

        {/* Categories Table */}
        <div className="w-full max-w-4xl overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#669bbc] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium hover:bg-[#457b9d]">
                  Category Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium hover:bg-[#457b9d]">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="hover:bg-[#f1f5f9]"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 uppercase">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(category.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
};

export default Category;
