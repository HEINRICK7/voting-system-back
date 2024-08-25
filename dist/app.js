"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const voteRoutes_1 = __importDefault(require("./routes/voteRoutes"));
const getVotesByLocation_1 = __importDefault(require("./routes/getVotesByLocation"));
const getMostVotedCandidateRoutes_1 = __importDefault(require("./routes/getMostVotedCandidateRoutes"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: [
        "http://localhost:3000",
        "https://voting-system-chi-nine.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use((0, cors_1.default)(corsOptions));
// Conectar ao banco de dados
// Middleware para parsear JSON
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Definir rotas
app.use("/api", voteRoutes_1.default);
app.use("/api", getVotesByLocation_1.default);
app.use("/api", getMostVotedCandidateRoutes_1.default);
exports.default = app;
