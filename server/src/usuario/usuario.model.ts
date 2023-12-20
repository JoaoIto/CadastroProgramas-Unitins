import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Document, SchemaTypes} from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema({ collection: 'usuario' })
export class Usuario {
    @Prop({type: SchemaTypes.ObjectId, required: true}) private _id: mongoose.Types.ObjectId;

    @Prop({ required: true }) private _perfil: string;

    @Prop({ required: true }) private _nome: string;

    @Prop({ required: true }) private _cpf: string;

    // @Prop({ required: true })
    // senha: string;


    get id(): mongoose.Types.ObjectId {
        return this._id;
    }

    get perfil(): string {
        return this._perfil;
    }

    set perfil(value: string) {
        this._perfil = value;
    }

    get nome(): string {
        return this._nome;
    }

    set nome(value: string) {
        this._nome = value;
    }

    get cpf(): string {
        return this._cpf;
    }

    set cpf(value: string) {
        this._cpf = value;
    }
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
