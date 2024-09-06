import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Linguagem, LinguagemDocument } from './linguagem.model';

@Injectable()
export class LinguagemService {
  constructor(
    @InjectModel(Linguagem.name) private linguagemModel: Model<LinguagemDocument>,
  ) {}

  async listar(): Promise<Linguagem[]> {
    return this.linguagemModel.find().exec();
  }

  async cadastrar(linguagem: Linguagem): Promise<Linguagem> {
    const novaLinguagem = new this.linguagemModel(linguagem);
    return novaLinguagem.save();
  }
}
