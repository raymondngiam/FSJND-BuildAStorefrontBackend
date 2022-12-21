import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../middlewares/verifyAuthToken';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (_req: Request, res: Response) => {
  const user = await store.show(_req.params.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json((err as string) + user);
  }
};

const destroy = async (_req: Request, res: Response) => {
  const deleted = await store.delete(_req.body.id);
  res.json(deleted);
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password
  };
  try {
    const u = await store.authenticate(user.username, user.password as string);
    const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
  app.delete('/users', verifyAuthToken, destroy);
  app.post('/users/authenticate', authenticate);
};

export default userRoutes;
