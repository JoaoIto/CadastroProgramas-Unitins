import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, {Document, ObjectId, SchemaTypes} from 'mongoose';
import {ProgramaStatus} from "./programa-status.enum";

export type ProgramaDocument = Programa & Document;

@Schema({ collection: 'programa' })
export class Programa {

    @Prop({type: SchemaTypes.ObjectId})
    _id: mongoose.Types.ObjectId;

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

    @Prop({type: String, required: true, enum: ProgramaStatus, default: ProgramaStatus.RASCUNHO })
    status: ProgramaStatus;

    @Prop({type: String, required: false})
    nomeArquivo: string;
}

export const ProgramaSchema = SchemaFactory.createForClass(Programa);
