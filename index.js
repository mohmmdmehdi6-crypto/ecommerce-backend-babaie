import { authRouter } from "./src/routes/auth.route.js";
import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./src/middleware/error.middleware.js";
import { categoryRouter } from "./src/routes/category.route.js";
dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
