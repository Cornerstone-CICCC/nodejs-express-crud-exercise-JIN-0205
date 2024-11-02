// Import packages/modules
import express, { NextFunction, Request, Response, Router } from "express";
import productRouter from "./routes/product.routes";
import pageRouter from "./routes/page.routes";

// Set up Express
const app = express();

// Routes
app.use("/", pageRouter);
app.use("/products", productRouter);

// Start server
const PORT: number = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
