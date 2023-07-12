import { Module } from '@nestjs/common';
import { ProgramaController } from './programa.controller';
import { ProgramaService } from './programa.service';
import {ProgramaRepository} from "./programa.repository";
import {Programa, ProgramaSchema} from "./programa.model"
import {MongooseModule} from "@nestjs/mongoose";
@Module({imports: [
        MongooseModule.forFeature([{ name: 'Programa', schema: ProgramaSchema }]),
    ],
    controllers: [ProgramaController],
    providers: [ProgramaService, ProgramaRepository],
})
export class ProgramaModule {}
