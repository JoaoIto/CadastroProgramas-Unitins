import { Controller, Post, Body, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LinguagemService } from './linguagem.service';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Linguagem } from "./linguagem.model";

@ApiTags('linguagem')
@Controller('linguagem')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class LinguagemController {
  constructor(private readonly linguagemService: LinguagemService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos as linguagens' })
  async getDados() {
    return this.linguagemService.listar();
  }

  @Post()
  @ApiOperation({ summary: 'Cadastra uma nova linguagem' })
  async create(@Body() linguagem: Linguagem) {
    return this.linguagemService.cadastrar(linguagem);
  }
}
