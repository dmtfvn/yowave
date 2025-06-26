import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import pool from '../config/db';

import { LoginFormValues } from '../schemas/loginSchema';
import { SignupFormValues } from '../schemas/signupSchema';

import authErrorExtender from '../utils/auth/authErrorExtender';
import authUserCreator from '../utils/auth/authUserCreator';

import { AuthUserT } from '../types/response/AuthUserT';
import { AllUserDataQueryT } from '../types/user/AllUserDataQueryT';
import { UserDataQueryT } from '../types/user/UserDataQueryT';
import { UserDataT } from '../types/user/UserDataT';

async function login(formData: LoginFormValues): Promise<AuthUserT> {
  const existingDataQuery = `
    SELECT * FROM users u
    WHERE u.email=$1
  `;
  const existingDataValues = [formData.email];

  const result: QueryResult<AllUserDataQueryT> = await pool.query(existingDataQuery, existingDataValues);
  if (!result.rowCount) {
    const err = authErrorExtender();

    throw err;
  }

  const passMatch = await bcrypt.compare(formData.password, result.rows[0].passhash);
  if (!passMatch) {
    const err = authErrorExtender();

    throw err;
  }

  return authUserCreator(result.rows[0]);
}

async function register(formData: SignupFormValues): Promise<AuthUserT> {
  const existingDataQuery = `
    SELECT username, email FROM users 
    WHERE username=$1 OR email=$2
  `;
  const existingDataValues = [formData.username, formData.email];

  const result: QueryResult<UserDataQueryT> = await pool.query(existingDataQuery, existingDataValues);
  if (result.rowCount) {
    const data = result.rows[0].username === formData.username ? 'Username' : 'Email';

    const err = authErrorExtender(data);

    throw err;
  }

  const hashedPass = await bcrypt.hash(formData.password, 10);

  const userQuery = `
    INSERT INTO users(username, email, passhash, userid)
    VALUES ($1,$2,$3,$4)
    RETURNING userid, username
  `;
  const userValues = [formData.username, formData.email, hashedPass, uuidv4()];

  const newUser: QueryResult<UserDataT> = await pool.query(userQuery, userValues);

  return authUserCreator(newUser.rows[0]);
}

export default {
  register,
  login,
};
