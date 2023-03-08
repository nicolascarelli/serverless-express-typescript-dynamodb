import ImageMetadata from "./imageMetadata";

export interface Category {
  id: string;
  name: string;
  description: string;
  image?: ImageMetadata;
  createdAt: Date;
}

export interface CreateOrUpdateCategoryBody {
  name: string;
  description: string;
  image: Express.Multer.File;
}
