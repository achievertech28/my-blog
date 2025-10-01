import Joi from "joi";

export const postSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.min": "The title should have at least 3 characters",
    "string.max": "The title should have at most 100 characters",
    "any.required": "The title is required",
  }),
  excerpt: Joi.string().min(5).max(100).required().messages({
    "string.min": "The excerpt should have at least 5 characters",
    "string.max": "The excerpt should have at most 100 characters",
    "any.required": "The excerpt is required",
  }),
  body: Joi.string().min(5).max(1000).required().messages({
    "string.min": "The body should have at least 5 characters",
    "string.max": "The body should have at most 1000 characters",
    "any.required": "The body is required",
  }),
  author: Joi.string().required(),
});
