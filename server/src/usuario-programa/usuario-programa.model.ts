import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types, ObjectId } from 'mongoose';

export type UsuarioProgramaDocument = UsuarioPrograma & Document;

@Schema({ collection: 'usuario-programa' })
export class UsuarioPrograma {
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Usuario', required: true })
    usuarioId: ObjectId;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Programa', required: true })
    programaId: ObjectId;
}

export const UsuarioProgramaSchema = SchemaFactory.createForClass(UsuarioPrograma);
