import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Joao } from './joao.model';

@Injectable()
export class JoaoService {
    constructor(
        @InjectModel('Joao') private readonly programaModel: Model<Joao>,
    ) {}

    async enviarDados(formData: any): Promise<Joao> {
        const novoJoao = new this.programaModel(formData);
        return novoJoao.save();
    }

    async listarJoaos(): Promise<Joao[]> {
        return this.programaModel.find().exec();
    }
}
