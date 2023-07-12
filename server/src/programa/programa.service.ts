import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Programa } from './programa.model';

@Injectable()
export class ProgramaService {
    constructor(
        @InjectModel('Programa') private readonly programaModel: Model<Programa>,
    ) {}

    async enviarDados(formData: object): Promise<Programa> {
        const novoPrograma = new this.programaModel(formData);
        return novoPrograma.save();
    }

    async listarProgramas(): Promise<Programa[]> {
        return this.programaModel.find().exec();
    }
}
