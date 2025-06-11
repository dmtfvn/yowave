import { Pool, PoolConfig } from 'pg';
import 'dotenv/config';

interface NewPoolConfig extends Omit<PoolConfig, 'database' | 'host' | 'password' | 'user'> {
  database: string;
  host: string;
  password: string;
  user: string;
  port?: number;
}

const poolConfig: NewPoolConfig = {
  database: process.env.DB_NAME!,
  host: process.env.DB_HOST!,
  password: process.env.DB_PASSWORD!,
  user: process.env.DB_USER!,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
};

const pool = new Pool(poolConfig);

export default pool;
