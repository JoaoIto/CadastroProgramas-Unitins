import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {UsuarioProgramaModule} from "../usuario-programa/usuario-programa.module";
import {UsuarioModule} from "../usuario/usuario.module";
import { LinguagemController } from './linguagem.controller';
import { LinguagemRepository } from './linguagem.repository';
import { LinguagemService } from './linguagem.service';
import { LinguagemSchema } from './linguagem.model';
@Module({imports: [
        UsuarioProgramaModule,
        UsuarioModule,
        MongooseModule.forFeature([{ name: 'Linguagem', schema: LinguagemSchema }]),
    ],
    controllers: [LinguagemController],
    providers: [LinguagemService, LinguagemRepository],
})
export class LinguagemModule {}
