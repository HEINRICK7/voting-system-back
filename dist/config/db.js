"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const connectDB = async () => {
    try {
        const dbURI = process.env.MONGODB_URI || '';
        if (!dbURI) {
            throw new Error("URI do MongoDB não está definida.");
        }
        await mongoose_1.default.connect(dbURI);
        console.log("Conectado ao MongoDB");
    }
    catch (err) {
        console.error("Erro ao conectar ao MongoDB", err);
        process.exit(1); // Sai do processo com erro
    }
};
exports.default = connectDB;
