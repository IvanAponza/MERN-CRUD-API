import { Router } from 'express';

import authRoutes from '../routes/auth-routes.js';
import taskRoutes from '../routes/task-routes.js';

const router = Router();

router.use('/api', authRoutes);
router.use('/api', taskRoutes);

export default router;