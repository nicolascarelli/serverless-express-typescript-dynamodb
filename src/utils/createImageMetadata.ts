import { v4 as uuidv4 } from "uuid";
import ImageMetadata from "../interfaces/imageMetadata";

const createImageMetadata = (
  filename: string,
  key: string,
  url: string
): ImageMetadata => ({
  id: uuidv4(),
  filename,
  key,
  url,
});

export default createImageMetadata;
