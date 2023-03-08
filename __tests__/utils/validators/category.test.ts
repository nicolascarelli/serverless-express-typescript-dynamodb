/* eslint-disable @typescript-eslint/no-explicit-any */
import createOrUpdateValidate from '../../../src/utils/validators/category';
import { CreateOrUpdateCategoryBody } from '../../../src/interfaces/category';
import { Readable } from 'stream';

describe('createOrUpdateValidate', () => {
    const testImage: Express.Multer.File = {
        fieldname: 'image',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        buffer: Buffer.from('test'),
        size: 1234,
        destination: '/path/to/destination',
        filename: 'test.jpg',
        path: '/path/to/destination/test.jpg',
        stream: new Readable(),
      }

  it('should validate a correct category body', () => {
    const body: CreateOrUpdateCategoryBody = {
      name: 'Test Category',
      description: 'This is a test category',
      image: testImage
    };

    const { error } = createOrUpdateValidate(body);
    expect(error).toBe(undefined);
  });

  it('should invalidate a category body with missing properties', () => {
    const body: any = {
      name: 'Test Category',
      image: testImage
    };

    const { error } = createOrUpdateValidate(body);
    expect(error).not.toBe(undefined);
  });

  it('should invalidate a category body with incorrect properties', () => {
    const body: any = {
      name: 'Test Category',
      description: 1234,
      image: testImage,
    };

    const { error } = createOrUpdateValidate(body);
    expect(error).not.toBe(undefined);
  });
});
