import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/roles.enum";

export type UsuarioDocument = Usuario & Document;

@Schema({ collection: 'usuario' })
export class Usuario {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    @ApiProperty()
     _id: mongoose.Types.ObjectId;

    @Prop({ required: true })
     perfil: Role;

    @Prop({ required: true })
     nome: string;

    @Prop({ required: true })
     cpf: string;

    @Prop({ required: true })
     senha: string;

    @Prop()
    matricula: string;

    @Prop()
    endereco: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
