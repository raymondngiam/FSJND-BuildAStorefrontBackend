import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
