import { Router, Request, Response } from "express";
import { Product, ProductRequestBody } from "../types/product";
import { v4 as uuidv4 } from "uuid";

const productRouter = Router();
// In-memory Database
let products: Product[] = [
  {
    id: "string",
    name: "string",
    description: "string",
    price: 40,
  },
];

// Get all todos
productRouter.get("/", (req: Request, res: Response) => {
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
productRouter.get(
  "/search",
  (req: Request<{}, {}, {}, { id: string }>, res: Response) => {
    const { id } = req.query;
    const foundProduct = products.find((product) => product.id === id);
    if (foundProduct) {
      res.status(200).json(foundProduct);
    } else {
      res.status(404).send(`products not found`);
    }
  }
);

// Get todo by id
productRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const foundProduct = products.find((product) => product.id === id);
  if (foundProduct) {
    res.status(200).json(foundProduct);
  } else {
    res.status(404).send(`product not found`);
  }
});

//Edit todo by id
productRouter.put(
  "/:id",
  (req: Request<{ id: string }, {}, ProductRequestBody>, res: Response) => {
    const { id } = req.params;
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      const updateProduct = {
        ...products[productIndex],
        name: req.body.name ?? products[productIndex].name,
        description: req.body.description ?? products[productIndex].description,
        price: req.body.price ?? products[productIndex].price,
      };
      products[productIndex] = updateProduct;
      res.status(201).json(updateProduct);
    } else {
      res.status(404).send(`product items not found`);
    }
  }
);

// Add todo
productRouter.post(
  "/",
  (req: Request<{}, {}, ProductRequestBody>, res: Response) => {
    const newProduct: Product = {
      id: uuidv4(),
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    };
    products = [...products, newProduct];
    res.status(201).send("product added successfully...");
  }
);

// Delete todo by id
productRouter.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const foundProduct = products.find((product) => product.id === id);
  if (foundProduct) {
    products = products.filter((product) => product.id !== id);
    res.status(201).send("product deleted successfully...");
  } else {
    res.status(404).send("product not found");
  }
});

export default productRouter;
