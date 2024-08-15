import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Role } from "../roles/roles.enum";
import { EnderecoDTO } from './dto/cadastro.dto';

export type UsuarioDocument = Usuario & Document;

@Schema({ collection: 'usuario' })
export class Usuario {
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    _id: mongoose.Types.ObjectId;

    @Prop({ required: true, default: Role.User })
    perfil: Role;

    @Prop({ required: true, default: 'usuarioTeste' })
    nome: string;

    @Prop({ required: true })
    cpf: string;

    @Prop({ required: true })
    rg: string;

    @Prop({ required: true })
    senha: string;

    @Prop()
    matricula: string;

    @Prop({ required: true })
    endereco: EnderecoDTO;

    @Prop({ type: [String], default: [] })
    camposIncompletos: string[];
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
