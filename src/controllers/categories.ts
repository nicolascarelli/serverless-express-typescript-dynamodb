import { Request, Response } from 'express';
import CategoryService from '../services/category';
import MulterRequest from '../types/multerRequest';
import ImageService from '../services/image';
import ImageMetadata from '../interfaces/imageMetadata';
import asyncMiddleware from '../middlewares/asyncMiddleware';

class CategoryController {
  static createCategory = asyncMiddleware(
    async (req: MulterRequest, res: Response): Promise<Response> => {
      let image: ImageMetadata | undefined;

      if (req.file) {
        console.log('image');
        image = await ImageService.uploadImage(req.file);
      }

      const { name, description } = req.body;
      const newCategory = await CategoryService.createCategory(
        name,
        description,
        image
      );

      return res.status(200).json({ newCategory });
    }
  );

  static getCategoryById = asyncMiddleware(
    async (req: Request, res: Response): Promise<Response> => {
      const id = req.params.id;
      console.log('getting category');
      const category = await CategoryService.getCategoryById(id);

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      return res.status(200).json({ category });
    }
  );

  static getAllCategories = asyncMiddleware(
    async (req: Request, res: Response): Promise<Response> => {
      const categories = await CategoryService.getAllCategories();
      return res.status(200).json({ categories });
    }
  );

  static updateCategory = asyncMiddleware(
    async (req: MulterRequest, res: Response): Promise<Response> => {
      const id = req.params.id;

      const category = await CategoryService.getCategoryById(id);
      if (!category)
        return res.status(404).json({ error: 'Category not found' });

      let image: ImageMetadata | undefined;
      if (req.file) {
        image = await ImageService.updateImage(req.file, category.image);
      }

      const { name, description } = req.body;
      const updateCategory = await CategoryService.updateCategoryById(
        id,
        name,
        description,
        image
      );

      return res.status(200).json({ updateCategory });
    }
  );

  static deleteCategory = asyncMiddleware(
    async (req: Request, res: Response): Promise<Response> => {
      const id = req.params.id;
      await CategoryService.deleteCategoryById(id);
      return res.status(200).json({ success: true });
    }
  );
}

export default CategoryController;
