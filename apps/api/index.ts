import cors from "cors";
import express from "express";
import incidentRoutes from "./routes/incidentRoutes.ts";
import userRoutes from "./routes/userRoutes";
import websiteRoutes from "./routes/websiteRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", websiteRoutes);
app.use("/api/v1", incidentRoutes);
app.use("/api/v1", userRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080 🚀");
});
