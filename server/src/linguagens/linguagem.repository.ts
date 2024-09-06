import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Linguagem } from './linguagem.model';

@Injectable()
export class LinguagemRepository {
    constructor(@InjectModel(Linguagem.name) private readonly linguagemModel: Model<Linguagem>) {}


    async findAll(): Promise<Linguagem[]> {
        return this.linguagemModel.find().exec();
    }

    async find(linguagemId: string): Promise<Linguagem[]> {
        return this.linguagemModel.find({ _id: linguagemId }).exec();
    }

    async create(linguagemData: Partial<Linguagem>): Promise<Linguagem> {
        const linguagemCriada = new this.linguagemModel(linguagemData);
        return linguagemCriada.save();
    }
    async delete(linguagemId: string): Promise<Linguagem> {
        return this.linguagemModel.findOneAndRemove({ linguagemId }).exec();
    }

}
