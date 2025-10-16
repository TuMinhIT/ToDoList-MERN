import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { MONGO_URI, PORT } from "./config.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/task.js";
import morgan from "morgan";
const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Connect MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
