import { Link } from "react-router-dom";
import PageLayout from "./layout";

const Manange = () => {
  return (
    <PageLayout>
      <div className="flex  items-center justify-between  p-4">
        <h1 className="text-3xl font-bold mb-6 text-[#457b9d]">Manage Employees</h1>
        
        <Link to="/dashboard/add_employee">
          <button className="bg-[#ffb07c] text-black py-2 px-6 rounded-md hover:bg-[#e5a186] transition-colors duration-300">
            Add Employee
          </button>
        </Link>
      </div>
    </PageLayout>
  );
};

export default Manange;
