const validate = (file: Express.Multer.File) => {
  if (!file.mimetype.startsWith("image/")) {
    console.log(file)
    return { error: "Invalid image file" };
  }
  if (file.size > 1000000) {
    return { error: "Image file is too large" };
  }
  return { error: null };
};

export default validate;
