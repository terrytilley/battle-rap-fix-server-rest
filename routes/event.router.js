import express from 'express';
import { leagueEvents } from '../controllers/event.controller';

const router = express.Router();

router.get('/:slug/events', leagueEvents);

export default router;
