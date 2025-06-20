// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

/* --- DB pool verifies creds on startup -------------------------- */
import { pool } from './config/db';            // <- your mysql2/promise pool
pool.getConnection()
    .then((conn: { release: () => void; }) => {
        console.log('✅ MySQL connected');
        conn.release();
    })
    .catch((err: { message: any; }) => {
        console.error('❌ MySQL connection failed:', err.message);
        process.exit(1);                           // abort boot if DB is down
    });

/* --- Routers ---------------------------------------------------- */
import { authRouter } from './routes/authRoutes';
import { productsRouter } from './routes/productRoutes'; // optional
import { employeesRouter } from './routes/employeesRoutes';


const app = express();
app.use(cors());
app.use(express.json());

/* Health check (keeps Front-End proxy happy) */
app.get('/api/health', (_req, res) => res.send('API is healthy ✨'));

/* Feature routes */
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);      // remove if not ready
app.use('/api/employees', employeesRouter); 

/* 404 fallback */
app.all('*', (_req, res) => res.status(404).json({ msg: 'Route not found' }));

/* Basic error middleware */
app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err);
    res.status(err.status || 500).json({ msg: err.message || 'Server error' });
});

/* Start server */
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`🚀 API listening on ${PORT}`));




// import { inventoryRouter } from './routes/inventoryRoutes';
// app.use('/api/inventory', inventoryRouter);