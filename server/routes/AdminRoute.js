import express from "express";
import conn from "../util/db.js"; // Import your database connection
import jwt from "jsonwebtoken";
const adminRouter = express.Router();

// admin  route
adminRouter.post("/adminlogin", (req, res) => {
  // SQL query to check if the email and password match
  const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";

  // Execute the query
  conn.query(sql, [req.body.email, req.body.password], (err, results) => {
    if (err) {
      console.error("Query error: " + err);
      return res.status(500).send("An error occurred");
    }

    if (results.length > 0) {
      // User found
      const email = results[0].email;
      const token = jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key",
        { expiresIn: "1d" }
      
      );
      res.cookie("token",token)
      return res.json({loginStatus:true})
    } else {
      // User not found
      return res.json({loginStatus:false,Error:"wrong email or password"})
  
    }
  });
});

// Category list routes
adminRouter.get('/category', (req, res) => {
  const sql = "SELECT * FROM `category`";

  conn.query(sql, (err, results) => {
    if (err) {
      console.error("Query error: " + err);
      return res.status(500).send("An error occurred");
    }

    // Send the results back to the client
    res.json(results);
  });
});

export default adminRouter;
