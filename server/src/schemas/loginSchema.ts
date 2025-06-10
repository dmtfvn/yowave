import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string()
    .transform((value) => value === '' ? undefined : value)
    .trim()
    .lowercase()
    .required('Email is required'),
  password: Yup.string()
    .transform((value) => value === '' ? undefined : value)
    .trim()
    .required('Password is required')
});

export type LoginFormValues = Yup.InferType<typeof loginSchema>;
