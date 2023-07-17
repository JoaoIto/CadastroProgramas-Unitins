import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type UsuarioDocument = Usuario & Document;

@Schema({collection: 'usuario'})
export class Usuario{
    @Prop({required: true})
    nome: string

    @Prop({required: true})
    cpf: string
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
