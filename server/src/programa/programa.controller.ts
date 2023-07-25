import {Body, Controller, Delete, Get, Headers, Param, Post, Put} from '@nestjs/common';
import {CreateProgramaDto} from "./dto/createPrograma.dto";
import {ProgramaService} from "./programa.service";
import {AtualizarProgramaDto} from "./dto/atualizarPrograma.dto";
import {Programa} from "./programa.model";
import {ProgramaStatus} from "./programa-status.enum";

@Controller('/programa')
export class ProgramaController {
  private formData: object = null;
  constructor(private programaService: ProgramaService) {}

  @Post('/cadastrar')
  create(@Body() formData: CreateProgramaDto, @Headers() headers: Record<string, string>) {
    let usuarioId = headers["usuario-id"];
    let programaData = new Programa();

    programaData.nomeCompleto = formData.nomeCompleto;
    programaData.rg = formData.rg;
    programaData.cpf = formData.cpf;
    programaData.dataNascimento = formData.dataNascimento;
    programaData.estadoCivil = formData.estadoCivil;
    programaData.status = ProgramaStatus.RASCUNHO;

    this.programaService.criar(programaData, usuarioId);
    return [{ status: 'Criado uma nova requisição!' }, { formData }];
  }

  @Get()
  getDados() {
    return this.programaService.listar();
  }

  @Get('/:uuid')
  consultar(@Param() params: any) {
    let programaPromise = this.programaService.consultar(params.uuid);
    programaPromise.then(value => {
      console.log(value);
    });
    return programaPromise;
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