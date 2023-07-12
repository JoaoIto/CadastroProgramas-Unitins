import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JoaoController } from './joao.controller';
import {JoaoRepository} from "./joao.repository";
import { Joao, JoaoSchema } from './joao.model';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Joao', schema: JoaoSchema }]),
    ],
    controllers: [JoaoController],
    providers:[JoaoRepository]
})
export class JoaoModule {}
