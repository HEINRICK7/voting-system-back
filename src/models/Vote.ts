import mongoose, { Schema, Document } from "mongoose";

interface IVote extends Document {
  candidatoPrefeito: {
    nome: string;
    numero: string;
  };
  candidatoVereador: {
    nome: string;
    numero: string;
  };
  pollingLocation: string;
  userIp: string;
  userAgent: string;
}

const VoteSchema: Schema = new Schema({
  candidatoPrefeito: {
    nome: { type: String, required: true },
    numero: { type: String, required: true },
  },
  candidatoVereador: {
    nome: { type: String, required: true },
    numero: { type: String, required: true },
  },
  pollingLocation: { type: String, required: true },
  userIp: { type: String, required: true }, // Adicionado campo para armazenar o IP
  userAgent: { type: String, required: true }, // Adicionado campo para armazenar o User-Agent
});

export default mongoose.model<IVote>("Vote", VoteSchema);
