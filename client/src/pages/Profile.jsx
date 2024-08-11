import PageLayout from "./layout";
import { CircleUserRound, LogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/logout');
      console.log('Logout successful:', response.data);
      // Redirect to login page after logout
      navigate('/adminlogin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/admins");
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching admins: ", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Extract the first admin's data if available
  const admin = admins[0];

  // Function to extract initials from the name
  const getInitials = (name) => {
    if (!name) return "A"; // Default to "A" if the name is not available
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    return initials;
  };

  return (
    <PageLayout>
      <main className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-10 w-96 card">
          <div className="flex justify-center mb-4">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-24 rounded-full">
                <span className="text-3xl text-white">
                  {admin ? getInitials(admin.name) : "A"}
                </span>
              </div>
            </div>
          </div>
          <div className="text-center card-body">
            {admin ? (
              <>
                <h2 className="text-2xl font-semibold text-neutral-900">{admin.name}</h2>
                <p className="text-sm text-neutral-600 text-center flex items-center justify-center gap-2">
                  <CircleUserRound className="text-neutral" />
                  <span>{admin.email}</span>
                </p>
              </>
            ) : (
              <p className="text-sm text-neutral-600">Loading...</p>
            )}
            <div className="card-actions justify-between mt-4">
              <button
                className="btn bg-neutral text-white hover:bg-neutral-400 p-2 rounded-md capitalize hover:text-neutral"
                onClick={handleBack}
              >
                Cancel
              </button>
              <button
                className="btn bg-tertiary text-white hover:bg-accent p-2 rounded-md"
                onClick={handleLogout}
              >
                <LogOut className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Profile;
