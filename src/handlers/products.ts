import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import { DashboardQueries } from '../services/dashboard';
import { verifyAuthToken } from '../middlewares/verifyAuthToken';

const store = new ProductStore();
const dashboardQueries = new DashboardQueries();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const show = async (_req: Request, res: Response) => {
  try {
    const product = await store.show(_req.params.id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const popular = async (req: Request, res: Response) => {
  try {
    const result = await dashboardQueries.fiveMostPopular();
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json({ err });
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.delete('/products', verifyAuthToken, destroy);
  app.get('/products/dashboard/five-most-popular', popular);
};

export default productRoutes;
