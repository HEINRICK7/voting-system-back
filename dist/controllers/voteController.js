"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllVotedCandidates = exports.getVotesByLocation = exports.createVote = void 0;
const Vote_1 = __importDefault(require("../models/Vote"));
const createVote = async (req, res) => {
    const { candidatoPrefeito, candidatoVereador, local } = req.body;
    if (!candidatoPrefeito || !candidatoVereador || !local) {
        res.status(400).json({ message: "Todos os campos são obrigatórios." });
        return;
    }
    const vote = new Vote_1.default({
        candidatoPrefeito,
        candidatoVereador,
        pollingLocation: local,
    });
    try {
        const newVote = await vote.save();
        res
            .status(201)
            .json({ message: "Voto computado com sucesso", vote: newVote });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Erro desconhecido." });
        }
    }
};
exports.createVote = createVote;
const getVotesByLocation = async (req, res) => {
    try {
        const votes = await Vote_1.default.aggregate([
            {
                $group: {
                    _id: "$pollingLocation",
                    count: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(votes);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Erro desconhecido." });
        }
    }
};
exports.getVotesByLocation = getVotesByLocation;
const getAllVotedCandidates = async (req, res) => {
    try {
        const votedPrefeitos = await Vote_1.default.aggregate([
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
        const votedVereadores = await Vote_1.default.aggregate([
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
            votedPrefeitos: votedPrefeitos.length > 0
                ? votedPrefeitos
                : [{ nome: "Nenhum", votes: 0, location: "N/A" }],
            votedVereadores: votedVereadores.length > 0
                ? votedVereadores
                : [{ nome: "Nenhum", votes: 0, location: "N/A" }],
        };
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao buscar candidatos votados." });
    }
};
exports.getAllVotedCandidates = getAllVotedCandidates;
