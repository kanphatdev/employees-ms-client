import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/employee/verify")
      .then((result) => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/employee_detail/" + result.data.id);
          }
        } else {
          navigate("/portal");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>App</div>;
};

export default App;
