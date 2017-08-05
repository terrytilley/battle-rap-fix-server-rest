import express from 'express';
import { isValidId } from '../lib/validate';
import { requireAuth } from '../config/passport';
import { createLeague, getAll, getById, getBySlug } from '../controllers/league.controller';

const router = express.Router();

router.post('/', requireAuth, createLeague);
router.get('/', getAll);
router.get('/id/:id', isValidId, getById);
router.get('/:slug', getBySlug);

export default router;
