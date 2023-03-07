import Joi from 'joi';
import { CreateOrUpdateProductBody } from '../../interfaces/product';

const validateProduct = (body: CreateOrUpdateProductBody) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
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
  }).strict();
  return schema.validate(body, { abortEarly: false });
};

export default validateProduct;
