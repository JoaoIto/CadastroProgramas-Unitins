import { Module } from '@nestjs/common';
import { ProgramaController } from './programa.controller';
import {ProgramaService} from "./programa.service";
import {ProgramaRepository} from "./programa.repository";

@Module({
    controllers: [ProgramaController],
    providers:[ProgramaRepository]
})
export class ProgramaModule {}
