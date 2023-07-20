import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import {Document, ObjectId, SchemaTypes} from 'mongoose';

export type ProgramaDocument = Programa & Document;

@Schema({ collection: 'programa' })
export class Programa {

    @Prop({type: SchemaTypes.ObjectId, required: true})
    _id: ObjectId

    @Prop({ required: true })
    nomeCompleto: string;

    @Prop({ required: true })
    rg: string;

    @Prop({ required: true })
    cpf: string;

    @Prop({ required: true })
    dataNascimento: Date;

    @Prop({ required: true })
    estadoCivil: string;
}

export const ProgramaSchema = SchemaFactory.createForClass(Programa);
