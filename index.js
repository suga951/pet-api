import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.SERVER_PORT || 3002;
const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World! //Login page");
});

app.get("/register", (_req, res) => {
  res.send("Register here.");
});

app.get("/profile", (_req, res) => {
  res.send("Profile here.");
});

app.get("/api/pets", (__req, res) => {
  res.send("Pets endpoint here.");
});

app.get("/api/vet", (_req, res) => {
  res.send("Vet endpoint here.");
});

app.get("/api/client", (_req, res) => {
  res.send("Client endpoint here.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
