import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows JSON requests

// Routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
// Start Server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
