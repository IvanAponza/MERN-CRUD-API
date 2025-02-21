import { Router } from 'express';
import { login, register } from '../controllers/auth-controller.js';
import {validateSchema} from '../middleware/validate.middleware.js';
import {loginSchema, registerSchema} from '../schema/auth.schema.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);

export default router;