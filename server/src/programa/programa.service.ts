import { Injectable, Logger } from "@nestjs/common";
import { ProgramaRepository } from "./programa.repository";
import { Programa } from "./programa.model";
import { UsuarioProgramaService } from "../usuario-programa/usuario-programa.service";
import { UsuarioService } from "../usuario/usuario.service";
import { ProgramaStatus } from "./programa-status.enum";
import { UsuarioPrograma } from "../usuario-programa/usuario-programa.model";

@Injectable()
export class ProgramaService {

    private readonly logger = new Logger(ProgramaService.name);
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

    async consultarByStatus(status): Promise<Programa[]> {
        return this.programaRepository.findByStatus(status);
    }

    async consultarByAprovados(status): Promise<Programa[]> {
        return this.programaRepository.findByStatus(ProgramaStatus.APROVADO);
    }

    async atualizar(uuid: string, updateData: Programa): Promise<Programa> {
        return this.programaRepository.update(uuid, updateData);
    }

    async deletar(uuid: string): Promise<void> {
        this.usuarioProgramaService.delete(uuid)
    }

    async getProgramasPorIds(programaIds: string[]) {
        this.logger.log(`Recebido ${programaIds.length} ids de programas`)
        this.logger.log("Recido programaIds: " + programaIds)
        return this.programaRepository.findByIds(programaIds);
    }
}

export default ProgramaService;
