import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, {Document, ObjectId, SchemaTypes} from 'mongoose';

export type InstituicaoDocument = Instituicao & Document;

@Schema({ collection: 'instituicao' })
export class Instituicao {

    @Prop({type: SchemaTypes.ObjectId})
    _id: mongoose.Types.ObjectId;

    @Prop({ required: true })
    nome: string;

    @Prop({ required: true })
    sigla: string;

    @Prop({ required: true })
    site: string;
}

export const InstituicaoSchema = SchemaFactory.createForClass(Instituicao);
