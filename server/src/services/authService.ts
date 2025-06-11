import { LoginFormValues, loginSchema } from '../schemas/loginSchema';
import { RegisterFormValues, signupSchema } from '../schemas/signupSchema';

import pool from '../config/db';
import bcrypt from 'bcrypt';

import { QueryResult } from 'pg';
import { AuthUserI } from '../interfaces/response/AuthUserI';
import { FailedQueryI } from '../interfaces/response/FailedQueryI';

interface EmailRowI {
  email: string;
}

async function register(formData: RegisterFormValues) {
  const user: RegisterFormValues = await signupSchema.validate(formData, {
    abortEarly: false,
  });

  const existingDataQuery = `
    SELECT username, email FROM users 
    WHERE username=$1 OR email=$2
  `;
  const existingDataValues = [user.username, user.email];

  const result: QueryResult<EmailRowI> = await pool.query(existingDataQuery, existingDataValues);

  if (result.rowCount) {
    return { loggedIn: false, status: 'Email already taken' } as FailedQueryI;
  }

  const hashedPass = await bcrypt.hash(user.password, 10);

  const userQuery = `
    INSERT INTO users(username, email, passhash)
    VALUES ($1,$2,$3)
    RETURNING id, username
  `;
  const userValues = [user.username, user.email, hashedPass];

  const NewUser: QueryResult<AuthUserI | FailedQueryI> = await pool.query(userQuery, userValues);

  return NewUser.rows[0];
}

async function login(formData: LoginFormValues) {
  const user: LoginFormValues = await loginSchema.validate(formData, {
    abortEarly: false,
  });

  const userData = {
    email: user.email,
    username: 'Rick',
    id: 'u1'
  };

  return userData;
}

export default {
  register,
  login,
};
