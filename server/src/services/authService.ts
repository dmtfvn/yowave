import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';

import { LoginFormValues, loginSchema } from '../schemas/loginSchema';
import { SignupFormValues, signupSchema } from '../schemas/signupSchema';

import { AllUserDataT } from '../interfaces/user/AllUserDataT';
import { UserDataT } from '../interfaces/user/UserDataT';
import { NewUserT } from '../interfaces/user/NewUserT';

import { AuthUserT } from '../interfaces/response/AuthUserT';
import { FailedQueryT } from '../interfaces/response/FailedQueryT';

import pool from '../config/db';

async function login(formData: LoginFormValues): Promise<AuthUserT | FailedQueryT> {
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
    console.log('No user found')
    return { loggedIn: false, status: 'Invalid credentials' } as FailedQueryT;
  }

  const passMatch = await bcrypt.compare(user.password, result.rows[0].passhash);
  if (!passMatch) {
    console.log('No match')
    return { loggedIn: false, status: 'Invalid credentials' } as FailedQueryT;
  }

  return {
    loggedIn: true,
    user: {
      id: result.rows[0].id,
      username: result.rows[0].username,
    }
  };
}

async function register(formData: SignupFormValues): Promise<AuthUserT | FailedQueryT> {
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
    return { loggedIn: false, status: 'Username or email already taken' } as FailedQueryT;
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
