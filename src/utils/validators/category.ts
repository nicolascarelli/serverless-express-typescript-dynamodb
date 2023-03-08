import Joi from "joi";
import { CreateOrUpdateCategoryBody } from "../../interfaces/category";

const createOrUpdateValidate = (body: CreateOrUpdateCategoryBody) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi.string().required(),
      buffer: Joi.binary().required(),
      size: Joi.number().required(),
      destination: Joi.string().optional(),
      filename: Joi.string().optional(),
      path: Joi.string().optional(),
      stream: Joi.any().optional(),
    }),
  }).strict();
  return schema.validate(body, { abortEarly: false });
};

export default createOrUpdateValidate;
