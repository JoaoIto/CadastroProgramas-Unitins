import { Controller, Post, Body } from '@nestjs/common';

@Controller('/novaSolicitacao')
export class SolicitacoesController {
  @Post()
  create(@Body() formData: any) {
    // Faça o que quiser com os dados do formulário aqui
    console.log(formData);
    return { message: 'Dados recebidos com sucesso!' };
  }
}
