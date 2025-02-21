import {z} from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Username is required'
    }).trim(),
    email: z.string({
        required_error: 'Email is required'
    }).email({message: 'Invalid email'}).trim().toLowerCase(),
    password: z.string({
        required_error: 'Password is required'
    }).min(6, {message: 'Password must bet at least 6 character'})
  });