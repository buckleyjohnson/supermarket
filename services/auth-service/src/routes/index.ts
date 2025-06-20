// routes/index.ts
import { Router } from 'express';
import { authRouter }      from './authRoutes';
import { productsRouter } from './productRoutes';
import { employeesRouter } from './employeesRoutes';


export const apiRouter = Router();
apiRouter.use('/auth',      authRouter);
apiRouter.use('/products',  productsRouter);
apiRouter.use('/employees', employeesRouter);
