import cors from "cors";
import express from "express";
import websiteRoutes from "./routes/websiteRoutes";

import "./types/express.d.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", websiteRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080 🚀");
});
