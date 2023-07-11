import { Controller, Post, Body, Get } from '@nestjs/common';

@Controller('/programa')
export class ProgramaController {
  private formData: any = null;

  @Post('/cadastrar')
  create(@Body() formData: any) {
    this.formData = formData;
    console.log(formData);
    return { message: 'Dados recebidos com sucesso!' };
  }

  @Get('/listar')
  getDados() {
    return this.formData;
  }
}
