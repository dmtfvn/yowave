import { LoginFormValues, loginSchema } from '../schemas/loginSchema';

async function register() { }

async function login(formData: LoginFormValues) {
  const user: LoginFormValues = await loginSchema.validate(formData, {
    abortEarly: false,
  });

  return user;
}

export default {
  register,
  login,
};
