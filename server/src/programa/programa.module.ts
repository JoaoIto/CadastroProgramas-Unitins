import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramaController } from './programa.controller';
import {ProgramaRepository} from "./programa.repository";
import { Programa, ProgramaSchema } from './programa.model';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Programa', schema: ProgramaSchema }]),
    ],
    controllers: [ProgramaController],
    providers:[ProgramaRepository]
})
export class ProgramaModule {}
