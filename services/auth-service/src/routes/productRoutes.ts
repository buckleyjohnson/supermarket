import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { pool } from '../config/db';
import type { RowDataPacket } from 'mysql2/promise';

export const productsRouter = Router();

/* ------------------------------------------------------------------ */
/* Row shape returned from MySQL                                      */
/* ------------------------------------------------------------------ */
interface ProductRow extends RowDataPacket {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

/* ------------------------------------------------------------------ */
/* GET /api/products  →  list all products                            */
/* ------------------------------------------------------------------ */
productsRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const [rows] = await pool.query<ProductRow[]>(
      'SELECT id, name, price, description, image FROM products',
    );
    res.json(rows); // rows is ProductRow[]
  }),
);

/* ------------------------------------------------------------------ */
/* GET /api/products/:id  →  single product by id                     */
/* ------------------------------------------------------------------ */
productsRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const [rows] = await pool.query<ProductRow[]>(
      'SELECT * FROM products WHERE id = ?',
      [req.params.id],
    );

    if (!rows.length) {
      res.status(404).json({ msg: 'Not found' });
      return;
    }

    res.json(rows[0]);
  }),
);
