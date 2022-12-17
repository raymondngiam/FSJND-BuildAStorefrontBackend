import express from 'express';
import cors from 'cors';
import userRoutes from './handlers/users';
import productRoutes from './handlers/products';
import orderRoutes from './handlers/orders';

const app = express();
const port = 3000;
const corsOption = {
  origin: 'http://somedomain.com',
  optionSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOption));

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Hello world!');
});

userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
