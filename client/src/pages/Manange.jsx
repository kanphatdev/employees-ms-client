import { useEffect, useState } from "react";
import axios from "axios";
import { Edit3, Trash2 } from "lucide-react";
import PageLayout from "./layout";
import { Link } from "react-router-dom";

const Manage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/auth/employees");
        setEmployees(response.data);
      } catch (err) {
        setError("Failed to fetch employees.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:5000/auth/employee/${employeeId}`);
      setEmployees(employees.filter((employee) => employee.id !== employeeId));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEdit = (employeeId) => {
    // Add your edit logic here
    console.log(`Edit employee with ID: ${employeeId}`);
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <PageLayout>
      <div className="flex items-center justify-between p-4">
        <h1 className="text-3xl font-bold mb-6 text-[#457b9d]">Manage Employees</h1>
        <button className="bg-[#ffb07c] text-black py-2 px-6 rounded-md hover:bg-[#e5a186] transition-colors duration-300">
          Add Employee
        </button>
      </div>

      <div className="w-full max-w-4xl overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#ffb07c] text-[#52575D]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium hover:bg-[#e5a186]">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium hover:bg-[#e5a186]">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium hover:bg-[#e5a186]">Image</th>
              <th className="px-6 py-3 text-left text-sm font-medium hover:bg-[#e5a186]">Address</th>
              <th className="px-6 py-3 text-left text-sm font-medium hover:bg-[#e5a186]">Salary</th>
              <th className="px-6 py-3 text-left text-sm font-medium hover:bg-[#e5a186]">Created At</th>
              <th className="px-6 py-3 text-left text-sm font-medium hover:bg-[#e5a186]">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{employee.id}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{employee.name}</td>
                <td className="px-6 py-4">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={employee.image} alt={employee.name} />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{employee.address}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{employee.salary}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(employee.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm text-gray-500 flex space-x-2">
                  <Link to={""}>
                     <button
                    onClick={() => handleEdit(employee.id)}
                    className="flex items-center text-[#457b9d] hover:text-[#52575D] transition-colors duration-300 bg-[#ffb07c] py-1 px-2 rounded-md btn hover:bg-[#e5a186]"
                  >
                    <Edit3 className="mr-1 h-5 w-5" /> Edit
                  </button>
                  
                  </Link>
               
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="flex items-center text-[#e5a186] hover:text-[#41444B] transition-colors duration-300 bg-[#457b9d] py-1 px-2 rounded-md btn hover:bg-[#e5a186]"
                  >
                    <Trash2 className="mr-1 h-5 w-5" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
};

export default Manage;
