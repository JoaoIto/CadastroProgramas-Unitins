import { Injectable } from '@nestjs/common';
import {Programa} from "./programa.model";
import {CreateProgramaDto} from "./dto/createPrograma.dto";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {AtualizarProgramaDto} from "./dto/atualizarPrograma.dto";

@Injectable()
export class ProgramaRepository {
    constructor(@InjectModel(Programa.name) private readonly programa: Model<Programa>) {}

    async create(createCatDto: CreateProgramaDto): Promise<Programa> {
        const programaCriado = new this.programa(createCatDto);
        return programaCriado.save();
    }

    async findAll(): Promise<Programa[]> {
        return this.programa.find().exec();
    }

    async findById(uuid): Promise<Programa> {
        return this.programa.findById(uuid).exec();
    }

    async update(
        uuid: string,
        updateData: AtualizarProgramaDto,
    ): Promise<Programa | null> {
        const programaAtualizado = await this.programa.findByIdAndUpdate(
            uuid,
            updateData,
            { new: true },
        );
        console.log(`O programa foi atualizado! Programa atualizado ${uuid}: ${programaAtualizado}`)
        return programaAtualizado;
    }
}