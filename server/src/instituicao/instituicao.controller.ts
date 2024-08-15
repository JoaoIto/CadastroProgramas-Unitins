import { Controller, Post, Body, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Instituicao } from "./instituicao.model";
import { InstituicaoService } from "./instituicao.service";
import { Roles } from "src/roles/roles.decorator";
import { Role } from "src/roles/roles.enum";

@ApiTags("instituicao")
@Controller("instituicao")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class InstituicaoController {
  constructor(private readonly instituicaoService: InstituicaoService) {}

  @Get()
  @ApiOperation({
    summary: "Lista todas as instituições",
  })
  @ApiOkResponse({
    type: [Instituicao],
    description: 'Lista de todas as instituições cadastradas.',
  })
  @Roles(Role.Admin, Role.User)
  async getDados() {
    return this.instituicaoService.listar();
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({
    type: Instituicao,
    examples: {
      exemplo1: {
        summary: 'Exemplo de cadastro de Instituição',
        value: {
          nome: "Universidade Federal do Tocantins",
          sigla: "UFT",
          site: "https://www.uft.edu.br"
        }
      }
    }
  })
  @ApiOkResponse({
    type: Instituicao,
    description: 'Instituição cadastrada com sucesso.',
  })
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: "Cadastra uma nova instituição" })
  async create(@Body() instituicao: Instituicao) {
    return this.instituicaoService.cadastrar(instituicao);
  }
}
