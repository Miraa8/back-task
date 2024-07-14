import Joi from 'joi';

export let categorySchema = {
    body: Joi.object({
        categoryName: Joi.string().required()
    })
};
