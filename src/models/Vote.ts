import mongoose, { Document, Schema } from 'mongoose';

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
  timestamp: Date;
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
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IVote>('Vote', VoteSchema);
