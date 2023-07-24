import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Document, SchemaTypes} from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema({ collection: 'usuario' })
export class Usuario {
    @Prop({type: SchemaTypes.ObjectId, required: true})
    _id: mongoose.Types.ObjectId;

    @Prop({ required: true })
    perfil: string;

    @Prop({ required: true })
    nome: string;

    @Prop({ required: true })
    cpf: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
