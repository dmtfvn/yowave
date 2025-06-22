import { Pool } from 'pg';
import 'dotenv/config';

import { NewPoolConfigT } from '../types/pg/NewPoolConfigT';

const poolConfig: NewPoolConfigT = {
  database: process.env.DB_NAME!,
  host: process.env.DB_HOST!,
  password: process.env.DB_PASSWORD!,
  user: process.env.DB_USER!,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
};

const pool = new Pool(poolConfig);

export default pool;
