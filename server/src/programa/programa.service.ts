import {Body, Injectable} from '@nestjs/common';
import { ProgramaRepository } from './programa.repository';
import {CreateProgramaDto} from "./dto/createjoao.dto";
import {Programa} from "./programa.model";

@Injectable()
export class ProgramaService {
    constructor(private programaRepository: ProgramaRepository) {}

    async criar(@Body() formData: CreateProgramaDto) {
        await this.programaRepository.create(formData);
    }

    async listar(): Promise<Programa[]> {
        return this.programaRepository.findAll();
    }
}

export default ProgramaService;
