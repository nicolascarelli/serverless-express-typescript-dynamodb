/* eslint-disable @typescript-eslint/no-explicit-any */
import CategoryService from '../../src/services/category';
import ImageMetadata from '../../src/interfaces/imageMetadata';
import { v4 as uuidv4 } from 'uuid';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Category } from '../../src/interfaces/category';

describe('CategoryService', () => {
  describe('createCategory', () => {
    it('should create a new category', async () => {
      // Arrange
      const name = 'Test Category';
      const description = 'This is a test category';
      const image: ImageMetadata = {
        id: uuidv4(),
        filename: 'test.jpg',
        key: 'test/test.jpg',
        url: 'https://test-bucket.s3.amazonaws.com/test/test.jpg',
      };
      // Mock the DynamoDB DocumentClient
      const putMock = jest.fn().mockReturnValueOnce({ promise: jest.fn() });
      jest.spyOn(DocumentClient.prototype, 'put').mockImplementation(putMock);

      // Act
      const result = await CategoryService.createCategory(
        name,
        description,
        image
      );

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toEqual(name);
      expect(result.description).toEqual(description);
      expect(result.image).toEqual(image);
      expect(result.createdAt).toBeDefined();

      // Verify that the DynamoDB DocumentClient was called with the correct arguments
      expect(putMock).toHaveBeenCalledWith({
        TableName: process.env.CATEGORY_TABLE!,
        Item: result,
      });
    });
  });

  describe('getCategoryById', () => {
    it('should return a category by id', async () => {
      // Arrange
      const id = 'test-id';
      const category: Category = {
        id,
        name: 'Test Category',
        description: 'This is a test category',
        createdAt: new Date(),
      };
      const getSpy = jest.spyOn(DocumentClient.prototype, 'get').mockReturnValueOnce({
        promise: jest.fn().mockResolvedValueOnce({
          Item: category,
        }),
      } as any);
  
      // Act
      const result = await CategoryService.getCategoryById(id);
  
      // Assert
      expect(result).toEqual(category);
      expect(getSpy).toHaveBeenCalledWith({
        TableName: process.env.CATEGORY_TABLE!,
        Key: {
          id,
        },
      });
    });
  
    it('should return null when category is not found', async () => {
      // Arrange
      const id = 'test-id';
      const getSpy = jest.spyOn(DocumentClient.prototype, 'get').mockReturnValueOnce({
        promise: jest.fn().mockResolvedValueOnce({}),
      } as any);
  
      // Act
      const result = await CategoryService.getCategoryById(id);
  
      // Assert
      expect(result).toBeNull();
      expect(getSpy).toHaveBeenCalledWith({
        TableName: process.env.CATEGORY_TABLE!,
        Key: {
          id,
        },
      });
    });
  });

  describe('getAllCategories', () => {
    it('should return all categories', async () => {
      // Arrange
      const categories: Category[] = [
        {
          id: 'test-id-1',
          name: 'Test Category 1',
          description: 'This is test category 1',
          createdAt: new Date(),
        },
        {
          id: 'test-id-2',
          name: 'Test Category 2',
          description: 'This is test category 2',
          createdAt: new Date(),
        },
      ];
      const scanSpy = jest.spyOn(DocumentClient.prototype, 'scan').mockReturnValueOnce({
        promise: jest.fn().mockResolvedValueOnce({
          Items: categories,
        }),
      } as any);
  
      // Act
      const result = await CategoryService.getAllCategories();
  
      // Assert
      expect(result).toEqual(categories);
      expect(scanSpy).toHaveBeenCalledWith({
        TableName: process.env.CATEGORY_TABLE!,
      });
    });
  });
  
  describe('deleteCategoryById', () => {
    it('should delete a category by id', async () => {
      // Arrange
      const id = 'test-id';
      const deleteSpy = jest.spyOn(DocumentClient.prototype, 'delete').mockReturnValueOnce({
        promise: jest.fn().mockResolvedValueOnce({}),
      } as any);
  
      // Act
      await CategoryService.deleteCategoryById(id);
  
      // Assert
      expect(deleteSpy).toHaveBeenCalledWith({
        TableName: process.env.CATEGORY_TABLE!,
        Key: {
          id,
        },
      });
    });
  });
  
  
});
