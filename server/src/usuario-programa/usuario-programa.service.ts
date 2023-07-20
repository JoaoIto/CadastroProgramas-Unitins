import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsuarioPrograma } from './usuario-programa.model';
import {UsuarioProgramaRepository} from "./usuario-programa.repository";

@Injectable()
export class UsuarioProgramaService {
    constructor(
        private usuarioProgramaRepository: UsuarioProgramaRepository,
        @InjectModel(UsuarioPrograma.name) private usuarioProgramaModel: Model<UsuarioPrograma>,
    ) {}

    async listar(): Promise<UsuarioPrograma[]>{
        return this.usuarioProgramaRepository.findAll();
    }

    async create(UsuarioPrograma: UsuarioPrograma): Promise<UsuarioPrograma> {
        const usuarioPrograma = new this.usuarioProgramaModel(UsuarioPrograma);
        return usuarioPrograma.save();
    }
}
