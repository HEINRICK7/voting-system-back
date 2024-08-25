import express from "express";
import { getAllVotedCandidates } from "../controllers/voteController";

const router = express.Router();

router.get("/votes/most-voted", getAllVotedCandidates);

export default router;
