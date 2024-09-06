import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instituicao, InstituicaoDocument } from './instituicao.model';

@Injectable()
export class InstituicaoService {
  constructor(
    @InjectModel(Instituicao.name) private instituicaoModel: Model<InstituicaoDocument>,
  ) {}

  async listar(): Promise<Instituicao[]> {
    return this.instituicaoModel.find().exec();
  }

  async cadastrar(instituicao: Instituicao): Promise<Instituicao> {
    const novaInstituicao = new this.instituicaoModel(instituicao);
    return novaInstituicao.save();
  }
}
