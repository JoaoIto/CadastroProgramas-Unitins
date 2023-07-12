import { Controller, Post, Body, Get } from '@nestjs/common';
import {ProgramaRepository} from "./programa.repository";
import {CreateProgramaDto} from "./dto/createjoao.dto";
import {ProgramaService} from "./programa.service";

@Controller('/programa')
export class ProgramaController {
  private formData: object = null;
  constructor(private programaService: ProgramaService) {}

  @Post('/cadastrar')

  create(@Body() formData: CreateProgramaDto) {
    this.programaService.criar(formData);
    return [{ status: 'Criado uma nova requisição!' }, { formData }];
  }

  @Get('/listar')
  getDados() {
    return this.programaService.listar();
  }
}
