import { Router } from 'express';
import multer from 'multer';
import ProductController from '../controllers/products';
import addFileToRequest from '../middlewares/addFileToRequest';
import validateMultipleImages from '../middlewares/validateMultipleImages';
import validateProduct from '../middlewares/validateProduct';

const router = Router();

// Set up Multer for handling image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET /products
router.get('/', ProductController.getAllProducts);

// GET /products/:id
router.get('/:id', ProductController.getProductById);

// POST /products
router.post(
  '/',
  upload.array('images', 10),
  validateProduct,
  addFileToRequest,
  validateMultipleImages,
  ProductController.createProduct
);

// PUT /products/:id
router.put(
  '/:id',
  upload.array('images', 10),
  addFileToRequest,
  validateMultipleImages,
  ProductController.updateProduct
);

// DELETE /products/:id
router.delete('/:id', ProductController.deleteProduct);

export default router;
