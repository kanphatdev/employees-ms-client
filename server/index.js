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

// Middleware function to verify the user's JWT
const verifyUser = (req, res, next) => {
  // Retrieve the token from the cookies
  const token = req.cookies.token;

  // If a token is present
  if (token) {
    // Verify the token using the secret key
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      // If the token is invalid or there's an error, send a response indicating failure
      if (err) return res.json({ Status: false, Error: "wrong token" });
      
      // If the token is valid, attach the user's ID and role to the request object
      req.id = decoded.id;
      req.role = decoded.role;
      
      // Proceed to the next middleware or route handler
      next();
    });
  } else {
    // If no token is present, send a response indicating the user is not authenticated
    return res.json({ Status: false, Error: "not authenticated" });
  }
};

// Example usage: Route that requires user authentication
app.get("/verify", verifyUser, (req, res) => {
  // If the user is authenticated, send back the user's role and ID
  return res.json({ Status: true, role: req.role, id: req.id });
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
