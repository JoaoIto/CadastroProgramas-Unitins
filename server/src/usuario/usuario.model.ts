import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/roles.enum";

export type UsuarioDocument = Usuario & Document;

@Schema({ collection: 'usuario' })
export class Usuario {
    @Prop({ type: mongoose.Schema.Types.ObjectId})
     _id: mongoose.Types.ObjectId;

    @Prop({ required: true, default: Role.User })
     perfil: Role;

    @Prop({ required: true, default: 'usuarioTeste' })
     nome: string;

    @Prop({ required: true })
     cpf: string;

    @Prop({ required: true })
     senha: string;

    @Prop({ required: true, default: '1112324232' })
    matricula: string;

    @Prop({default: 'rua 1, bairro teste'})
    endereco: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
