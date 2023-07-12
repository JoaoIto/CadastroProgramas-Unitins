import { Controller, Post, Body, Get } from '@nestjs/common';
import {ProgramaRepository} from "./programa.repository";
import {CreateProgramaDto} from "./dto/CreatePrograma.dto";

@Controller('/programa')
export class ProgramaController {
  private formData: object = null;
  constructor(private programaRepository: ProgramaRepository) {}

  @Post('/cadastrar')

  create(@Body() formData: CreateProgramaDto) {
    this.programaRepository.salva(formData);
    return [{ status: 'Criado uma nova requisição!' }, { formData }];
  }

  @Get('/listar')
  getDados() {
    return this.programaRepository.lista();
  }
}
