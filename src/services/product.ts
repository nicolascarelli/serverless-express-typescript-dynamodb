import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { v4 as uuidv4 } from 'uuid';
import ImageMetadata from '../interfaces/imageMetadata';
import { Product } from '../interfaces/product';

const dynamoDb = new DocumentClient();

class ProductService {
  static async createProduct(
    name: string,
    description: string,
    price: number,
    images?: ImageMetadata[]
  ): Promise<Product> {
    const createdAt = new Date();
    const id = uuidv4();
    const newProduct = { id, name, description, price, images, createdAt };

    await dynamoDb
      .put({
        TableName: process.env.PRODUCT_TABLE!,
        Item: newProduct,
      })
      .promise();

    return newProduct;
  }

  static async getProductById(id: string): Promise<Product | null> {
    const result = await dynamoDb
      .get({
        TableName: process.env.PRODUCT_TABLE!,
        Key: { id },
      })
      .promise();

    return result.Item as Product | null;
  }

  static async getAllProducts(): Promise<Product[]> {
    const result = await dynamoDb
      .scan({ TableName: process.env.PRODUCT_TABLE! })
      .promise();
    return result.Items as Product[];
  }

  static async updateProductById(
    product: Product,
    name: string,
    description: string,
    price: number,
    images?: ImageMetadata[]
  ): Promise<Product | null> {

    product.name = name;
    product.description = description;
    product.price = price;
    product.images = images;

    await dynamoDb
      .put({
        TableName: process.env.PRODUCT_TABLE!,
        Item: product,
      })
      .promise();

    return product;
  }

  static async deleteProductById(id: string): Promise<void> {
    await dynamoDb
      .delete({
        TableName: process.env.PRODUCT_TABLE!,
        Key: { id },
      })
      .promise();
  }
}

export default ProductService;
