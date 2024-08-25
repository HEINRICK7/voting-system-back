// server.ts
import express from "express";
import cors from "cors";

import voteRoutes from "./routes/voteRoutes";
import votesByLocation from "./routes/getVotesByLocation";
import mostVotedCandidatesRoutes from "./routes/getMostVotedCandidateRoutes";

const app = express();

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
app.use(cors(corsOptions));
// Conectar ao banco de dados

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definir rotas

app.use("/api", voteRoutes);
app.use("/api", votesByLocation);
app.use("/api", mostVotedCandidatesRoutes);

export default app;
