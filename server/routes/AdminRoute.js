import express from "express";
import conn from "../util/db.js"; // Import your database connection
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import multer from "multer";
// import path from "path";

const adminRouter = express.Router();

// Start image upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "Public/Images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage: storage });

// Admin login route
adminRouter.post("/adminlogin", (req, res) => {
  const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";

  conn.query(sql, [req.body.email, req.body.password], (err, results) => {
    if (err) {
      console.error("Query error: " + err);
      return res.status(500).send("An error occurred");
    }

    if (results.length > 0) {
      const email = results[0].email;
      const token = jwt.sign(
        { role: "admin", email: email,id: results[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});

// Category list routes
adminRouter.get("/category", (req, res) => {
  const sql = "SELECT * FROM `category`";

  conn.query(sql, (err, results) => {
    if (err) {
      console.error("Query error: " + err);
      return res.status(500).send("An error occurred");
    }

    res.json(results);
  });
});

// Add categories route
adminRouter.post("/add_category", (req, res) => {
  const { name } = req.body;

  const sql = "INSERT INTO `category` (`name`) VALUES (?)";

  conn.query(sql, [name], (err, results) => {
    if (err) {
      console.error("Query error: " + err);
      return res.status(500).send("An error occurred");
    }

    res.json({ success: true, message: "Category added successfully" });
  });
});

// Add employee route
adminRouter.post("/add_employee", async (req, res) => {
  const { name, email, password, salary, address, categorytype,image } = req.body;


  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO `employee` (`name`, `email`, `password`, `salary`, `address`, `image`, `category_name`) VALUES (?, ?, ?, ?, ?, ?, ?)";

    conn.query(sql, [name, email, hashedPassword, salary, address, image, categorytype], (err, results) => {
      if (err) {
        console.error("Query error: " + err);
        return res.status(500).send("An error occurred");
      }

      res.json({ success: true, message: "Employee added successfully" });
    });
  } catch (error) {
    console.error("Error hashing password: " + error);
    res.status(500).send("An error occurred");
  }
});
// employee list route
adminRouter.get("/employees", (req, res) => {
  const sql = "SELECT * FROM `employee`";

  conn.query(sql, (err, results) => {
    if (err) {
      console.error("Query error: " + err);
      return res.status(500).send("An error occurred");
    }

    res.json(results);
  });
});
// Select employee by ID
adminRouter.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `employee` WHERE id = ?";

  conn.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Query error: " + err);
      return res
        .status(500)
        .json({ error: "An error occurred while querying employee" });
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  });
});

// Edit employee route
adminRouter.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, salary, address, categorytype, image = "" } = req.body;

  const sql =
    "UPDATE `employee` SET `name`= ?, `email`= ?, `salary`= ?, `address`= ?, `image`= ?, `category_name`= ? WHERE id = ?";
  const values = [name, email, salary, address, image, categorytype, id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error("Query error: " + err);
      return res
        .status(500)
        .json({ error: "An error occurred while updating employee" });
    }
    res.json({ success: true, message: "Employee updated successfully" });
  });
});
// Delete employee route
adminRouter.delete('/delete_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM `employee` WHERE id = ?";

  conn.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Query error: " + err);
      return res.status(500).json({ error: "An error occurred while deleting the employee" });
    }

    if (results.affectedRows > 0) {
      res.json({ success: true, message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  });
});


// Count the number of admins route
adminRouter.get("/admin_count", (req, res) => {
  const sql = "SELECT COUNT(id) AS adminCount FROM `admin`";

  conn.query(sql, (err, results) => {
    if (err) {
      console.error("Query error: " + err);
      return res
        .status(500)
        .json({ error: "An error occurred while counting admins" });
    }

    res.json({ adminCount: results[0].adminCount });
  });
});

// Count the number of employees route
adminRouter.get("/employees_count", (req, res) => {
  const sql = "SELECT COUNT(id) AS employeeCount FROM `employee`";

  conn.query(sql, (err, results) => {
    if (err) {
      console.error("Query error: " + err);
      return res
        .status(500)
        .json({ error: "An error occurred while counting employees" });
    }

    res.json({ employeeCount: results[0].employeeCount });
  });
});

// Count the total salary route
adminRouter.get("/salary_count", (req, res) => {
  const sql = "SELECT SUM(salary) AS totalSalary FROM employee";

  conn.query(sql, (err, results) => {
    if (err) {
      console.error("Query error: " + err);
      return res.status(500).json({
        error: "An error occurred while calculating the total salary",
      });
    }

    res.json({ totalSalary: results[0].totalSalary });
  });
});

// Admins route
adminRouter.get("/admins", (req, res) => {
  const sql = "SELECT * FROM `admin`";

  conn.query(sql, (err, results) => {
    if (err) {
      console.error("Query error: " + err);
      return res
        .status(500)
        .json({ error: "An error occurred while querying admins" });
    }

    res.json(results);
  });
});
// Add admin route (without password hashing)
adminRouter.post("/add_admin", (req, res) => {
  const { email, password } = req.body;

  const sql = "INSERT INTO `admin` (`email`, `password`) VALUES (?, ?)";

  conn.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Query error: " + err);
      return res.status(500).json({ error: "An error occurred while adding the admin" });
    }

    res.json({ success: true, message: "Admin added successfully" });
  });
});

// Select admin by ID
adminRouter.get("/admin/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `admin` WHERE id = ?";

  conn.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Query error: " + err);
      return res.status(500).json({ error: "An error occurred while querying admin" });
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  });
});

// Edit admin route
adminRouter.put("/edit_admin/:id", (req, res) => {
  const id = req.params.id;
  const { email, password } = req.body;

  const sql = "UPDATE `admin` SET `email` = ?, `password` = ? WHERE id = ?";
  const values = [email, password, id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.error("Query error: " + err);
      return res
        .status(500)
        .json({ error: "An error occurred while updating admin" });
    }

    res.json({ success: true, message: "Admin updated successfully" });
  });
});
// Delete admin route
adminRouter.delete('/delete_admin/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM `admin` WHERE id = ?";

  conn.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Query error: " + err);
      return res.status(500).json({ error: "An error occurred while deleting the admin" });
    }

    if (results.affectedRows > 0) {
      res.json({ success: true, message: "Admin deleted successfully" });
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  });
});


// Logout route
adminRouter.get("/logout", (req, res) => {
  res.clearCookie("token"); // Adjusted to clear the "token" cookie
  return res.json({ status: true, message: "Logged out successfully" });
});
export default adminRouter;
