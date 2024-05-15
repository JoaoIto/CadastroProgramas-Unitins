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
        return this.usuarioProgramaModel.find({ usuarioId: usuarioId }).exec();
    }

    async create(usuarioProgramaData: Partial<UsuarioPrograma>): Promise<UsuarioPrograma> {
        const usuarioProgramaCriado = new this.usuarioProgramaModel(usuarioProgramaData);
        return usuarioProgramaCriado.save();
    }
    async delete(programaId: string): Promise<UsuarioPrograma> {
        return this.usuarioProgramaModel.findOneAndRemove({ programaId }).exec();
    }

}
