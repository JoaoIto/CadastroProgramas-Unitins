import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";

export type UsuarioDocument = Usuario & Document;

@Schema({ collection: 'usuario' })
export class Usuario {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    @ApiProperty()
     _id: mongoose.Types.ObjectId;

    @Prop({ required: true })
     perfil: string;

    @Prop({ required: true })
     nome: string;

    @Prop({ required: true })
     cpf: string;

    @Prop({ required: true })
     senha: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
