import express from 'express';
import { getVotesByLocation } from '../controllers/voteController';

const router = express.Router();

router.get('/votes/countByLocation', getVotesByLocation);

export default router;
