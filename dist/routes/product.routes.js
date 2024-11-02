"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const productRouter = (0, express_1.Router)();
// In-memory Database
let products = [
    {
        id: "string",
        name: "string",
        description: "string",
        price: 40,
    },
];
// Get all todos
productRouter.get("/", (req, res) => {
    res.status(200).json(products);
});
// // Add product
// productRouter.post(
//   "/",
//   (req: Request<{}, {}, ProductRequestBody>, res: Response) => {
//     const newProduct: Product = {
//       id: uuidv4(),
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//     };
//     products = [...products, newProduct];
//     res.status(201).send("Product added successfully...");
//   }
// );
// Fetch todo by search id
productRouter.get("/search", (req, res) => {
    const { id } = req.query;
    const foundProduct = products.find((product) => product.id === id);
    if (foundProduct) {
        res.status(200).json(foundProduct);
    }
    else {
        res.status(404).send(`products not found`);
    }
});
// Get todo by id
productRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const foundProduct = products.find((product) => product.id === id);
    if (foundProduct) {
        res.status(200).json(foundProduct);
    }
    else {
        res.status(404).send(`product not found`);
    }
});
//Edit todo by id
productRouter.put("/:id", (req, res) => {
    var _a, _b, _c;
    const { id } = req.params;
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
        const updateProduct = Object.assign(Object.assign({}, products[productIndex]), { name: (_a = req.body.name) !== null && _a !== void 0 ? _a : products[productIndex].name, description: (_b = req.body.description) !== null && _b !== void 0 ? _b : products[productIndex].description, price: (_c = req.body.price) !== null && _c !== void 0 ? _c : products[productIndex].price });
        products[productIndex] = updateProduct;
        res.status(201).json(updateProduct);
    }
    else {
        res.status(404).send(`product items not found`);
    }
});
// Add todo
productRouter.post("/", (req, res) => {
    const newProduct = {
        id: (0, uuid_1.v4)(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    };
    products = [...products, newProduct];
    res.status(201).send("product added successfully...");
});
// Delete todo by id
productRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const foundProduct = products.find((product) => product.id === id);
    if (foundProduct) {
        products = products.filter((product) => product.id !== id);
        res.status(201).send("product deleted successfully...");
    }
    else {
        res.status(404).send("product not found");
    }
});
exports.default = productRouter;
