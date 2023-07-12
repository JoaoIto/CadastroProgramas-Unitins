import { Controller, Post, Body, Get } from '@nestjs/common';
import {ProgramaRepository} from "./programa.repository";
import {CreateProgramaDto} from "./dto/createjoao.dto";

@Controller('/programa')
export class ProgramaController {
  private formData: object = null;
  constructor(private programaRepository: ProgramaRepository) {}

  @Post('/cadastrar')

  create(@Body() formData: CreateProgramaDto) {
    this.programaRepository.create(formData);
    return [{ status: 'Criado uma nova requisição!' }, { formData }];
  }

  @Get('/listar')
  getDados() {
    return this.programaRepository.findAll();
  }
}
