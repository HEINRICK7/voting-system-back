"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const voteController_1 = require("../controllers/voteController");
const router = express_1.default.Router();
router.post('/votes', voteController_1.createVote);
exports.default = router;
