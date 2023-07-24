import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes, Types, ObjectId } from 'mongoose';

export type UsuarioProgramaDocument = UsuarioPrograma & Document;

@Schema({ collection: 'usuario-programa' })
export class UsuarioPrograma {
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Usuario', required: true })
    usuarioId: mongoose.Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Programa', required: true })
    programaId: mongoose.Types.ObjectId;
}

export const UsuarioProgramaSchema = SchemaFactory.createForClass(UsuarioPrograma);
