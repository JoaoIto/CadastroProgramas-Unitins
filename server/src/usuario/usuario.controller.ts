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
    consultar(@Param() params: any) {
        return this.usuarioService.consultar(params.uuid);
    }
}