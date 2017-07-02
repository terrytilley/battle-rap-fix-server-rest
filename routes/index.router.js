import express from 'express';
import userRoutes from './user.router';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Battle Rap Fix API v1.0' });
});

router.use('/users', userRoutes);

export default router;
