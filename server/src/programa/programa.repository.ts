import { Injectable } from '@nestjs/common';
import {Programa} from "./programa.model";
import {CreateProgramaDto} from "./dto/createjoao.dto";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class ProgramaRepository {
    constructor(@InjectModel(Programa.name) private catModel: Model<Programa>) {}

    async create(createCatDto: CreateProgramaDto): Promise<Programa> {
        const createdCat = new this.catModel(createCatDto);
        return createdCat.save();
    }

    async findAll(): Promise<Programa[]> {
        return this.catModel.find().exec();
    }
}