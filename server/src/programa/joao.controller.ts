import { Controller, Post, Body, Get } from '@nestjs/common';
import {JoaoRepository} from "./joao.repository";
import {CreateJoaoDto} from "./dto/createjoao.dto";

@Controller('/programa')
export class JoaoController {
  private formData: object = null;
  constructor(private programaRepository: JoaoRepository) {}

  @Post('/cadastrar')

  create(@Body() formData: CreateJoaoDto) {
    this.programaRepository.create(formData);
    return [{ status: 'Criado uma nova requisição!' }, { formData }];
  }

  @Get('/listar')
  getDados() {
    return this.programaRepository.findAll();
  }
}
