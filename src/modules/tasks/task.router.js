import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from './task.controller.js';
import { auth } from '../../middlewares/auth.middleware.js';
import { validationMiddleware } from '../../middlewares/validation.middleware.js';
import { taskValidationSchema, updateTaskValidationSchema } from './task.validationSchema.js';
import expressAsyncHandler from 'express-async-handler';

let router = express.Router();
router.post('/createTask', auth(), validationMiddleware(taskValidationSchema), expressAsyncHandler(createTask));
router.get('/getTasks', auth(), expressAsyncHandler(getTasks));
router.get('/Tasks-Puplic', expressAsyncHandler(getTasks));
router.put('/updateTask/:id', auth(), validationMiddleware(updateTaskValidationSchema), expressAsyncHandler(updateTask));
router.delete('/deleteTask/:id', auth(), expressAsyncHandler(deleteTask));
export default router;
