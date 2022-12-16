import express from 'express';
import cors from 'cors';

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

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
