import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../interfaces/category';
import ImageMetadata from '../interfaces/imageMetadata';

const dynamoDb = new DocumentClient();

class CategoryService {
  static async createCategory(
    name: string,
    description: string,
    image?: ImageMetadata
  ): Promise<Category> {
    const createdAt = new Date();
    const id = uuidv4();
    const newCategory = { id, name, description, image, createdAt };

    await dynamoDb
      .put({
        TableName: process.env.CATEGORY_TABLE!,
        Item: newCategory,
      })
      .promise();

    return newCategory;
  }

  static async getCategoryById(id: string): Promise<Category | null> {
    const result = await dynamoDb
      .get({
        TableName: process.env.CATEGORY_TABLE!,
        Key: { id },
      })
      .promise();
  
    if (!result.Item) {
      return null;
    }
  
    return result.Item as Category;
  }

  static async getAllCategories(): Promise<Category[]> {
    const result = await dynamoDb
      .scan({ TableName: process.env.CATEGORY_TABLE! })
      .promise();
    return result.Items as Category[];
  }

  static async updateCategoryById(
    category: Category,
    name: string,
    description: string,
    image?: ImageMetadata
  ): Promise<Category | null> {
    category.name = name;
    category.description = description;
    category.image = image;

    await dynamoDb
      .put({
        TableName: process.env.CATEGORY_TABLE!,
        Item: category,
      })
      .promise();
    return category;
  }

  static async deleteCategoryById(id: string): Promise<void> {
    await dynamoDb
      .delete({
        TableName: process.env.CATEGORY_TABLE!,
        Key: { id },
      })
      .promise();
  }
}

export default CategoryService;
