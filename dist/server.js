"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import packages/modules
const express_1 = __importDefault(require("express"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const page_routes_1 = __importDefault(require("./routes/page.routes"));
// Set up Express
const app = (0, express_1.default)();
// Routes
app.use("/", page_routes_1.default);
app.use("/products", product_routes_1.default);
// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
