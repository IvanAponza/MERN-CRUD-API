import { Router } from 'express';
import { deleteUser, getUsers, login, logout, perfil, register, updateUser } from '../controllers/auth-controller.js';
import {validateSchema} from '../middleware/validate.middleware.js';
import {loginSchema, registerSchema} from '../schema/auth.schema.js';
import { authRequired } from '../middleware/validateToken.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/logout', logout);

//Protected
router.get('/perfil', authRequired, perfil);

export default router;