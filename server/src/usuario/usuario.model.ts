import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import {Document, ObjectId, SchemaTypes, Types} from 'mongoose';
export type UsuarioDocument = Usuario & Document;

@Schema({ collection: 'usuario' })
export class Usuario {
    @Prop({type: SchemaTypes.ObjectId, required: true})
    _id: ObjectId

    @Prop({ required: true })
    perfil: string;

    @Prop({ required: true })
    nome: string;

    @Prop({ required: true })
    cpf: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
