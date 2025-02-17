import { Router } from 'express';

const router = Router();

router.post('/register', (req, res) => {
    res.send('Auth Routes!!!');
})

export default router;