// server.ts
import express, { Application } from "express";
import cors from "cors";
import connectDB from "./config/db";

import voteRoutes from "./routes/voteRoutes";
import votesByLocation from "./routes/getVotesByLocation";
import mostVotedCandidatesRoutes from "./routes/getMostVotedCandidateRoutes";
const app: Application = express();

app.use(cors());
// Conectar ao banco de dados
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Definir rotas

app.use("/api", voteRoutes);
app.use("/api", votesByLocation);
app.use("/api", mostVotedCandidatesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
