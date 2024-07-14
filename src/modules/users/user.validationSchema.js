import Joi from 'joi';

export let registerSchema = {
    body: Joi.object({
        name: Joi.string().required().messages({
            'any.required': 'Name is required',
            'string.empty': 'Name cannot be empty'
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required',
            'string.empty': 'Email cannot be empty'
        }),
        password: Joi.string().min(6).required().messages({
            'string.min': 'Password must be at least 6 characters long',
            'any.required': 'Password is required',
            'string.empty': 'Password cannot be empty'
        })
    })
};

export let loginSchema = {
    body: Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required',
            'string.empty': 'Email cannot be empty'
        }),
        password: Joi.string().required().messages({
            'any.required': 'Password is required',
            'string.empty': 'Password cannot be empty'
        })
    })
};
