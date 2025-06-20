import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { pool } from '../config/db';
import { requireAuth } from '../middleware/requireAuth';
import { requireRoles } from '../middleware/requireRoles'; // ← use your existing helper
import type { RowDataPacket } from 'mysql2/promise';

export const employeesRouter = Router();

/* ---------- row shape returned from SQL -------------------- */
interface EmployeeRow extends RowDataPacket {
    id: number;
    email: string;
    roles: string;          // GROUP_CONCAT →  "Cashier,Store Manager"
}

employeesRouter.patch(
    '/:id/roles',
    requireAuth,
    requireRoles('Store Manager'),
    asyncHandler(async (req, res) => {
        const { roles } = req.body as { roles: string[] };

        // 1. Validate roles exist
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT id, name FROM roles WHERE name IN (?)',
            [roles],
        );
        if (rows.length !== roles.length) {
            res.status(400).json({ msg: 'Unknown role(s) supplied' });
            return;
        }

        // 2. Replace role set
        await pool.query('DELETE FROM user_roles WHERE user_id = ?', [req.params.id]);
        const pairs = rows.map(r => [req.params.id, r.id]);
        if (pairs.length)
            await pool.query('INSERT INTO user_roles (user_id, role_id) VALUES ?', [pairs]);

        res.json({ msg: 'Roles updated' });
    }),
);

/* ---------------- POST /api/time/clock-in ---------------- */
employeesRouter.post(
    '/clock-in',
    requireAuth,
    requireRoles('Store Manager', 'Cashier', 'Stocking/Warehouse Staff'),
    asyncHandler(async (req, res) => {
        const userId = (req as any).userId;
        await pool.query(
            'INSERT INTO time_entries (user_id, clock_in) VALUES (?, NOW())',
            [userId],
        );
        res.json({ msg: 'Clocked in' });
    }),
);

/* ---------------- POST /api/time/clock-out ---------------- */
employeesRouter.post(
    '/clock-out',
    requireAuth,
    asyncHandler(async (req, res) => {
        const userId = (req as any).userId;
        await pool.query(
            'UPDATE time_entries SET clock_out = NOW() WHERE user_id = ? AND clock_out IS NULL',
            [userId],
        );
        res.json({ msg: 'Clocked out' });
    }),
);

/* ---------------- GET /api/employees/time/summary ------------- */
/*   ?user=5&from=2025-06-01&to=2025-06-30                        */
/*   Returns { userId, hours }  (hours as decimal)                */
employeesRouter.get(
    '/time/summary',
    requireAuth,
    requireRoles('Store Manager'),
    asyncHandler(async (req, res) => {
        const { user, from, to } = req.query as {
            user: string; from: string; to: string;
        };

        if (!user || !from || !to) {
            res.status(400).json({ msg: 'Missing user/from/to query params' });
            return;
        }

        const [rows] = await pool.query<RowDataPacket[]>(
            `
      SELECT
        user_id                                                AS userId,
        ROUND(SUM(TIMESTAMPDIFF(SECOND, clock_in, clock_out))/3600, 2)
                                                              AS hours
      FROM   time_entries
      WHERE  clock_out IS NOT NULL
        AND  user_id = ?
        AND  clock_in  >= ?
        AND  clock_out <= ?
      GROUP BY user_id
      `,
            [user, from, to],
        );

        res.json(rows[0] ?? { userId: Number(user), hours: 0 });
    }),
);

/* ---------- GET /api/employees  (Store Manager only) ------- */
employeesRouter.get(
    '/',
    requireAuth,
    requireRoles('Store Manager'),
    asyncHandler(async (_req, res) => {
        const [rows] = await pool.query<EmployeeRow[]>(
            `
        SELECT u.id,
                u.email,
                GROUP_CONCAT(r.name ORDER BY r.name) AS roles
        FROM   users u
        LEFT   JOIN user_roles ur ON ur.user_id = u.id
        LEFT   JOIN roles       r ON r.id       = ur.role_id
        GROUP  BY u.id
        ORDER  BY u.email;
        `
        );

        const payload = rows.map(r => ({
            id: r.id,
            email: r.email,
            roles: r.roles ? r.roles.split(',') : [],
        }));

        res.json(payload);
    })
);
