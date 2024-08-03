import { Injectable, Logger } from "@nestjs/common";
import { ProgramaRepository } from "./programa.repository";
import { Programa } from "./programa.model";
import { UsuarioProgramaService } from "../usuario-programa/usuario-programa.service";
import { UsuarioService } from "../usuario/usuario.service";
import { ProgramaStatus } from "./programa-status.enum";
import { UsuarioPrograma } from "../usuario-programa/usuario-programa.model";
import mongoose from "mongoose";

@Injectable()
export class ProgramaService {

    private readonly logger = new Logger(ProgramaService.name);
    constructor(
        private programaRepository: ProgramaRepository,
        private usuarioService: UsuarioService,
        private usuarioProgramaService: UsuarioProgramaService,
    ) {}

    async criar(programaModel: Programa, autores: mongoose.Types.ObjectId[]): Promise<Programa> {
        // Cria o programa
        const programaCriado = await this.programaRepository.create(programaModel);
        
        // Consulta cada autor
        const autoresConsultados = await Promise.all(autores.map(async (autorId) => {
            return this.usuarioService.consultar(autorId);
        }));
    
        // Retorne o programa criado (ou faça algo com os autores consultados, se necessário)
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

    async getProgramasEnviados(page: number, limit: number) {
        return this.programaRepository.findProgramasEnviados(page, limit);
    }

    async getProgramasEnviadosByUser(userId: string, page: number, limit: number): Promise<{ data: Programa[], total: number }>{
        return this.programaRepository.findProgramasEnviadosByUser(userId, page, limit);
    }

    async getProgramasEmAnalise(page: number, limit: number): Promise<{ data: Programa[]; total: number }> {
        return this.programaRepository.findProgramasEmAnalise(page, limit);
      }
      

    async getProgramasPorIds(programaIds: string[]) {
        this.logger.log(`Recebido ${programaIds.length} ids de programas`)
        this.logger.log("Recido programaIds: " + programaIds)
        return this.programaRepository.findByIds(programaIds);
    }

    async getProgramasPorUsuarioId(usuarioId: mongoose.Types.ObjectId) {
        this.logger.log(`Recebido ${usuarioId} id de usuario`)
        return this.programaRepository.findByUsuarioId(usuarioId);
    }

    async getProgramasPorUsuarioIdPaginado(usuarioId: mongoose.Types.ObjectId, page: number, limit: number): Promise<{ data: Programa[], total: number }> {
        this.logger.log(`Recebido ${usuarioId} id de usuario para paginação`);
        return this.programaRepository.findByUsuarioIdPaginado(usuarioId, page, limit);
      }

    async getProgramasPorUsuarioIdTitulo(usuarioId: mongoose.Types.ObjectId, titulo: string) {
        this.logger.log(`Recebido ${usuarioId} id de usuario`)
        return this.programaRepository.findProgramaTituloByUsuarioId(usuarioId, titulo);
    }
}

export default ProgramaService;
