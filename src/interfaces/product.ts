import ImageMetadata from "./imageMetadata";

export interface Product {
  id: string;
  name: string;
  images?: ImageMetadata[];
  description: string;
  price: number;
  createdAt: Date;
}

export interface CreateOrUpdateProductBody {
  name: string;
  description: string;
  price: number;
  images?: Express.Multer.File[];
}
