import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import { DashboardQueries } from '../services/dashboard';
import { verifyAuthToken } from '../middlewares/verifyAuthToken';

const store = new OrderStore();
const dashboardQueries = new DashboardQueries();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (_req: Request, res: Response) => {
  const order = await store.show(_req.params.id);
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const userCurrentOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.user_id);
    const result = await dashboardQueries.userCurrentOrder(userId);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.post('/orders', verifyAuthToken, create);
  app.delete('/orders', verifyAuthToken, destroy);
  app.post('/orders/:id/products', verifyAuthToken, addProduct);
  app.get(
    '/orders/dashboard/user-current/:user_id',
    verifyAuthToken,
    userCurrentOrder
  );
};

export default orderRoutes;
