import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UsuarioPrograma } from './usuario-programa.model';

@Injectable()
export class UsuarioProgramaRepository {
    constructor(@InjectModel(UsuarioPrograma.name) private readonly usuarioProgramaModel: Model<UsuarioPrograma>) {}


    async findAll(): Promise<UsuarioPrograma[]> {
        return this.usuarioProgramaModel.find().exec();
    }

    async find(usuarioId: string): Promise<UsuarioPrograma[]> {
        mongoose.set('debug', true);
        return this.usuarioProgramaModel.find({ usuarioId }).exec();
    }

    async create(usuarioProgramaData: Partial<UsuarioPrograma>): Promise<UsuarioPrograma> {
        const usuarioProgramaCriado = new this.usuarioProgramaModel(usuarioProgramaData);
        return usuarioProgramaCriado.save();
    }

    // Outros métodos do repositório (atualizar, deletar, etc.)
}
