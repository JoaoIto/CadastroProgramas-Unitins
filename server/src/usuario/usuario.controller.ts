import { Controller, Post, Body, Get, Param, Put, Delete, Logger } from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import { ApiTags } from "@nestjs/swagger";
@ApiTags('usuario')
@Controller('/usuario')
    export class UsuarioController{
    private readonly logger = new Logger(UsuarioController.name);

    constructor (private usuarioService: UsuarioService){}
    @Get()
    getDados(){
        this.logger.log('Fazendo a busca dos dados de todos os usuários')
        return this.usuarioService.listar()
    }

    @Get('/:uuid')
    consultar(@Param("uuid") uuid: string) {
        this.logger.log('Fazendo a busca dos dados do usuario com o uuid: ' + uuid)
        return this.usuarioService.consultar(uuid);
    }

    @Get('/cpf/:cpf')
    consultarByCpf(@Param("cpf") cpf: string) {
        this.logger.log('Fazendo a busca dos dados do usuario com o cpf: ' + cpf)
        return this.usuarioService.consultarByCpf(cpf);
    }
}