import { Router } from 'express';
import { register } from '../controllers/auth-controller.js';
import {validateSchema} from '../middleware/validate.middleware.js';
import {registerSchema} from '../schema/auth.schema.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), register);

export default router;