import { Controller, Post, Body, Get, Param, Delete, UseGuards } from "@nestjs/common";
import { UsuarioProgramaService } from './usuario-programa.service';
import { CreateUsuarioProgramaDto } from './dto/createUsuario-Programa.dto';
import {UsuarioPrograma} from "./usuario-programa.model";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags('usuario-programa')
@Controller('usuario-programa')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsuarioProgramaController {
    constructor(private readonly usuarioProgramaService: UsuarioProgramaService) {}

    @Get()
    @ApiOperation({ summary: 'Lista todos os dados da tabela usuario/programa' })
    async getDados(){
        return this.usuarioProgramaService.listar();
    }

    @Post('/cadastrar')
    @ApiOperation({ summary: 'Cadastra os dados da tabela usuario/programa' })
    async create(@Body() createUsuarioProgramaDto: CreateUsuarioProgramaDto) {
        let usuarioPrograma = new UsuarioPrograma();
        usuarioPrograma.usuarioId = createUsuarioProgramaDto.usuarioId;
        usuarioPrograma.programaId = createUsuarioProgramaDto.programaId;

        return this.usuarioProgramaService.create(usuarioPrograma);
    }

    @Get(':usuarioId/programas')
    @ApiOperation({ summary: 'Lista todos os dados da tabela usuario/programa a partir do usuarioID' })
    async getProgramasPorUsuario(@Param('usuarioId') usuarioId: string) {
        return this.usuarioProgramaService.getUsuarioProgramasPorUsuario(usuarioId);
    }

    @Delete(':programaId')
    @ApiOperation({ summary: 'Lista todos os dados da tabela usuario/programa a partir do programaId' })
    async delete(@Param('programaId') programaId: string): Promise<UsuarioPrograma> {
        return this.usuarioProgramaService.delete(programaId);
    }
}
