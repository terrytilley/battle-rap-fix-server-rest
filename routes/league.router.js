import express from 'express';
import { isValidId } from '../lib/validate';
import { getAll, getById, getBySlug } from '../controllers/league.controller';

const router = express.Router();

router.get('/', getAll);
router.get('/id/:id', isValidId, getById);
router.get('/:slug', getBySlug);

export default router;
