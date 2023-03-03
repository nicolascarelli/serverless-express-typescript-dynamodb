// controllers/productController.ts
import { Request, Response } from "express";
import ProductService from "../services/product";
import MulterRequest from "../types/multerRequest";
import ImageMetadata from "../interfaces/imageMetadata";
import asyncMiddleware from "../middlewares/asyncMiddleware";
import ImageService from "../services/image";


class ProductController {
  static createProduct = asyncMiddleware(
    async (req: MulterRequest, res: Response) => {
      const { name, description, price } = req.body;
      
      let images: ImageMetadata[] | undefined;

      if (req.files) {
        images = await ImageService.uploadMultipleImages(req.files);
      }

      const newProduct = await ProductService.createProduct(
        name,
        description,
        price,
        images
      );

      return res.status(200).json({ newProduct });
    }
  );

  static getProductById = asyncMiddleware(
    async (req: Request, res: Response) => {
      const id = req.params.id;
      const product = await ProductService.getProductById(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json({ product });
    }
  );

  static getAllProducts = asyncMiddleware(
    async (req: Request, res: Response) => {
      const products = await ProductService.getAllProducts();
      return res.status(200).json({ products });
    }
  );

  static updateProduct = asyncMiddleware(
    async (req: MulterRequest, res: Response) => {
      const { name, description, price } = req.body;

      const id = req.params.id;
      const product = await ProductService.getProductById(id);
      if (!product) return res.status(404).json({ error: "Product not found" });

      let images: ImageMetadata[] = [];
      if (req.files) {
        images = await ImageService.updateMultipleImages(req.files, product.images || []);
      }

      const updatedProduct = await ProductService.updateProductById(
        id,
        name,
        description,
        price,
        images
      );

      return res.status(200).json({ updatedProduct });
    }
  );

  static deleteProduct = asyncMiddleware(
    async (req: Request, res: Response) => {
      const id = req.params.id;
      await ProductService.deleteProductById(id);
      return res.status(200).json({ success: true });
    }
  );
}

export default ProductController;
