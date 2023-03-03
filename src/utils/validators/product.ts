import Joi from "joi";
import { CreateOrUpdateProductBody } from "../../interfaces/product";

const validateProduct = (product: CreateOrUpdateProductBody) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    images: Joi.array().items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().required(),
        size: Joi.number().required(),
        buffer: Joi.any().required(),
      })
    ),
  });

  return schema.validate(product);
};

export default validateProduct;
