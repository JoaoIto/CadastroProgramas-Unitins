import { Injectable, Logger } from "@nestjs/common";
import {Programa} from "./programa.model";
import mongoose, {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {UpdateProgramaInputDto} from "./dto/update/atualizarPrograma.dto";
import { ProgramaStatus } from "./programa-status.enum";

@Injectable()
export class ProgramaRepository {
    private readonly logger = new Logger(ProgramaRepository.name);
    constructor(
        @InjectModel(Programa.name) private readonly programa: Model<Programa>
    ) {}

    async create(programaData: Partial<Programa>): Promise<Programa> {
        const programaCriado = new this.programa(programaData);
        programaCriado._id = new mongoose.Types.ObjectId();
        programaCriado.usuarioId = programaData.usuarioId;
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

    async findByIds(programaUuids: string[]): Promise<Programa[]> {
        const programas = [];

        for (const uuid of programaUuids) {
            const programa = await this.programa.findById(uuid).exec();

            if (programa) {
                programas.push(programa);
                this.logger.log('Programa retornado para UUID ' + uuid + ': ' + programa);
            } else {
                this.logger.log('Nenhum programa encontrado para UUID ' + uuid);
            }
        }

        return programas;
    }



    async findByStatus(status: ProgramaStatus): Promise<Programa[]> {
        const programa = await this.programa.find({ status: 'APROVADO' }).exec();
        this.logger.log('programa retornado: ' + programa);
        return programa;
    }

    async findByUsuarioId(usuarioId: mongoose.Types.ObjectId): Promise<Programa[]> {
        const programa = await this.programa.find({ usuarioId: usuarioId }).exec();
        this.logger.log('programa retornado: ' + programa);
        return programa;
    }

    async findProgramaTituloByUsuarioId(usuarioId: mongoose.Types.ObjectId, titulo: string): Promise<Programa[]> {
        let query = { usuarioId: usuarioId , titulo: titulo};
        const programas = await this.programa.find(query).exec();
        this.logger.log('programas retornados: ' + programas);
        return programas;
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