-- Query for creating a 'users' table in PostgreSQL to store user account information.

-- The table includes columns for:
--   id: Unique identifier for the user (auto-incremented)
--   username: User's chosen username (unique, max length 20)
--   email: User's email address (unique, max length 49)
--   passhash: The hashed password for the user
--   userid: A unique identifier for the user, generated using the uuid library

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(49) NOT NULL UNIQUE,
  passhash VARCHAR NOT NULL,
  userid VARCHAR NOT NULL UNIQUE
);
