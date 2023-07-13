import {Body, Injectable} from '@nestjs/common';
import { ProgramaRepository } from './programa.repository';
import {CreateProgramaDto} from "./dto/createPrograma.dto";
import {Programa} from "./programa.model";
import {AtualizarProgramaDto} from "./dto/atualizarPrograma.dto";

@Injectable()
export class ProgramaService {
    constructor(private programaRepository: ProgramaRepository) {}

    async criar(@Body() formData: CreateProgramaDto) {
        await this.programaRepository.create(formData);
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
