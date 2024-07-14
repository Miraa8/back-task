import Joi from 'joi';

export let taskValidationSchema = {
    body: Joi.object({
        categoryId: Joi.string().required().messages({
            'string.base': `Category ID should be a type of 'text'`,
            'string.empty': `Category ID cannot be an empty field`,
            'any.required': `Category ID is a required field`
        }),
        type: Joi.string().valid('Text', 'List').required().messages({
            'string.base': `Task type should be a type of 'text'`,
            'any.only': `Task type should be either 'Text' or 'List'`,
            'any.required': `Task type is a required field`
        }),
        body: Joi.alternatives().conditional('type', {
            is: 'Text',
            then: Joi.string().required().messages({
                'string.base': `Body should be a type of 'text'`,
                'string.empty': `Body cannot be an empty field`,
                'any.required': `Body is a required field`
            }),
            otherwise: Joi.array().items(Joi.string().required()).required().messages({
                'array.base': `Body should be an array of text items`,
                'array.includesRequiredUnknowns': `All list items are required`,
                'any.required': `Body is a required field`
            })
        }),
        shared: Joi.boolean().required().messages({
            'boolean.base': `Shared should be a type of 'boolean'`,
            'any.required': `Shared is a required field`
        })
    })
};

export let updateTaskValidationSchema = {
    body: Joi.object({
        categoryId: Joi.string().optional().messages({
            'string.base': `Category ID should be a type of 'text'`
        }),
        type: Joi.string().valid('Text', 'List').optional().messages({
            'string.base': `Task type should be a type of 'text'`,
            'any.only': `Task type should be either 'Text' or 'List'`
        }),
        body: Joi.alternatives().conditional('type', {
            is: 'Text',
            then: Joi.string().optional().messages({
                'string.base': `Body should be a type of 'text'`,
                'string.empty': `Body cannot be an empty field`
            }),
            otherwise: Joi.array().items(Joi.string().optional()).optional().messages({
                'array.base': `Body should be an array of text items`
            })
        }),
        shared: Joi.boolean().optional().messages({
            'boolean.base': `Shared should be a type of 'boolean'`
        })
    })
};
