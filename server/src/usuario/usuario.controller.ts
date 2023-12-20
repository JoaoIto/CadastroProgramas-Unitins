import {Controller, Post, Body, Get, Param, Put, Delete} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
@Controller('/usuario')
    export class UsuarioController{

    constructor (private usuarioService: UsuarioService){}
    @Get()
    getDados(){
        return this.usuarioService.listar()
    }

    @Get('/:uuid')
    consultar(@Param("uuid") uuid: string) {
        return this.usuarioService.consultar(uuid);
    }

    @Get('/cpf/:cpf')
    consultarByCpf(@Param("cpf") cpf: string) {
        return this.usuarioService.consultarByCpf(cpf);
    }
}