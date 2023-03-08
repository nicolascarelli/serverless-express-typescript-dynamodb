import { Readable } from 'stream';
import validate from '../../../src/utils/validators/image';

describe('validate', () => {
  let testFile: Express.Multer.File;
  beforeEach(() => {
    testFile = {
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
    };
  });
  it('returns an error if file is not an image', () => {
    const file = {
      ...testFile,
      mimetype: 'application/pdf',
      size: 200000,
    };

    const result = validate(file);

    expect(result).toEqual({ error: 'Invalid image file' });
  });

  it('returns an error if file is too large', () => {
    const file = {
      ...testFile,
      mimetype: 'image/jpeg',
      size: 2000000,
    };

    const result = validate(file);

    expect(result).toEqual({ error: 'Image file is too large' });
  });

  it('returns null if file is valid', () => {
    const file = {
      ...testFile,
      mimetype: 'image/png',
      size: 500000,
    };

    const result = validate(file);

    expect(result).toEqual({ error: null });
  });
});
