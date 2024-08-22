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

    @Prop({ required: true, example: 'usuarioTeste' })
    nome: string;

    @Prop({ required: true })
    cpf: string;

    @Prop({ required: true, example: 'email@exampleEmail.com' })
    email: string;

    @Prop({ required: true })
    rg: string;

    @Prop({ required: true, default: '1234' })
    senha: string;

    @Prop({ default: null })
    matricula: string;

    @Prop({ required: false, default: null })
    telefone: string;

    @Prop({ required: false, default: null })
    endereco: EnderecoDTO;

    @Prop({ required: false, default: null })
    bairro: string;

    @Prop({ required: false, default: null })
    cep: string;

    @Prop({ required: false, default: null })
    dataNascimento: string;

    @Prop({ required: false, default: null })
    orgaoEmissor: string;

    @Prop({ required: false, default: null })
    profissao: string;

    @Prop({ required: false, default: null })
    cidade: string;

    @Prop({ required: false, default: null })
    estado: string;

    @Prop({ type: [String], default: [] })
    camposIncompletos: string[];
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
