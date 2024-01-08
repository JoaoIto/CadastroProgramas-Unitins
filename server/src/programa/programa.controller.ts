import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Logger,
  Param,
  Post,
  Put, Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateProgramaDto } from "./dto/createPrograma.dto";
import { ProgramaService } from "./programa.service";
import { AtualizarProgramaDto } from "./dto/atualizarPrograma.dto";
import { Programa } from "./programa.model";
import * as path from "path";
import * as fs from "fs";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ProgramaStatus } from "./programa-status.enum";
import { Roles } from "../roles/roles.decorator";
import { Role } from "../roles/roles.enum";
import { UsuarioProgramaService } from "../usuario-programa/usuario-programa.service";
import { Usuario } from "../usuario/usuario.model";
import { UsuarioService } from "../usuario/usuario.service";

@ApiTags("programa")
@Controller("/programa")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProgramaController {
  private readonly logger = new Logger(ProgramaController.name);
  private formData: object = null;

  constructor(private programaService: ProgramaService, private readonly  usuarioService: UsuarioService, private readonly usuarioProgramaService: UsuarioProgramaService) {
  }

  @Post("/uploads")
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fazendo upload de um arquivo' })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary" // Indica que é um arquivo binário
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor("file"))
  @ApiBearerAuth()
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body("nomeArquivo") nomeArquivo: string) {
    // Gerar um novo nome para o arquivo usando Date.now()
    const timestamp = Date.now().toString();
    const originalName = file.originalname;
    this.logger.log("Fazendo upload de arquivo: " + originalName);
    const fileExt = path.extname(originalName);
    const newFileName = `${timestamp}${fileExt}`;

    // Caminho da pasta onde os arquivos serão salvos
    const uploadFolderPath = "./uploads";

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

  @Post("/cadastrar")
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cadastra um novo programa a partir do DTO' })
  @ApiBody({ type: CreateProgramaDto }) // Anotação para informar ao Swagger sobre o DTO usado no corpo da requisição
  @ApiCreatedResponse({ description: "Operação bem-sucedida", type: CreateProgramaDto })
  async create(@Body() formData: CreateProgramaDto, @Headers() headers: Record<string, string>) {
    this.logger.log("Fazendo cadastro de programa: " + formData);
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
    return [{ status: "Criado uma nova requisição!" }, { formData }];
  }

  @Get()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Fazendo a busca dos dados de todos os programas' })
  getDados() {
    this.logger.log("Fazendo a busca dos dados de todos os programas");
    return this.programaService.listar();
  }

  @Get('/porUsuario')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna os programas do usuário logado' })
  async getProgramasByUser(@Req() req): Promise<Programa[]> {
    try {
      this.logger.log("Retornando os programas do usuário logado");
      const usuarioCpf = req.user.cpf;
      const usuario = await this.usuarioService.consultarByCpf(usuarioCpf);
      this.logger.log("Fazendo a busca dos dados de programas do usuario");
      const usuarioPrograma = await this.usuarioProgramaService.getUsuarioProgramasPorUsuario(usuario._id.toString());
      // Extrai os valores de 'programaId' de cada objeto e cria um array com eles
      const programaIds = usuarioPrograma.map(item => item.programaId.toString());

      // Passa o array de 'programaIds' para o serviço de programas
      const programas = await this.programaService.getProgramasPorIds(programaIds);

      return programas;
    } catch (error) {
      this.logger.error(`Erro ao buscar programas do usuário: ${error.message}`);
      throw error; // Certifique-se de propagar o erro para que ele seja tratado corretamente pelo NestJS
    }
  }

  @Get("/porUsuario/:uuid")
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Fazendo a busca dos dados de programas do usuario' })
  async getDadosByUser(@Param("uuid") uuid: string): Promise<Programa[]> {
    try {
      this.logger.log("Fazendo a busca dos dados de programas do usuario");
      const usuarioPrograma = await this.usuarioProgramaService.getUsuarioProgramasPorUsuario(uuid);
      // Extrai os valores de 'programaId' de cada objeto e cria um array com eles
      const programaIds = usuarioPrograma.map(item => item.programaId.toString());

      // Passa o array de 'programaIds' para o serviço de programas
      const programas = await this.programaService.getProgramasPorIds(programaIds);

      return programas;
    } catch (error) {
      this.logger.error(`Erro ao buscar dados de programas: ${error.message}`);
      throw error; // Certifique-se de propagar o erro para que ele seja tratado corretamente pelo NestJS
    }
  }


  @Get("/:uuid")
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Consultando programa pelo uuid dele' })
  consultar(@Param("uuid") uuid: string) {
    this.logger.log("Fazendo a busca dos dados do programa com o uuid: " + uuid);
    let programaPromise = this.programaService.consultar(uuid);
    programaPromise.then(value => {
      console.log(value);
    });
    return programaPromise;
  }

  @Get("/status/:status")
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Consultando programa pelo status dele' })
  consultarByStatus(@Param("status") status: ProgramaStatus) {
    this.logger.log("Fazendo a busca dos dados do programa com o status: " + status);
    return this.programaService.consultarByStatus(status);
  }

  @Get("/status/aprovados")
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Consultando programas aprovados' })
  consultarByAprovados() {
    this.logger.log("Fazendo a busca dos dados do programa com o status aprovado");
    return this.programaService.consultarByAprovados(ProgramaStatus.APROVADO);
  }

  @Put("/:uuid")
  @Roles(Role.Admin, Role.User)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizando programa pelo uuid dele' })
  @ApiBody({ type: AtualizarProgramaDto }) // Anotação para informar ao Swagger sobre o DTO usado no corpo da requisição
  @ApiCreatedResponse({ description: "Operação bem-sucedida", type: AtualizarProgramaDto })
  atualizar(@Param("uuid") uuid: string, @Body() updateData: AtualizarProgramaDto) {
    let programaEditado = new Programa();
    programaEditado.nomeCompleto = updateData.nomeCompleto;
    programaEditado.rg = updateData.rg;
    programaEditado.cpf = updateData.cpf;
    programaEditado.dataNascimento = updateData.dataNascimento;
    programaEditado.estadoCivil = updateData.estadoCivil;

    return this.programaService.atualizar(uuid, programaEditado);
  }

  @Delete("/:uuid")
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletando programa pelo uuid dele' })
  deletar(@Param("uuid") uuid: string) {
    return this.programaService.deletar(uuid);
  }
}