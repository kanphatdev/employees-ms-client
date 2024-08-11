import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Banknote, Mails } from "lucide-react";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/employee/employee_detail/${id}`)
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the employee details!",
          error
        );
        setError("Failed to load employee details.");
        setLoading(false);
      });
  }, [id]);
  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employee/logout');
      console.log('Logout successful:', response.data);
      // Redirect to login page after logout
      localStorage.removeItem("valid")
      navigate('/portal');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return <div className="text-center text-red-500 mt-6">{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {employee ? (
          <div className="card">
            <div className="flex justify-center mb-6">
              <img
                src={employee.image}
                alt={employee.name}
                className="w-24 h-24 rounded-full shadow-md object-cover"
              />
            </div>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-xl font-bold text-neutral">
                {employee.name}
              </h2>
              <p className="flex items-center gap-2 text-sm text-accent">
                <Mails className="text-tertiary" /> {employee.email}
              </p>
              <p className="flex items-center gap-2 text-sm text-neutral">
                <Banknote className="text-emerald-500" /> {employee.salary}
              </p>
            </div>
            <div className="card-actions flex justify-between mt-6">
              <button className="px-4 py-2 rounded-lg text-white bg-neutral hover:bg-tertiary" onClick={handleLogout}>
                Log Out
              </button>
              <Link to={`/dashboard/edit_employee/${employee.id}`}>
                <button className="px-4 py-2 rounded-lg bg-primary text-neutral hover:bg-tertiary hover:text-white">
                  Edit
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No employee data available.
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetail;
