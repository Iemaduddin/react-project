import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import path from "path";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(express.static("public"));
// Route
app.get("/", (_, res) => {
  res.send("CMS Backend is running");
});

// File Access
app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
app.use("/api/auth", authRoutes);
