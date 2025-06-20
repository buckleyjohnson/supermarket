import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { pool } from '../config/db';
import type { RowDataPacket } from 'mysql2/promise';

export const productsRouter = Router();

/** Row shape returned from MySQL */
interface ProductRow extends RowDataPacket {
    id: number;
    name: string;
    price_cents: number;
    qty: number;          // available stock
}

/* ---------- GET /inventory/products ----------------------- */
productsRouter.get(
    '/products',
    asyncHandler(async (_req, res) => {
        const [rows] = await pool.query<ProductRow[]>(
            'SELECT id, name, price_cents, qty FROM products'
        );
        res.json(rows);
    })
);

/* ---------- GET /inventory/products/:id ------------------- */
productsRouter.get(
    '/products/:id',
    asyncHandler(async (req, res) => {
        const [rows] = await pool.query<ProductRow[]>(
            'SELECT * FROM products WHERE id = ?',
            [req.params.id]
        );
        if (!rows.length) {
            res.status(404).json({ msg: 'Not found' });
            return;
        }
        res.json(rows[0]);
    })
);

/* ---------- POST /inventory/products  (create OR update) ---------- */
productsRouter.post(
    '/products',
    asyncHandler(async (req, res) => {
        const {
            id,
            isdn,
            image_url,
            unit_size,
            name,
            price_cents,
            category,
            qty,
            reorder_point,
        } = req.body;

        if (id) {
            // ---------- UPDATE ----------
            await pool.query(
                `UPDATE products SET
           isdn          = ?,
           image_url     = ?,
           unit_size     = ?,
           name          = ?,
           price_cents   = ?,
           category      = ?,
           qty           = ?,
           reorder_point = ?
         WHERE id = ?`,
                [
                    isdn,
                    image_url,
                    unit_size,
                    name,
                    price_cents,
                    category,
                    qty,
                    reorder_point,
                    id,
                ]
            );
            res.json({ msg: 'Updated', id });
        } else {
            // ---------- INSERT ----------
            const [result] = await pool.query<any>(
                `INSERT INTO products
          (isdn, image_url, unit_size, name,
           price_cents, category, qty, reorder_point)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    isdn,
                    image_url,
                    unit_size,
                    name,
                    price_cents,
                    category,
                    qty,
                    reorder_point,
                ]
            );
            res.status(201).json({ msg: 'Created', id: result.insertId });
        }
    })
);
