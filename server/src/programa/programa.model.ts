import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ProgramaDocument = Programa & Document;

@Schema({collection: 'programa'})
export class Programa {
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