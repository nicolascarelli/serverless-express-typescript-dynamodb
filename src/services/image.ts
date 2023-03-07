import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import ImageMetadata from '../interfaces/imageMetadata';

const s3 = new AWS.S3();

class ImageService {
  static async uploadImage(file: Express.Multer.File): Promise<ImageMetadata> {
    const key = uuidv4();

    const data = await s3
      .upload({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();

    const item = {
      id: uuidv4(),
      filename: file.originalname,
      key,
      url: data.Location,
    };

    return item;
  }

  static deleteImage(image: ImageMetadata): Promise<void> {
    return new Promise((resolve, reject) => {
      s3.deleteObject(
        {
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: image.key,
        },
        (error) => {
          if (error) {
            reject(error);
          }
        }
      );
    });
  }

  static updateImage(
    file: Express.Multer.File,
    image: ImageMetadata | undefined
  ): Promise<ImageMetadata> {
    if (!image) return this.uploadImage(file);
    return new Promise((resolve, reject) => {
      s3.deleteObject(
        {
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: image.key,
        },
        (error) => {
          if (error) {
            reject(error);
          }

          this.uploadImage(file)
            .then((item) => resolve(item))
            .catch((error) => reject(error));
        }
      );
    });
  }

  static async uploadMultipleImages(
    files: Express.Multer.File[]
  ): Promise<ImageMetadata[]> {
    const uploadedImages: ImageMetadata[] = [];

    for (const file of files) {
      const image = await this.uploadImage(file);
      uploadedImages.push(image);
    }

    return uploadedImages;
  }

  static async updateMultipleImages(
    files: Express.Multer.File[],
    images: ImageMetadata[]
  ): Promise<ImageMetadata[]> {
    const updatedImages: ImageMetadata[] = [];

    // Update each image sequentially
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const image = images[i];

      if (!image) {
        // If there's no existing image, create a new one
        const newImage = await this.uploadImage(file);
        updatedImages.push(newImage);
      } else {
        // Otherwise, update the existing image
        const updatedImage = await this.updateImage(file, image);
        updatedImages.push(updatedImage);
      }
    }

    return updatedImages;
  }
}

export default ImageService;
