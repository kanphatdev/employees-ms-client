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
        { role: "admin", email: email },
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
  const { name, email, password, salary, address, categorytype } = req.body;
  const image = req.file ? req.file.filename : "";

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

export default adminRouter;
