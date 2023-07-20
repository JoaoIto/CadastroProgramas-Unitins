import {IsString, IsEmail, MinLength, IsNotEmpty, MaxLength, Length, IsDate} from 'class-validator';
import {ObjectId} from "mongoose";

export class CreateUsuarioProgramaDto {
    usuarioId: ObjectId; // ID do usuário
    programaId: ObjectId; // ID do programa
}
