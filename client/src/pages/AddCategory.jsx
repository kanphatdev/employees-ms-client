import { useNavigate } from "react-router-dom";
import PageLayout from "./layout";
import { useState } from "react";
import axios from "axios";
import { ArrowLeftFromLine } from "lucide-react";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:5000/auth/add_category", { name: categoryName });
      // Optionally handle success (e.g., show a success message, navigate to another page, etc.)
      navigate("/dashboard/category"); // Redirect to the categories list page
    } catch (err) {
      setError("Failed to add category.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-4xl mx-auto p-6 md:p-12 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#457b9d]">Add Category</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="categoryName" className="block text-[#457b9d] mb-2">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#669bbc]"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0 md:space-x-4">
              <button
                type="button"
                onClick={handleBack}
                className="w-full md:w-1/3 bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-gray-400 transition-colors duration-300 flex items-center justify-center"
              >
                <ArrowLeftFromLine className="h-5 w-5 mr-2" />
                Back
              </button>
              <button
                type="submit"
                className="w-full md:w-2/3 bg-[#ffb07c] text-black py-2 px-6 rounded-md hover:bg-[#e5a186] transition-colors duration-300"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Category"}
              </button>
            </div>
            {error && <p className="mt-4 text-red-600">{error}</p>}
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default AddCategory;
