import express from 'express';
import { auth } from '../../middlewares/auth.middleware.js';
import { validationMiddleware } from '../../middlewares/validation.middleware.js';
import { createCategory, getCategories, updateCategory, deleteCategory } from './category.controller.js';
import { categorySchema } from './category.validationSchema.js';
import expressAsyncHandler from 'express-async-handler';

let router = express.Router();

router.post('/createCategory', auth(), validationMiddleware(categorySchema), expressAsyncHandler(createCategory) );
router.get('/getUserCategories', auth(), expressAsyncHandler(getCategories));
router.put('/updateCategory/:categoryId', auth(), validationMiddleware(categorySchema), expressAsyncHandler(updateCategory));
router.delete('/deleteCategory/:categoryId', auth(), expressAsyncHandler(deleteCategory));

export default router;
