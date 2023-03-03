import serverless from 'serverless-http';
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import categories from './routes/categories';
import products from './routes/products';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req: Request, res: Response) {
  res.send('Welcome to the Smart API!');
});

app.use('/categories', categories);
app.use('/products', products);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not Found');
  res.status(404);
  next(error);
});

app.use(errorHandler);

export const handler = serverless(app);
