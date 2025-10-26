const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// 1️⃣ Load env first
dotenv.config();

// 2️⃣ Debug env load (don’t print password!)
console.log("ENV LOADED:", {
  EMAIL_USER: process.env.EMAIL_USER || "❌ NOT SET",
  EMAIL_PASS: process.env.EMAIL_PASS ? "✅ SET" : "❌ MISSING",
  FROM_EMAIL: process.env.FROM_EMAIL || "❌ NOT SET",
  PORT: process.env.PORT || 5000,
});

// 3️⃣ Start express
const app = express();
app.use(express.json());
app.use(cors());

// 4️⃣ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 5️⃣ Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const testRoutes = require("./routes/testRoutes");

// 6️⃣ Register routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/test", testRoutes);

// 7️⃣ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
