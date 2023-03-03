import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { v4 as uuidv4 } from "uuid";
import { Category } from "../interfaces/category";
import ImageMetadata from "../interfaces/imageMetadata";

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

    try {
      await dynamoDb
        .put({
          TableName: process.env.DYNAMODB_TABLE!,
          Item: newCategory,
        })
        .promise();

      return newCategory;
    } catch (error) {
      throw new Error("Could not create category");
    }
  }

  static async getCategoryById(id: string): Promise<Category | null> {
    try {
      const result = await dynamoDb
        .get({
          TableName: process.env.DYNAMODB_TABLE!,
          Key: { id },
        })
        .promise();

        console.log("result.Item", result.Item)
      return result.Item as Category | null;
    } catch (error) {
      throw new Error("Could not get category by id");
    }
  }

  static async getAllCategories(): Promise<Category[]> {
    try {
      const result = await dynamoDb
        .scan({ TableName: process.env.DYNAMODB_TABLE! })
        .promise();

      return result.Items as Category[];
    } catch (error) {
      throw new Error("Could not get all categories");
    }
  }

  static async updateCategoryById(
    id: string,
    name: string,
    description: string,
    image?: ImageMetadata
  ): Promise<Category | null> {
    const category = await this.getCategoryById(id);

    if (!category) {
      return null;
    }

    category.name = name;
    category.description = description;
    category.image = image;

    try {
      await dynamoDb
        .put({
          TableName: process.env.DYNAMODB_TABLE!,
          Item: category,
        })
        .promise();

      return category;
    } catch (error) {
      throw new Error("Could not update category by id");
    }
  }

  static async deleteCategoryById(id: string): Promise<void> {
    try {
      await dynamoDb
        .delete({
          TableName: process.env.DYNAMODB_TABLE!,
          Key: { id },
        })
        .promise();
    } catch (error) {
      throw new Error("Could not delete category by id");
    }
  }
}

export default CategoryService;
