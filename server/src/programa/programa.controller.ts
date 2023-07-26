import { Body, Controller, Delete, Get, Headers, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProgramaDto } from "./dto/createPrograma.dto";
import { ProgramaService } from "./programa.service";
import { AtualizarProgramaDto } from "./dto/atualizarPrograma.dto";
import { Programa } from "./programa.model";
import { ProgramaStatus } from "./programa-status.enum";
import * as path from "path";
import * as fs from "fs";

@Controller('/programa')
export class ProgramaController {
  private formData: object = null;
  constructor(private programaService: ProgramaService) {}

  @Post('/uploads')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Gerar um novo nome para o arquivo usando Date.now()
    const timestamp = Date.now().toString();
    const originalName = file.originalname;
    const fileExt = path.extname(originalName);
    const newFileName = `${timestamp}${fileExt}`;

    // Caminho da pasta onde os arquivos serão salvos
    const uploadFolderPath = './uploads';

    // Criar a pasta 'uploads' caso não exista
    if (!fs.existsSync(uploadFolderPath)) {
      fs.mkdirSync(uploadFolderPath);
    }

    // Mover o arquivo para a pasta de uploads com o novo nome
    const filePath = path.join(uploadFolderPath, newFileName);
    fs.writeFileSync(filePath, file.buffer);

    // Retorne o nome do arquivo para o front-end, se necessário
    return { fileName: originalName };
  }

  @Post('/cadastrar')
  async create(@Body() formData: CreateProgramaDto, @Headers() headers: Record<string, string>) {
    const usuarioId = headers["usuario-id"];
    const programaData = new Programa();

    programaData.nomeCompleto = formData.nomeCompleto;
    programaData.rg = formData.rg;
    programaData.cpf = formData.cpf;
    programaData.dataNascimento = formData.dataNascimento;
    programaData.estadoCivil = formData.estadoCivil;
    programaData.status = formData.status;
    programaData.nomeArquivo = formData.nomeArquivo;

    // Salva os dados do programa no banco de dados
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
