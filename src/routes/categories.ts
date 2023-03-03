import { Router, Request, Response, NextFunction } from "express";
import multer from "multer";
import CategoryController from "../controllers/categories";
import addFileToRequest from "../middlewares/addFileToRequest";
import validateCategory from "../middlewares/validateCategory";
import validateImage from "../middlewares/validateImage";

const router = Router();

// Set up Multer for handling image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET /categories
router.get("/", CategoryController.getAllCategories);

// GET /categories/:id
router.get("/:id", CategoryController.getCategoryById);

// POST /categories
router.post(
  "/",
  upload.single("image"),
  validateCategory,
  addFileToRequest,
  validateImage,
  CategoryController.createCategory
);

// PUT /categories/:id
router.put(
  "/:id",
  upload.single("image"),
  validateCategory,
  validateImage,
  CategoryController.updateCategory
);

// DELETE /categories/:id
router.delete("/:id", CategoryController.deleteCategory);

export default router;
