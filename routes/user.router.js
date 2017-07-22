import express from 'express';
import { isValidId } from '../lib/validate';
import { getAll, getById, getByUsername } from '../controllers/user.controller';

const router = express.Router();

router.get('/', getAll);
router.get('/id/:id', isValidId, getById);
router.get('/:username', getByUsername);

export default router;
