import express from "express";
import cors from "cors";
import adminRouter from "./routes/AdminRoute.js"; // Import the admin route
import employeeRouter from "./routes/EmployeeRoute.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const app = express();
const port = 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// Use the routes from routes folder
app.use("/auth", adminRouter);
app.use("/employee", employeeRouter);

// add static for the image
// app.use(express.static('Public'));
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err) return res.json({ Status: false, Error: "wrong token" });
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  } else {
    return res.json({ Status: false, Error: "not authenticated" });
  }
};
app.get("/verify", verifyUser, (req, res) => {
    return res.json({Status: true, role: req.role,id: req.id})
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
