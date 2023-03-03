import { Router } from "express";
import multer from "multer";
import ProductController from "../controllers/products";

const router = Router();

// Set up Multer for handling image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET /products
router.get("/", ProductController.getAllProducts);

// GET /products/:id
router.get("/:id", ProductController.getProductById);

// POST /products
router.post("/", upload.array("images", 10), ProductController.createProduct);

// PUT /products/:id
router.put("/:id", upload.array("images", 10), ProductController.updateProduct);

// DELETE /products/:id
router.delete("/:id", ProductController.deleteProduct);

export default router;
