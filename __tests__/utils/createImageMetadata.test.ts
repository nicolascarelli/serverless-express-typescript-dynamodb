import createImageMetadata from '../../src/utils/createImageMetadata';

describe('createImageMetadata', () => {
  it('should create an image metadata object with the correct properties', () => {
    const filename = 'example.jpg';
    const key = 'uploads/example.jpg';
    const url = 'https://example.com/uploads/example.jpg';
    const imageMetadata = createImageMetadata(filename, key, url);
    expect(imageMetadata).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        filename,
        key,
        url,
      })
    );
  });
});
