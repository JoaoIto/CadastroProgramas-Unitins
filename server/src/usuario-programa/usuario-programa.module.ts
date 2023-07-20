import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {UsuarioPrograma, UsuarioProgramaSchema} from "./usuario-programa.model";
import {UsuarioProgramaController} from "./usuario-programa.controller";
import {UsuarioProgramaService} from "./usuario-programa.service";
import {UsuarioProgramaRepository} from "./usuario-programa.repository";
@Module({imports: [
        MongooseModule.forFeature([{ name: 'usuario-programa', schema: UsuarioProgramaSchema }]),
    ],
    controllers: [UsuarioProgramaController],
    providers: [UsuarioProgramaService, UsuarioProgramaRepository],
    exports: [UsuarioProgramaService]
})
export class UsuarioProgramaModule {}
