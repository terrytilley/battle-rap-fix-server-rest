import express from 'express';
import authRoutes from './auth.router';
import userRoutes from './user.router';
import leagueRoutes from './league.router';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Battle Rap Fix API v1.0' });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/leagues', leagueRoutes);

export default router;
