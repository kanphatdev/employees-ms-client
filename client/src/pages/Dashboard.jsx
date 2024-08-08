import { useEffect, useState } from "react";
import PageLayout from "./layout";
import axios from "axios";
import { CreditCard, UserCheck, UserCog, UserPen, UserPlus } from "lucide-react";

const Dashboard = () => {
  const [AdminTotal, setAdminTotal] = useState(0);
  const [EmployeeTotal, setEmployeeTotal] = useState(0);
  const [SalaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    Countadmin();
    Countemployee();
    Countsalary();
    fetchAdmins();
  }, []);

  const Countadmin = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/admin_count");
      setAdminTotal(response.data.adminCount);
    } catch (error) {
      console.error("Error fetching admin count: ", error);
    }
  };

  const Countemployee = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/employees_count");
      setEmployeeTotal(response.data.employeeCount);
    } catch (error) {
      console.error("Error fetching employee count: ", error);
    }
  };

  const Countsalary = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/salary_count");
      const totalSalary = response.data.totalSalary;
      const formattedSalary = new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
      }).format(totalSalary);
      setSalaryTotal(formattedSalary);
    } catch (error) {
      console.error("Error fetching salary total: ", error);
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

  return (
    <PageLayout>
      <section className="flex flex-wrap items-center justify-center">
        <div className="w-full md:w-1/3 p-2">
          <div className="stat place-items-center w-full bg-primary text-white p-4 rounded-lg shadow-md">
            <UserPlus className="text-white" />
            <div className="stat-title capitalize">Employee</div>
            <div className="stat-value">{EmployeeTotal}</div>
          </div>
        </div>

        <div className="w-full md:w-1/3 p-2">
          <div className="stat place-items-center w-full bg-secondary text-white p-4 rounded-lg shadow-md">
            <UserCog className="text-white" />
            <div className="stat-title capitalize">Admin</div>
            <div className="stat-value">{AdminTotal}</div>
          </div>
        </div>

        <div className="w-full md:w-1/3 p-2">
          <div className="stat place-items-center w-full bg-accent text-white p-4 rounded-lg shadow-md">
            <CreditCard className="text-white" />
            <div className="stat-title capitalize">Salary</div>
            <div className="stat-value">{SalaryTotal}</div>
          </div>
        </div>
      </section>

      <section className="mt-4 px-4 md:px-5 pt-3">
        <div className="justify-start">
          <h1 className="text-3xl md:text-5xl font-bold capitalize text-neutral">
            List of Admin
          </h1>
        </div>
        <div className="overflow-x-auto pt-4">
          <table className="table w-full shadow-lg border border-gray-200 rounded-lg">
            <thead className="bg-primary text-white rounded-t-lg">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr key={admin.id} className="bg-white border-b">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{admin.email}</td>
                  <td className="p-4">
                    <div className="flex gap-4 items-center justify-center">
                      <button className="btn bg-primary text-white hover:bg-secondary p-2 rounded">
                        <UserCheck />
                      </button>
                      <button className="btn bg-neutral text-white hover:bg-neutral-dark p-2 rounded">
                        <UserPen />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageLayout>
  );
};

export default Dashboard;
