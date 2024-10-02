import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import pageRoutes from "./routes/pages";
import apiRoutes from "./routes/api";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./public/swagger.json";

// Initialize express
const app = express();

// Middleware
app.use(cookieParser()); // For parsing cookies
app.use(express.json()); // For parsing JSON bodies
app.use(cors({ origin: process.env.BASE_URL, credentials: true })); // CORS setup
app.set("json spaces", 2); // Pretty JSON formatting

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html for the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve Swagger API docs
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// // Serve HTML pages
// app.use(pageRoutes); // Make sure this is before apiRoutes to handle HTML routes

// Use API routes
app.use(apiRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
