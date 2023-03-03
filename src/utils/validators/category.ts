import Joi from "joi";
import { CreateOrUpdateCategoryBody } from "../../interfaces/category";

const createOrValidate = (body: CreateOrUpdateCategoryBody) => {
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
    }),
  }).strict();
  return schema.validate(body, { abortEarly: false });
};

export default createOrValidate;
