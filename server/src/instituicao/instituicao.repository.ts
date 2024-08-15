import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instituicao } from './instituicao.model';

@Injectable()
export class InstituicaoRepository {
    constructor(@InjectModel(Instituicao.name) private readonly linguagemModel: Model<Instituicao>) {}


    async findAll(): Promise<Instituicao[]> {
        return this.linguagemModel.find().exec();
    }

    async find(instituicaoId: string): Promise<Instituicao[]> {
        return this.linguagemModel.find({ _id: instituicaoId }).exec();
    }

    async create(instituicaoData: Partial<Instituicao>): Promise<Instituicao> {
        const linguagemCriada = new this.linguagemModel(instituicaoData);
        return linguagemCriada.save();
    }
    async delete(instituicaoId: string): Promise<Instituicao> {
        return this.linguagemModel.findOneAndRemove({ instituicaoId }).exec();
    }

}
