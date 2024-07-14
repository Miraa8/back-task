import express from 'express';
import { auth } from '../../middlewares/auth.middleware.js';
import { validationMiddleware } from '../../middlewares/validation.middleware.js';
import { register, login, getUser } from './user.controller.js';
import { registerSchema, loginSchema } from './user.validationSchema.js';
import expressAsyncHandler from 'express-async-handler';

let router = express.Router();

router.post('/signUp', validationMiddleware(registerSchema), expressAsyncHandler(register));
router.post('/login', validationMiddleware(loginSchema),  expressAsyncHandler(login));
router.get('/getUser', auth(), expressAsyncHandler(getUser));

export default router;
