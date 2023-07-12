import { Injectable } from '@nestjs/common';
import {Programa} from "./programa.model";
import {CreateProgramaDto} from "./dto/createjoao.dto";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

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
}