import serverless from 'serverless-http';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import categoriesRouter from './routes/categories';
import productsRouter from './routes/products';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req: Request, res: Response) {
  res.send('Welcome to the Smart API!');
});

app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);


export const handler = serverless(app);
