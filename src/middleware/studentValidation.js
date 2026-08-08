import Joi from 'joi';

const fullStudentSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
  }),
  email: Joi.string().trim().lowercase().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be valid',
    'any.required': 'Email is required',
  }),
  age: Joi.number().required().messages({
    'number.base': 'Age must be a number',
    'any.required': 'Age is required',
  }),
  course: Joi.string().trim().required().messages({
    'string.empty': 'Course is required',
    'any.required': 'Course is required',
  }),
});

const partialStudentSchema = Joi.object({
  name: Joi.string().trim().messages({
    'string.empty': 'Name cannot be empty',
  }),
  email: Joi.string().trim().lowercase().email().messages({
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email must be valid',
  }),
  age: Joi.number().messages({
    'number.base': 'Age must be a number',
  }),
  course: Joi.string().trim().messages({
    'string.empty': 'Course cannot be empty',
  }),
}).min(1).messages({
  'object.min': 'At least one field is required',
});

const validateStudent = (schema) => {
  return (req, res, next) => {
    const options = {
      abortEarly: false,
      stripUnknown: true,
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.details.map((detail) => detail.message),
      });
    }

    req.body = value;
    next();
  };
};

const validateFullStudent = validateStudent(fullStudentSchema);
const validatePartialStudent = validateStudent(partialStudentSchema);

export {
  validateFullStudent,
  validatePartialStudent,
};
