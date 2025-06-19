import * as Yup from 'yup';

export const friendSchema = Yup.object({
  contact: Yup.string()
    .transform((value) => value === '' ? undefined : value)
    .trim()
    .min(2, 'Invalid username')
    .max(20, 'Invalid username')
});

export type FriendValue = Yup.InferType<typeof friendSchema>;
