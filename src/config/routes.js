import { Router } from 'express';

import authRoutes from '../routes/auth-routes.js';

const router = Router();

router.use('/api', authRoutes);

export default router;