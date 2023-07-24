import mongoose from "mongoose";

export class CreateUsuarioProgramaDto {
    usuarioId: mongoose.Types.ObjectId; // ID do usuário
    programaId: mongoose.Types.ObjectId; // ID do programa
}
