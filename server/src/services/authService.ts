import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';

import { LoginFormValues, loginSchema } from '../schemas/loginSchema';
import { SignupFormValues, signupSchema } from '../schemas/signupSchema';

import { AuthUserT } from '../interfaces/response/AuthUserT';
import { AllUserDataT } from '../interfaces/user/AllUserDataT';
import { UserDataT } from '../interfaces/user/UserDataT';
import { NewUserT } from '../interfaces/user/NewUserT';

import pool from '../config/db';
import customAuthError from '../utils/customAuthError';

async function login(formData: LoginFormValues): Promise<AuthUserT> {
  const user: LoginFormValues = await loginSchema.validate(formData, {
    abortEarly: false,
  });

  const existingDataQuery = `
    SELECT * FROM users u
    WHERE u.email=$1
  `;
  const existingDataValues = [user.email];

  const result: QueryResult<AllUserDataT> = await pool.query(existingDataQuery, existingDataValues);
  if (!result.rowCount) {
    const err = customAuthError();

    throw err;
  }

  const passMatch = await bcrypt.compare(user.password, result.rows[0].passhash);
  if (!passMatch) {
    const err = customAuthError();

    throw err;
  }

  return {
    loggedIn: true,
    user: {
      id: result.rows[0].id,
      username: result.rows[0].username,
    }
  };
}

async function register(formData: SignupFormValues): Promise<AuthUserT> {
  const user: SignupFormValues = await signupSchema.validate(formData, {
    abortEarly: false,
  });

  const existingDataQuery = `
    SELECT username, email FROM users 
    WHERE username=$1 OR email=$2
  `;
  const existingDataValues = [user.username, user.email];

  const result: QueryResult<UserDataT> = await pool.query(existingDataQuery, existingDataValues);
  if (result.rowCount) {
    const data = result.rows[0].username === user.username ? 'Username' : 'Email';

    const err = customAuthError(data);

    throw err;
  }

  const hashedPass = await bcrypt.hash(user.password, 10);

  const userQuery = `
    INSERT INTO users(username, email, passhash)
    VALUES ($1,$2,$3)
    RETURNING id, username
  `;
  const userValues = [user.username, user.email, hashedPass];

  const NewUser: QueryResult<NewUserT> = await pool.query(userQuery, userValues);

  return {
    loggedIn: true,
    user: {
      id: NewUser.rows[0].id,
      username: NewUser.rows[0].username,
    }
  };
}

export default {
  register,
  login,
};
