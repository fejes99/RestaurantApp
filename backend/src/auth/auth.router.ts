import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { registerUser, loginUser, logoutUser } from './auth.controller';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

export default router;
