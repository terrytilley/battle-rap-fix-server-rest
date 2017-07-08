import express from 'express';
import { requireLogin } from '../config/passport';
import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', requireLogin, login);
router.patch('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

export default router;
