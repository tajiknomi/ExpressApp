const Joi = require('joi');

const clientValidationSchema = Joi.object({
    nameOfApplicant: Joi.string()
      .lowercase()
      .pattern(/^[A-Za-z\s]+$/)
      .required()
      .messages({
        'string.pattern.base': '"Applicant Name" is invalid'
      }),
  
    guardianName: Joi.string()
      .lowercase()
      .pattern(/^[A-Za-z\s]+$/)
      .required()
      .messages({
        'string.pattern.base': '"guardianName" is invalid'
      }),
  
    cnic: Joi.string()
      .pattern(/^\d{5}-\d{7}-\d{1}$/)
      .required()
      .messages({
        'string.pattern.base': 'CNIC must be in the format xxxxx-xxxxxxx-x (e.g., 12345-1234567-1)'
      }),
  
    dateOfBirth: Joi.date()
      .required()
      .messages({
        'any.required': '"Date Of Birth" is invalid'
      }),
  
    religion: Joi.string()
      .lowercase()
      .pattern(/^[A-Za-z\s]+$/)
      .required()
      .messages({
        'string.pattern.base': '"Religion" is invalid'
      }),
  
    domicile: Joi.string()
      .lowercase()
      .pattern(/^[A-Za-z\s]+$/)
      .required()
      .messages({
        'string.pattern.base': '"Domicile" is invalid'
      }),
  
    passportNo: Joi.string()
      .allow('')
      .optional()
      .messages({
        'string.empty': '"Passport Number" is invalid'
      }),
  
    mailingAddress: Joi.string()
      .lowercase()
      .required(),
  
    permanentAddress: Joi.string()
      .lowercase()
      .required(),
  
    city: Joi.string()
      .lowercase()
      .required(),
  
    district: Joi.string()
      .lowercase()
      .required(),
  
    country: Joi.string()
      .lowercase()
      .pattern(/^[A-Za-z\s]+$/)
      .required()
      .messages({
        'string.pattern.base': '"Country" is invalid'
      }),
  
    email: Joi.string()
      .email()
      .lowercase()
      .required()
      .messages({
        'string.email': '"Email" is invalid',
      }),
  
    phoneNoRes: Joi.string()
      .pattern(/^\+?\d{3,4}-?\d{7,11}$/)
      .required()
      .messages({
        'string.pattern.base': '"Resedential Phone Number" is invalid',
      }),
  
    officeNo: Joi.string()
      .pattern(/^\+?\d{3,4}-?\d{7,11}$/)
      .optional()
      .messages({
        'string.pattern.base': '"Office Number" is invalid'
      }),
  
    mobileNo: Joi.string()
      .pattern(/^\+?\d{3,4}-?\d{7,11}$/)
      .required()
      .messages({
        'string.pattern.base': '"Mobile Number" is invalid',
      }),
  
    nextOfKinName: Joi.string()
      .lowercase()
      .required(),
  
    nextOfKinRelation: Joi.string()
      .lowercase()
      .pattern(/^[A-Za-z\s]+$/)
      .required()
      .messages({
        'string.pattern.base': '"Relation to Next-of-Kin" is invalid'
      }),
  
    nextOfKinCnic: Joi.string()
      .pattern(/^\d{5}-\d{7}-\d{1}$/)
      .required()
      .messages({
        'string.pattern.base': 'Next of Kin CNIC must be in the format xxxxx-xxxxxxx-x (e.g., 12345-1234567-1)',
      }),
  
    nextOfKinDateOfBirth: Joi.date()
      .required(),
  
    nextOfKinPassport: Joi.string()
      .allow('')
      .optional()
      .messages({
        'string.empty': '"Next-of-Kin passport Number" is invalid'
      }),
  
    plotSize: Joi.string()
      .valid('1 Kanal', '10 Marla')
      .insensitive()
      .required()
      .messages({
        'any.only': '"plotSize" is invalid',
      }),
  
    attachments: Joi.array()
      .items(Joi.string())
      .default([])
      .messages({
        'array.base': '"attachments" is invalid'
      })
});


module.exports = clientValidationSchema;
