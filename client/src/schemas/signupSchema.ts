import * as Yup from 'yup';

export const signupSchema = Yup.object({
  username: Yup.string()
    .transform((value) => value === '' ? undefined : value)
    .trim()
    .required('Username is required')
    .min(2, 'Username too short (min 2 chars)')
    .max(20, 'Username too long (max 20 chars)')
    .matches(/^[a-z]*$/i, 'Invalid username format'),
  email: Yup.string()
    .transform((value) => value === '' ? undefined : value)
    .trim()
    .lowercase()
    .required('Email is required')
    .min(7, 'Email too short (min 7 chars)')
    .max(49, 'Email too long (max 49 chars)')
    .matches(/^[a-z0-9.-]+@[a-z0-9.-]+\.(bg|com|org|io)$/, 'Invalid email format'),
  password: Yup.string()
    .transform((value) => value === '' ? undefined : value)
    .trim()
    .required('Password is required')
    .min(8, 'Password too short (min 8 chars)')
    .max(16, 'Password too long (max 16 chars)'),
  rePassword: Yup.string()
    .transform((value) => value === '' ? undefined : value)
    .trim()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords don\'t match'),
});

export type SignupFormValues = Yup.InferType<typeof signupSchema>;
