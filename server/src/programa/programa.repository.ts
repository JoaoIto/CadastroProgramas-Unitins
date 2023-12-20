import { Injectable, Logger } from "@nestjs/common";
import {Programa} from "./programa.model";
import mongoose, {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {AtualizarProgramaDto} from "./dto/atualizarPrograma.dto";

@Injectable()
export class ProgramaRepository {
    private readonly logger = new Logger(ProgramaRepository.name);
    constructor(
        @InjectModel(Programa.name) private readonly programa: Model<Programa>
    ) {}

    async create(programaData: Partial<Programa>): Promise<Programa> {
        const programaCriado = new this.programa(programaData);
        programaCriado._id = new mongoose.Types.ObjectId();
        console.log(programaCriado._id)
        return programaCriado.save();
    }


    async findAll(): Promise<Programa[]> {
        return this.programa.find().exec();
    }

    async findById(uuid): Promise<Programa> {
        const programa = await this.programa.findById(uuid).exec();
        this.logger.log('programa retornado: ' + programa);
        return programa;
    }

    async update(
        uuid: string,
        updateData: Programa,
    ): Promise<Programa | null> {
        const programaAtualizado = await this.programa.findByIdAndUpdate(
            uuid,
            updateData,
            { new: true },
        );
        this.logger.log(`O programa foi atualizado! Programa atualizado ${uuid}: ${programaAtualizado}`)
        return programaAtualizado;
    }

    async delete(uuid: string): Promise<void> {
        const programaApagar = await this.programa.findByIdAndDelete(uuid);
        this.logger.log(`O programa foi deletado! Programa deletado ${uuid}: ${programaApagar}`);
    }
}