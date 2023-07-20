import {Injectable} from '@nestjs/common';
import { ProgramaRepository } from './programa.repository';
import {Programa} from "./programa.model";
import {AtualizarProgramaDto} from "./dto/atualizarPrograma.dto";
import {UsuarioProgramaService} from "../usuario-programa/usuario-programa.service";
import {UsuarioService} from "../usuario/usuario.service";

@Injectable()
export class ProgramaService {
    constructor(
        private programaRepository: ProgramaRepository,
        private usuarioService: UsuarioService,
        private usuarioProgramaService: UsuarioProgramaService,
    ) {}

    async criar(programaModel: Programa, userId: string): Promise<Programa> {
        const programaCriado = await this.programaRepository.create(programaModel);
        const usuario  = await this.usuarioService.consultar(userId);

        const usuarioPrograma = await this.usuarioProgramaService.create({
            programaId: programaCriado._id,
            usuarioId: usuario._id,
        });

        return programaCriado;
    }

    async listar(): Promise<Programa[]> {
        return this.programaRepository.findAll();
    }

    async consultar(uuid): Promise<Programa> {
        return this.programaRepository.findById(uuid);
    }

    async atualizar(uuid: string, updateData: AtualizarProgramaDto): Promise<Programa> {
        // Lógica para atualizar um programa pelo UUID
        return this.programaRepository.update(uuid, updateData);
    }

    async deletar(uuid: string): Promise<Programa> {
        // Lógica para atualizar um programa pelo UUID
        return this.programaRepository.delete(uuid);
    }
}

export default ProgramaService;
