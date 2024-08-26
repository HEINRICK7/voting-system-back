import { Request, Response } from "express";
import Vote from "../models/Vote";

export const createVote = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { candidatoPrefeito, candidatoVereador, local } = req.body;
  const userIp = req.ip;
  const userAgent = req.get("User-Agent") || "unknown";

  if (!candidatoPrefeito || !candidatoVereador || !local) {
    res.status(400).json({ message: "Todos os campos são obrigatórios." });
    return;
  }

  // Verifica se já existe um voto com o mesmo IP e User-Agent
  const existingVote = await Vote.findOne({ userIp, userAgent });

  if (existingVote) {
    res
      .status(403)
      .json({ message: "Você já votou a partir deste dispositivo." });
    return;
  }
  const vote = new Vote({
    candidatoPrefeito,
    candidatoVereador,
    pollingLocation: local,
    userIp,
    userAgent,
  });

  try {
    const newVote = await vote.save();
    res
      .status(201)
      .json({ message: "Voto computado com sucesso", vote: newVote });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Erro desconhecido." });
    }
  }
};

export const getVotesByLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const votes = await Vote.aggregate([
      {
        $group: {
          _id: "$pollingLocation",
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(votes);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Erro desconhecido." });
    }
  }
};

export const getAllVotedCandidates = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const votedPrefeitos = await Vote.aggregate([
      {
        $match: { "candidatoPrefeito.nome": { $exists: true, $ne: null } },
      },
      {
        $group: {
          _id: {
            nome: "$candidatoPrefeito.nome",
            location: "$pollingLocation",
          },
          votes: { $sum: 1 },
        },
      },
      {
        $sort: { votes: -1 }, // Ordena do maior para o menor
      },
      {
        $project: {
          _id: 0,
          nome: "$_id.nome",
          location: "$_id.location",
          votes: 1,
        },
      },
    ]);

    const votedVereadores = await Vote.aggregate([
      {
        $match: { "candidatoVereador.nome": { $exists: true, $ne: null } },
      },
      {
        $group: {
          _id: {
            nome: "$candidatoVereador.nome",
            location: "$pollingLocation",
          },
          votes: { $sum: 1 },
        },
      },
      {
        $sort: { votes: -1 }, // Ordena do maior para o menor
      },
      {
        $project: {
          _id: 0,
          nome: "$_id.nome",
          location: "$_id.location",
          votes: 1,
        },
      },
    ]);

    const result = {
      votedPrefeitos:
        votedPrefeitos.length > 0
          ? votedPrefeitos
          : [{ nome: "Nenhum", votes: 0, location: "N/A" }],
      votedVereadores:
        votedVereadores.length > 0
          ? votedVereadores
          : [{ nome: "Nenhum", votes: 0, location: "N/A" }],
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar candidatos votados." });
  }
};
