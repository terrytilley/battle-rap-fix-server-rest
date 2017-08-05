import express from 'express';
import { getLeagueEvents, getLeagueEvent } from '../controllers/event.controller';

const router = express.Router();

router.get('/:league_slug/events', getLeagueEvents);
router.get('/:league_slug/events/:event_slug', getLeagueEvent);

export default router;
