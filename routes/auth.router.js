import express from 'express';
import { requireLogin } from '../config/passport';
import {
  register,
  login,
} from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', requireLogin, login);

export default router;
