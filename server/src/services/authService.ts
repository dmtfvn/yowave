import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';

import { LoginFormValues, loginSchema } from '../schemas/loginSchema';
import { SignupFormValues, signupSchema } from '../schemas/signupSchema';

import { AllUserDataI } from '../interfaces/user/AllUserDataI';
import { UserDataI } from '../interfaces/user/UserDataI';

import { AuthUserI } from '../interfaces/response/AuthUserI';
import { FailedQueryI } from '../interfaces/response/FailedQueryI';

import pool from '../config/db';

async function login(formData: LoginFormValues) {
  const user: LoginFormValues = await loginSchema.validate(formData, {
    abortEarly: false,
  });

  const existingDataQuery = `
    SELECT * FROM users u
    WHERE u.email=$1
  `;
  const existingDataValues = [user.email];

  const result: QueryResult<AllUserDataI> = await pool.query(existingDataQuery, existingDataValues);
  if (!result.rowCount) {
    console.log('No user found')
    return { loggedIn: false, status: 'Invalid credentials' } as FailedQueryI;
  }

  const passMatch = await bcrypt.compare(user.password, result.rows[0].passhash);
  if (!passMatch) {
    console.log('No match')
    return { loggedIn: false, status: 'Invalid credentials' } as FailedQueryI;
  }

  return result.rows[0];
}

async function register(formData: SignupFormValues) {
  const user: SignupFormValues = await signupSchema.validate(formData, {
    abortEarly: false,
  });

  const existingDataQuery = `
    SELECT username, email FROM users 
    WHERE username=$1 OR email=$2
  `;
  const existingDataValues = [user.username, user.email];

  const result: QueryResult<UserDataI> = await pool.query(existingDataQuery, existingDataValues);

  if (result.rowCount) {
    return { loggedIn: false, status: 'Username or email already taken' } as FailedQueryI;
  }

  const hashedPass = await bcrypt.hash(user.password, 10);

  const userQuery = `
    INSERT INTO users(username, email, passhash)
    VALUES ($1,$2,$3)
    RETURNING id, username
  `;
  const userValues = [user.username, user.email, hashedPass];

  const NewUser: QueryResult<AuthUserI> = await pool.query(userQuery, userValues);

  return NewUser.rows[0];
}

export default {
  register,
  login,
};
