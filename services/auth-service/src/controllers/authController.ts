//controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { pool } from '../config/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { findRoleIds, attachRoles, rolesForUser } from '../models/roleModel';

/* ------------------------------------------------------------- */
/* helpers                                                       */
/* ------------------------------------------------------------- */

interface UserRow extends RowDataPacket {
    id: number;
    email: string;
    password_hash: string;
}

const signToken = (id: number, email: string, roles: string[]) =>
    jwt.sign({ id, email, roles }, process.env.JWT_SECRET!, { expiresIn: '7d' });


// const signToken = (id: number, email: string) =>
//     jwt.sign({ id, email }, process.env.JWT_SECRET!, { expiresIn: '7d' });

/* ------------------------------------------------------------- */
/* controllers                                                   */
/* ------------------------------------------------------------- */
interface MeRow extends RowDataPacket {
    id: number;
    email: string;
    createdAt: Date;
}

export const me = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).userId;
    const [rows] = await pool.query<MeRow[]>('SELECT id, email, created_at AS createdAt FROM users WHERE id = ?', [
        userId,
    ]);
    if (!rows.length) {
        res.status(404).json({ msg: 'User not found' });
        return;
    }
    const roles = await rolesForUser(userId);
    res.json({ ...rows[0], roles });
});
/** POST /api/auth/register */
const CUSTOMER_ROLE = ['Customer'];

export const register = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    /* duplicate-email check … */

    const hash = await bcrypt.hash(password, 12);
    const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO users (email, password_hash) VALUES (?, ?)',
        [email, hash]
    );
    const userId = result.insertId;

    /* attach default role */
    const roleIds = await findRoleIds(CUSTOMER_ROLE);
    await attachRoles(userId, roleIds);

    res.json({ token: signToken(userId, email, CUSTOMER_ROLE) });
});



// export const register = asyncHandler(
//     async (req: Request, res: Response): Promise<void> => {
//         const { email, password } = req.body as { email: string; password: string };

//         if (!email || !password) {
//             res.status(400).json({ msg: 'Email & password required' });
//             return;
//         }

//         /* --- check duplicate email -------------------------------- */
//         const [dupRows] = await pool.query<UserRow[]>(
//             'SELECT id FROM users WHERE email = ?',
//             [email],
//         );
//         if (dupRows.length) {
//             res.status(409).json({ msg: 'Email already registered' });
//             return;
//         }

//         /* --- insert new user -------------------------------------- */
//         const hash = await bcrypt.hash(password, 12);

//         const [result] = await pool.query<ResultSetHeader>(
//             'INSERT INTO users (email, password) VALUES (?, ?)',
//             [email, hash],
//         );

//         const insertId = result.insertId;
//         res.json({ token: signToken(insertId, email) });
//     },
// );

/** POST /api/auth/login */
export const login = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;// as { email: string; password: string };

        /* --- fetch user row --------------------------------------- */
        const [rows] = await pool.query<UserRow[]>(
            'SELECT * FROM users WHERE email = ?',
            [email],
        );
        if (!rows.length) {
            res.status(401).json({ msg: 'Invalid credentials' });
            return;
        }
        const user = rows[0];

        /* --- verify password -------------------------------------- */
        const ok = await bcrypt.compare(password, user.password_hash);
        if (!ok) {
            res.status(401).json({ msg: 'Invalid credentials' });
            return;
        }

        const roles = await rolesForUser(user.id);           // e.g. ['Cashier']
        res.json({ token: signToken(user.id, email, roles) });
        // res.json({ token: signToken(user.id, email) });
    },
);
