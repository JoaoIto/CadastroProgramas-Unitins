import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {UsuarioProgramaModule} from "../usuario-programa/usuario-programa.module";
import {UsuarioModule} from "../usuario/usuario.module";
import { InstituicaoSchema } from './instituicao.model';
import { InstituicaoRepository } from './instituicao.repository';
import { InstituicaoService } from './instituicao.service';
import { InstituicaoController } from './instituicao.controller';
@Module({imports: [
        UsuarioProgramaModule,
        UsuarioModule,
        MongooseModule.forFeature([{ name: 'Instituicao', schema: InstituicaoSchema }]),
    ],
    controllers: [InstituicaoController],
    providers: [InstituicaoService, InstituicaoRepository],
})
export class InstituicaoModule {}
