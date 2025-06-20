/* src/models/roleModel.ts --------------------------------------- */
import { pool } from '../config/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

interface RoleRow extends RowDataPacket { id: number; name: string; }

export async function findRoleIds(names: string[]) {
    if (!names.length) return [];
    const [rows] = await pool.query<RoleRow[]>(
        `SELECT id FROM roles WHERE name IN (${names.map(() => '?').join(',')})`,
        names
    );
    return rows.map(r => r.id);
}

export async function rolesForUser(userId: number) {
    const [rows] = await pool.query<RoleRow[]>(
        `SELECT r.name FROM roles r
        JOIN user_roles ur ON ur.role_id = r.id
        WHERE ur.user_id = ?`,
        [userId]
    );
    return rows.map(r => r.name);                        // ['Customer', 'Supplier']
}

export async function attachRoles(userId: number, roleIds: number[]) {
    if (!roleIds.length) return;
    await pool.query<ResultSetHeader>(
        `INSERT IGNORE INTO user_roles (user_id, role_id)
        VALUES ${roleIds.map(() => '(?,?)').join(',')}`,
        roleIds.flatMap(rid => [userId, rid])
    );
}
