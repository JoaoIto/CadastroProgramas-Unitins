import {Controller, Post, Body, Get, Param, Put, Delete} from '@nestjs/common';
import {CreateProgramaDto} from "./dto/createPrograma.dto";
import {ProgramaService} from "./programa.service";
import {AtualizarProgramaDto} from "./dto/atualizarPrograma.dto";
import {Programa} from "./programa.model";

@Controller('/programa')
export class ProgramaController {
  private formData: object = null;
  constructor(private programaService: ProgramaService) {}

  @Post('/cadastrar')

  create(@Body() formData: CreateProgramaDto, userId: string) {
    let programaData = new Programa();
    programaData.nomeCompleto = formData.nomeCompleto;
    programaData.rg = formData.rg;
    programaData.cpf = formData.cpf;
    programaData.dataNascimento = formData.dataNascimento;
    programaData.estadoCivil = formData.estadoCivil;

    this.programaService.criar(programaData, userId);
    return [{ status: 'Criado uma nova requisição!' }, { formData }];
  }

  @Get()
  getDados() {
    return this.programaService.listar();
  }

  @Get('/:uuid')
  consultar(@Param() params: any) {
    return this.programaService.consultar(params.uuid);
  }

  @Put('/:uuid')
  atualizar(@Param('uuid') uuid: string, @Body() updateData: AtualizarProgramaDto) {
    let programaEditado = new Programa();
    programaEditado.nomeCompleto = updateData.nomeCompleto;
    programaEditado.rg = updateData.rg;
    programaEditado.cpf = updateData.cpf;
    programaEditado.dataNascimento = updateData.dataNascimento;
    programaEditado.estadoCivil = updateData.estadoCivil;

    return this.programaService.atualizar(uuid, programaEditado);
  }

  @Delete('/:uuid')
  deletar(@Param('uuid') uuid: string) {
    return this.programaService.deletar(uuid);
  }
}