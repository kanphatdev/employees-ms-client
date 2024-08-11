import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PageLayout from "./layout";

const EditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/auth/admin/${id}`
        );
        setAdminData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch admin data");
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [id]);

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/auth/edit_admin/${id}`, adminData);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to update admin");
    }
  };

  if (loading) {
    return <PageLayout>Loading...</PageLayout>;
  }

  if (error) {
    return <PageLayout>{error}</PageLayout>;
  }

  return (
    <PageLayout>
      <div className="flex items-center justify-center h-screen">
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="text-2xl font-semibold text-neutral mb-6 card-title">
              Edit Admin
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={adminData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-secondary focus:border-secondary sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-neutral"
                >
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  value={adminData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-secondary focus:border-secondary sm:text-sm"
                  required
                />
              </div>

              <div className="flex items-center justify-between card-actions">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-neutral bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default EditAdmin;
