import express from 'express';

import routes from './routes';

const app = express();
const port: number = 3000;

app.use(express.json());

app.use(routes);

app.listen(port, (): void => {
  console.log(`Server is listening on http://localhost:${port}...`);
});
