import { Injectable } from '@nestjs/common';
import {Joao} from "./joao.model";
import {CreateJoaoDto} from "./dto/createjoao.dto";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class JoaoRepository {
    constructor(@InjectModel(Joao.name) private catModel: Model<Joao>) {}

    async create(createCatDto: CreateJoaoDto): Promise<Joao> {
        const createdCat = new this.catModel(createCatDto);
        return createdCat.save();
    }

    async findAll(): Promise<Joao[]> {
        return this.catModel.find().exec();
    }
}