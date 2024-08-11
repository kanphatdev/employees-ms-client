import express from "express";
import conn from "../util/db.js"; // Import your database connection
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const employeeRouter = express.Router();

// employee log in routes
employeeRouter.post("/employee_login", (req, res) => {
  const sql = "SELECT * FROM `employee` WHERE email = ?";

  conn.query(sql, [req.body.email], (err, results) => {
    if (err) {
      console.error("Query error: " + err);
      return res.status(500).send("An error occurred");
    }

    if (results.length > 0) {
      bcrypt.compare(
        req.body.password,
        results[0].password,
        (err, response) => {
          if (err) {
            console.error("Query error: " + err);
            return res.status(500).send("An error occurred");
          }
          if (response) {
            const email = results[0].email;
            const token = jwt.sign(
              { role: "employee", email: email,id: results[0].id },
              "jwt_secret_key",
              { expiresIn: "1d" }
            );
            res.cookie("token", token);
            return res.json({ loginStatus: true, id: results[0].id });
          }
        }
      );
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});
// Select employee details by ID route
employeeRouter.get('/employee_detail/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `employee` WHERE id = ?";

  conn.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Query error: " + err);
      return res.status(500).send("An error occurred");
    }

    if (results.length > 0) {
      return res.json(results[0]); // Send the first result (employee details)
    } else {
      return res.status(404).send("Employee not found");
    }
  });
});
// Logout route
employeeRouter.get("/logout", (req, res) => {
  res.clearCookie("token"); // Adjusted to clear the "token" cookie
  return res.json({ status: true, message: "Logged out successfully" });
});
export default employeeRouter;
