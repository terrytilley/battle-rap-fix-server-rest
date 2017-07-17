import express from 'express';
import { getAll, getById, getByUsername } from '../controllers/user.controller';

const router = express.Router();

router.get('/', getAll);
router.get('/id/:id', getById);
router.get('/:username', getByUsername);

export default router;
