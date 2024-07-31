import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, {Document, ObjectId, SchemaTypes} from 'mongoose';

export type LinguagemDocument = Linguagem & Document;

@Schema({ collection: 'linguagem' })
export class Linguagem {

    @Prop({type: SchemaTypes.ObjectId})
    _id: mongoose.Types.ObjectId;

    @Prop({ required: true })
    nome: string;

    @Prop({ required: true })
    descricao: string;
}

export const LinguagemSchema = SchemaFactory.createForClass(Linguagem);
