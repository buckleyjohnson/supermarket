// // src/routes/inventoryRoutes.ts
// import { Router } from 'express';
// import { requireAuth } from '../middleware/requireAuth';
// import { requireRoles } from '../middleware/requireRoles';
// import { addInventoryItem } from '../controllers/inventoryController';

// export const inventoryRouter = Router();

// inventoryRouter.post(
//   '/add',
//   requireAuth,
//   requireRoles('Inventory Manager', 'System Administrator'),
//   addInventoryItem
// );
// 