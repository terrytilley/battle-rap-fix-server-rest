import express from 'express';
import { getAll } from '../controllers/league.controller';

const router = express.Router();

router.get('/', getAll);

export default router;
