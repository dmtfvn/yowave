import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';

import { LoginFormValues } from '../schemas/loginSchema';
import { SignupFormValues } from '../schemas/signupSchema';

import { AuthUserT } from '../types/response/AuthUserT';
import { AllUserDataT } from '../types/user/AllUserDataT';
import { UserDataT } from '../types/user/UserDataT';
import { NewUserT } from '../types/user/NewUserT';

import pool from '../config/db';
import authErrorExtender from '../utils/authErrorExtender';

async function login(formData: LoginFormValues): Promise<AuthUserT> {
  const existingDataQuery = `
    SELECT * FROM users u
    WHERE u.email=$1
  `;
  const existingDataValues = [formData.email];

  const result: QueryResult<AllUserDataT> = await pool.query(existingDataQuery, existingDataValues);
  if (!result.rowCount) {
    const err = authErrorExtender();

    throw err;
  }

  const passMatch = await bcrypt.compare(formData.password, result.rows[0].passhash);
  if (!passMatch) {
    const err = authErrorExtender();

    throw err;
  }

  return {
    loggedIn: true,
    userData: {
      id: result.rows[0].id,
      username: result.rows[0].username,
    }
  };
}

async function register(formData: SignupFormValues): Promise<AuthUserT> {
  const existingDataQuery = `
    SELECT username, email FROM users 
    WHERE username=$1 OR email=$2
  `;
  const existingDataValues = [formData.username, formData.email];

  const result: QueryResult<UserDataT> = await pool.query(existingDataQuery, existingDataValues);
  if (result.rowCount) {
    const data = result.rows[0].username === formData.username ? 'Username' : 'Email';

    const err = authErrorExtender(data);

    throw err;
  }

  const hashedPass = await bcrypt.hash(formData.password, 10);

  const userQuery = `
    INSERT INTO users(username, email, passhash)
    VALUES ($1,$2,$3)
    RETURNING id, username
  `;
  const userValues = [formData.username, formData.email, hashedPass];

  const NewUser: QueryResult<NewUserT> = await pool.query(userQuery, userValues);

  return {
    loggedIn: true,
    userData: {
      id: NewUser.rows[0].id,
      username: NewUser.rows[0].username,
    }
  };
}

export default {
  register,
  login,
};
