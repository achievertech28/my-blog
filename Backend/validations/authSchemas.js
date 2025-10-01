import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be between 3 and 30 characters and contain only letters and numbers (no symbols or spaces).",
    }),
});

//another way to do it
// export const loginSchema2 = Joi.object({
//   email: Joi.string()
//     .email()
//     .required()
//     .messages({
//       'string.email': 'Please enter a valid email address',
//       'any.required': 'Email is required'
//     }),

//   password: Joi.string()
//     .min(8)  // More secure minimum
//     .max(30)
//     .required()
//     .messages({
//       'string.min': 'Password must be at least 8 characters long',
//       'string.max': 'Password cannot exceed 30 characters',
//       'any.required': 'Password is required'
//     })
// });

export const userRegistrationSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required(),
  lastName: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be between 3 and 30 characters and contain only letters and numbers (no symbols or spaces).",
    }),
  role: Joi.string().trim().valid("reader", "admin", "author").required(),
});
