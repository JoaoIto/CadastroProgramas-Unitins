import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, {Document, ObjectId, SchemaTypes} from 'mongoose';
import {ProgramaStatus} from "./programa-status.enum";
import { ProgramaFase } from './programa-fase.enum';

export type ProgramaDocument = Programa & Document;

@Schema({ collection: 'programa' })
export class Programa {

    @Prop({type: SchemaTypes.ObjectId})
    _id: mongoose.Types.ObjectId;

    @Prop({type: [SchemaTypes.ObjectId], required: true})
    autores: mongoose.Types.ObjectId[];

    @Prop({ required: true })
    titulo: string;

    @Prop({ required: true })
    descricao: string;

    @Prop({ required: true })
    solucaoProblemaDesc: string;

    @Prop({ required: true })
    linguagens: string[];

    @Prop({default: null})
    outrasObrasDesc: string;

    @Prop({default: null})
    fonteFinanciamentoDesc: string;

    @Prop({default: null})
    revelacaoDesc: string;

    @Prop({default: null})
    revelacaoPublicaDesc: string;

    @Prop({ required: true })
    descricaoMercado: string;

    @Prop({ required: true })
    dataCriacaoPrograma: Date;

    @Prop({ required: true, default: new Date() })
    dataCriacao: Date;

    @Prop({ required: true })
    vinculoUnitins: boolean;

    @Prop({default: null})
    vinculoInstitucional: string;

    @Prop({type: String, enum: ProgramaFase })
    fasePublicacao: ProgramaFase;

    @Prop({type: String, required: true, enum: ProgramaStatus, default: ProgramaStatus.RASCUNHO })
    status: ProgramaStatus;

    @Prop({type: String, required: false})
    nomeArquivo: string;

    @Prop({ type: String, default: null })
    documentoConfidencialidadePath: string;

    @Prop({ type: String, default: null })
    codigoFontePath: string;
    
}

export const ProgramaSchema = SchemaFactory.createForClass(Programa);
