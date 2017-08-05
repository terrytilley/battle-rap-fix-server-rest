import express from 'express';
import { isValidId } from '../lib/validate';
import { getAll, getById } from '../controllers/league.controller';

const router = express.Router();

router.get('/', getAll);
router.get('/id/:id', isValidId, getById);

export default router;
