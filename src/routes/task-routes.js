import {Router} from 'express';
import { createTasks, deleteTasks, getTask, getTasks, updateTasks } from '../controllers/task-controller.js';
import { authRequired } from '../middleware/validateToken.js';


const router = Router();

router.post('/tasks', authRequired, createTasks);
router.get('/tasks', authRequired, getTasks);
router.get('/tasks/:id', authRequired, getTask);
router.put('/tasks/:id', authRequired, updateTasks);
router.delete('/tasks/:id', authRequired, deleteTasks);

export default router;