import {Controller, Post, Body, Get, Param} from '@nestjs/common';
import { UsuarioProgramaService } from './usuario-programa.service';
import { CreateUsuarioProgramaDto } from './dto/createUsuario-Programa.dto';
import {UsuarioPrograma} from "./usuario-programa.model";

@Controller('usuario-programa')
export class UsuarioProgramaController {
    constructor(private readonly usuarioProgramaService: UsuarioProgramaService) {}

    @Get()
    async getDados(){
        return this.usuarioProgramaService.listar();
    }

    @Post('/cadastrar')
    async create(@Body() createUsuarioProgramaDto: CreateUsuarioProgramaDto) {
        let usuarioPrograma = new UsuarioPrograma();
        usuarioPrograma.usuarioId = createUsuarioProgramaDto.usuarioId;
        usuarioPrograma.programaId = createUsuarioProgramaDto.programaId;

        return this.usuarioProgramaService.create(usuarioPrograma);
    }

    @Get(':usuarioId/programas')
    async getProgramasPorUsuario(@Param('usuarioId') usuarioId: string) {
        return this.usuarioProgramaService.getProgramasPorUsuario(usuarioId);
    }
}
