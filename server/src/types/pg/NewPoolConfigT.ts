import { PoolConfig } from 'pg';

export type NewPoolConfigT = Omit<PoolConfig, 'database' | 'host' | 'password' | 'user'> & {
  database: string;
  host: string;
  password: string;
  user: string;
  port?: number;
};
