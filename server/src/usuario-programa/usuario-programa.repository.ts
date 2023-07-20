import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsuarioPrograma } from './usuario-programa.model';

@Injectable()
export class UsuarioProgramaRepository {
    constructor(@InjectModel(UsuarioPrograma.name) private readonly usuarioProgramaModel: Model<UsuarioPrograma>) {}


    async findAll(): Promise<UsuarioPrograma[]> {
        return this.usuarioProgramaModel.find().exec();
    }
    async create(usuarioProgramaData: Partial<UsuarioPrograma>): Promise<UsuarioPrograma> {
        const usuarioProgramaCriado = new this.usuarioProgramaModel(usuarioProgramaData);
        return usuarioProgramaCriado.save();
    }

    // Outros métodos do repositório (atualizar, deletar, etc.)
}
