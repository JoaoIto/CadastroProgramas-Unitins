import {Body, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Programa } from './programa.model';
import {ProgramaRepository} from "./programa.repository";
import {CreateProgramaDto} from "./dto/createjoao.dto";

@Injectable()
export class ProgramaService {
    constructor(private programaRepository: ProgramaRepository) {}

    // async enviarDados(formData: object): Promise<Programa> {
    //     const novoPrograma = new this.programaModel(formData);
    //     return novoPrograma.save();
    // }

    async criar(@Body() formData: CreateProgramaDto) {
        this.programaRepository.create(formData);
    }

    async listar(): Promise<Programa[]> {
        return this.programaRepository.findAll();
    }
}
