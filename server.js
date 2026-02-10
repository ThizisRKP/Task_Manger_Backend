// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import taskRoutes from "./routes/taskRoutes.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended : true}));

// // Routes
// app.use("/api/tasks", taskRoutes);

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ cannot connect DB", err));

// // Server
// app.listen(PORT,()=>
// console.log(`server running on http://localhost:${PORT}`));

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health route (optional but useful)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Routes
app.use("/api/tasks", taskRoutes);



// Start server AFTER Mongo connects
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
       console.log(`server running on http://localhost:${PORT}`)
    });

  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();

