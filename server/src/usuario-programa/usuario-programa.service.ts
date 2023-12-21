import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsuarioPrograma } from './usuario-programa.model';
import {UsuarioProgramaRepository} from "./usuario-programa.repository";
import ProgramaService from "../programa/programa.service";

@Injectable()
export class UsuarioProgramaService {
    constructor(
        private usuarioProgramaRepository: UsuarioProgramaRepository,
        @InjectModel(UsuarioPrograma.name) private usuarioProgramaModel: Model<UsuarioPrograma>,
    ) {}

    listar(): Promise<UsuarioPrograma[]> {
        return this.usuarioProgramaRepository.findAll();
    }

    create(usuarioPrograma: UsuarioPrograma): Promise<UsuarioPrograma> {
        return this.usuarioProgramaRepository.create(usuarioPrograma);
    }

    async getUsuarioProgramasPorUsuario(usuarioId: string): Promise<UsuarioPrograma[]> {
        return this.usuarioProgramaRepository.find(usuarioId);
    }

    async delete(programaId: string): Promise<UsuarioPrograma> {
        return this.usuarioProgramaRepository.delete(programaId);
    }
}
