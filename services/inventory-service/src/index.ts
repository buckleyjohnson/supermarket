import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { productsRouter } from './routes/products';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/inventory', productsRouter);   // ⇒ /inventory/products

const PORT = process.env.PORT ?? 4002;
app.listen(PORT, () => console.log(`📦 inventory-service running on :${PORT}`));
