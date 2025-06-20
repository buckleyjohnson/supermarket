//route/authRoutes.ts
import { Router } from 'express';
import { register, login, me } from '../controllers/authController';
import { requireAuth } from '../middleware/requireAuth';

export const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login',    login);
authRouter.get('/account', requireAuth, me);
