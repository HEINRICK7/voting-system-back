import express from 'express';
import { createVote } from '../controllers/voteController';

const router = express.Router();

router.post('/votes', createVote);

export default router;
