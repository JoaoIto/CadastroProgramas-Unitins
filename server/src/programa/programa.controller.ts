import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CreateProgramaInputDto } from "./dto/create/createProgramaInput.dto";
import { ProgramaService } from "./programa.service";
import { UpdateProgramaInputDto } from "./dto/update/atualizarPrograma.dto";
import { Programa } from "./programa.model";
import * as path from "path";
import * as fs from "fs";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ProgramaStatus } from "./programa-status.enum";
import { Roles } from "../roles/roles.decorator";
import { Role } from "../roles/roles.enum";
import { UsuarioProgramaService } from "../usuario-programa/usuario-programa.service";
import { UsuarioService } from "../usuario/usuario.service";
import { IMultipartFile } from "./interfaces/IMultpartFile.interface";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express/multer";
import { diskStorage } from "multer";

@ApiTags("programa")
@Controller("/programa")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProgramaController {
  private readonly logger = new Logger(ProgramaController.name);
  private formData: object = null;

  constructor(
    private programaService: ProgramaService,
    private readonly usuarioService: UsuarioService,
    private readonly usuarioProgramaService: UsuarioProgramaService
  ) {}

  @Patch("/uploads")
  async uploadFile(@UploadedFile() file: IMultipartFile) {
    try {
      console.log(file);

      console.log("Arquivo recebido:", file.originalname);

      const timestamp = Date.now().toString();
      const fileExt = path.extname(file.originalname);
      const newFileName = `${timestamp}${fileExt}`;

      const uploadFolderPath = "./uploads";
      if (!fs.existsSync(uploadFolderPath)) {
        fs.mkdirSync(uploadFolderPath);
      }

      const filePath = path.join(uploadFolderPath, newFileName);

      return { fileName: file.originalname };
    } catch (error) {
      console.error("Erro ao fazer upload do arquivo:", error);
      throw error;
    }
  }

  @Post('/cadastrar')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cadastra um novo programa' })
  @ApiBody({ type: CreateProgramaInputDto })
  @ApiCreatedResponse({ description: 'Operação bem-sucedida', type: Programa })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'documentoConfidencialidade', maxCount: 1 },
      { name: 'codigoFonte', maxCount: 1 },
    ], {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          callback(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
        },
      }),
    }),
  )
  async create(
    @Body() formData: CreateProgramaInputDto,
    @Headers() headers: Record<string, string>,
    @UploadedFiles() files: { documentoConfidencialidade?: Express.Multer.File[], codigoFonte?: Express.Multer.File[] },
  ) {
    console.log("Aqui chegando no backend: ", formData);
    
    // Criar a instância do programa com base nos dados recebidos
    const programaData = new Programa();
    programaData.titulo = formData.titulo;
    programaData.descricao = formData.descricao;
    programaData.solucaoProblemaDesc = formData.solucaoProblemaDesc;
    programaData.linguagens = formData.linguagens;
    programaData.outrasObrasDesc = formData.outrasObrasDesc;
    programaData.fonteFinanciamentoDesc = formData.fonteFinanciamentoDesc;
    programaData.revelacaoDesc = formData.revelacaoDesc;
    programaData.revelacaoPublicaDesc = formData.revelacaoPublicaDesc;
    programaData.descricaoMercado = formData.descricaoMercado;
    programaData.dataCriacaoPrograma = formData.dataCriacaoPrograma;
    programaData.vinculoUnitins = formData.vinculoUnitins;
    programaData.vinculoInstitucional = formData.vinculoInstitucional;
    programaData.fasePublicacao = formData.fasePublicacao;
    programaData.status = formData.status;
    programaData.autores = formData.autores;

    // Salva os dados do programa no banco de dados e obtém o ID do novo programa
    const novoPrograma = await this.programaService.criar(programaData, programaData.autores);
    
    const programaId = novoPrograma._id; // Supondo que o ID do programa está acessível aqui

    // Renomear e mover os arquivos
    if (files.documentoConfidencialidade) {
      const docConfidencialidade = files.documentoConfidencialidade[0];
      const docConfidencialidadeExtensao = path.extname(docConfidencialidade.originalname); // Obter a extensão do arquivo original
      const newDocConfidencialidadePath = path.join(__dirname, '..', '..', 'uploads', 'documentosConfidencialidade', `${programaId}-documentoConfidencialidade${docConfidencialidadeExtensao}`);
      fs.renameSync(docConfidencialidade.path, newDocConfidencialidadePath);
      novoPrograma.documentoConfidencialidadePath = newDocConfidencialidadePath;
    }
    
    if (files.codigoFonte) {
      const codigoFonte = files.codigoFonte[0];
      const codigoFonteExtensao = path.extname(codigoFonte.originalname); // Obter a extensão do arquivo original
      const newCodigoFontePath = path.join(__dirname, '..', '..', 'uploads', 'codigoFonte', `${programaId}-codigoFonte${codigoFonteExtensao}`);
      fs.renameSync(codigoFonte.path, newCodigoFontePath);
      novoPrograma.codigoFontePath = newCodigoFontePath;
    }

    // Atualizar o programa com os caminhos dos arquivos
    await this.programaService.atualizar(novoPrograma._id.toString(), novoPrograma);

    return novoPrograma;
  }

  @Get()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Fazendo a busca dos dados de todos os programas" })
  getDados() {
    this.logger.log("Fazendo a busca dos dados de todos os programas");
    return this.programaService.listar();
  }

  @Get("/porUsuario/:titulo")
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Retorna os programas do usuário logado filtrados pelo titulo",
  })
  async getProgramasByUserTitulo(
    @Req() req,
    @Param("titulo") titulo: string
  ): Promise<Programa[]> {
    try {
      this.logger.log("Retornando os programas do usuário logado");
      const usuarioCpf = req.user.cpf;
      const usuario = await this.usuarioService.consultarByCpf(usuarioCpf);
      this.logger.log("Fazendo a busca dos dados de programas do usuario");
      // Passa o array de 'programaIds' para o serviço de programas
      const programas =
        await this.programaService.getProgramasPorUsuarioIdTitulo(
          usuario._id,
          titulo
        );

      return programas;
    } catch (error) {
      this.logger.error(
        `Erro ao buscar programas do usuário: ${error.message}`
      );
      throw error; // Certifique-se de propagar o erro para que ele seja tratado corretamente pelo NestJS
    }
  }
  @Get("/enviados")
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Retornando os programas enviados pelos usuários",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
    description: "Número da página",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: Number,
    description: "Quantidade de itens por página",
  })
  @ApiResponse({ status: 200, description: "Lista de programas enviados paginada" })
  async getProgramasEnviados(
    @Req() req,
    @Query("page") page = 1,
    @Query("limit") limit = 5
  ): Promise<{ data: Programa[]; total: number; page: number; limit: number }> {
    try {
      this.logger.log("Retornando os programas enviados para admin");
      const { data, total } = await this.programaService.getProgramasEnviados(page, limit);
      return { data, total, page, limit };
    } catch (error) {
      this.logger.error(`Erro ao buscar programas enviados: ${error.message}`);
      throw error;
    }
  }
  

  @Get("/enviados/usuario")
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Retornando os programas enviados pelos usuários",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
    description: "Número da página",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: Number,
    description: "Quantidade de itens por página",
  })
  @ApiResponse({ status: 200, description: "Lista de programas enviados paginada" })
  async getProgramasEnviadosByUser(
    @Req() req,
    @Query("page") page = 1,
    @Query("limit") limit = 5
  ): Promise<{ data: Programa[]; total: number; page: number; limit: number }> {
    try {
      this.logger.log("Retornando os programas enviados pelos usuários");
      const userId = req.user._id;
      const { data, total } = await this.programaService.getProgramasEnviadosByUser(userId, page, limit);
      return { data, total, page, limit };
    } catch (error) {
      this.logger.error(`Erro ao buscar programas enviados: ${error.message}`);
      throw error;
    }
  }  


  @Get("/em-analise")
@UseGuards(JwtAuthGuard)
@Roles(Role.Admin)
@ApiBearerAuth()
@ApiOperation({ summary: "Retornando os programas em analise pelo admin" })
async getProgramasEmAnalise(
  @Req() req,
  @Query('page') page: number = 1,
  @Query('limit') limit: number = 10,
): Promise<{ data: Programa[]; total: number }> {
  try {
    this.logger.log("Retornando os programas em analise pelo admin");
    const { data, total } = await this.programaService.getProgramasEmAnalise(page, limit);

    return { data, total };
  } catch (error) {
    this.logger.error(`Erro ao buscar programas em analise: ${error.message}`);
    throw error;
  }
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
    this.logger.log(`CPF do usuário logado: ${usuarioCpf}`);

    const usuario = await this.usuarioService.consultarByCpf(usuarioCpf);
    this.logger.log(`Usuário encontrado: ${JSON.stringify(usuario)}`);

    this.logger.log("Fazendo a busca dos dados de programas do usuario");
    const programas = await this.programaService.getProgramasPorUsuarioId(usuario._id);

    this.logger.log(`Programas retornados: ${JSON.stringify(programas)}`);
    return programas;
  } catch (error) {
    this.logger.error(`Erro ao buscar programas do usuário: ${error.message}`);
    throw error; // Certifique-se de propagar o erro para que ele seja tratado corretamente pelo NestJS
  }
}
  @Get("/pages")
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Retorna os programas do usuário logado" })
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
    description: "Número da página",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: Number,
    description: "Quantidade de itens por página",
  })
  @ApiResponse({ status: 200, description: "Lista de programas paginada" })
  async getProgramasByUserPaginate(
    @Req() req,
    @Query("page") page = 1,
    @Query("limit") limit = 5
  ): Promise<{ data: Programa[]; total: number; page: number; limit: number }> {
    try {
      this.logger.log("Retornando os programas do usuário logado");
      const usuarioCpf = req.user.cpf;
      this.logger.log(`CPF do usuário logado: ${usuarioCpf}`);
  
      const usuario = await this.usuarioService.consultarByCpf(usuarioCpf);
      this.logger.log(`Usuário encontrado: ${JSON.stringify(usuario)}`);
  
      this.logger.log("Fazendo a busca dos dados de programas do usuario");
      const { data, total } = await this.programaService.getProgramasPorUsuarioIdPaginado(usuario._id, page, limit);
  
      //this.logger.log(`Programas retornados: ${JSON.stringify(programas)}`);
      return { data, total, page: 1, limit: 5 };
    } catch (error) {
      this.logger.error(`Erro ao buscar programas do usuário: ${error.message}`);
      throw error; // Certifique-se de propagar o erro para que ele seja tratado corretamente pelo NestJS
    }
  }

  @Get("/porUsuario/id/:id")
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @ApiOperation({
    summary: "Fazendo a busca dos dados de programas do usuario",
  })
  async getDadosProgramaByUser(@Param("id") id: string): Promise<Programa> {
    this.logger.log("Fazendo a busca dos dados do programa com o uuid: " + id);
    let programaPromise = this.programaService.consultar(id);
    programaPromise.then((value) => {
      console.log(value);
    });
    return programaPromise;
  }

  @Get("/:uuid")
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Consultando programa pelo uuid dele" })
  consultar(@Param("uuid") uuid: string) {
    this.logger.log(
      "Fazendo a busca dos dados do programa com o uuid: " + uuid
    );
    let programaPromise = this.programaService.consultar(uuid);
    programaPromise.then((value) => {
      console.log(value);
    });
    return programaPromise;
  }

  @Get("/status/:status")
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Consultando programa pelo status dele" })
  consultarByStatus(@Param("status") status: ProgramaStatus) {
    this.logger.log(
      "Fazendo a busca dos dados do programa com o status: " + status
    );
    return this.programaService.consultarByStatus(status);
  }

  @Get("/status/aprovados")
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Consultando programas aprovados" })
  consultarByAprovados() {
    this.logger.log(
      "Fazendo a busca dos dados do programa com o status aprovado"
    );
    return this.programaService.consultarByAprovados(ProgramaStatus.APROVADO);
  }

  @Put("/porUsuario/:id")
  @Roles(Role.Admin, Role.User)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Atualizando programa pelo id dele" })
  @ApiBody({ type: UpdateProgramaInputDto }) // Anotação para informar ao Swagger sobre o DTO usado no corpo da requisição
  @ApiCreatedResponse({ description: "Operação bem-sucedida" })
  atualizarProgramaUsuario(
    @Param("id") id: string,
    @Body() updateData: UpdateProgramaInputDto
  ) {
    const programaEditado = new Programa();

    programaEditado.titulo = updateData.titulo;
    programaEditado.descricao = updateData.descricao;
    programaEditado.solucaoProblemaDesc = updateData.solucaoProblemaDesc;
    programaEditado.linguagens = updateData.linguagens;
    programaEditado.descricaoMercado = updateData.descricaoMercado;
    programaEditado.dataCriacaoPrograma = updateData.dataCriacaoPrograma;
    programaEditado.vinculoUnitins = updateData.vinculoUnitins;
    programaEditado.vinculoInstitucional = updateData.vinculoInstitucional;
    programaEditado.fasePublicacao = updateData.fasePublicacao;
    programaEditado.status = updateData.status;
    programaEditado.nomeArquivo = updateData.nomeArquivo;

    return this.programaService.atualizar(id, programaEditado);
  }

  @Put("/:uuid")
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Atualizando programa pelo uuid dele" })
  @ApiBody({ type: UpdateProgramaInputDto }) // Anotação para informar ao Swagger sobre o DTO usado no corpo da requisição
  @ApiCreatedResponse({ description: "Operação bem-sucedida" })
  atualizar(
    @Param("uuid") uuid: string,
    @Body() updateData: UpdateProgramaInputDto
  ) {
    const programaEditado = new Programa();

    programaEditado.titulo = updateData.titulo;
    programaEditado.descricao = updateData.descricao;
    programaEditado.solucaoProblemaDesc = updateData.solucaoProblemaDesc;
    programaEditado.linguagens = updateData.linguagens;
    programaEditado.descricaoMercado = updateData.descricaoMercado;
    programaEditado.dataCriacaoPrograma = updateData.dataCriacaoPrograma;
    programaEditado.vinculoUnitins = updateData.vinculoUnitins;
    programaEditado.vinculoInstitucional = updateData.vinculoInstitucional;
    programaEditado.fasePublicacao = updateData.fasePublicacao;
    programaEditado.status = updateData.status;
    programaEditado.nomeArquivo = updateData.nomeArquivo;

    return this.programaService.atualizar(uuid, programaEditado);
  }

  @Delete("/:uuid")
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Deletando programa pelo uuid dele" })
  deletar(@Param("uuid") uuid: string) {
    return this.programaService.deletar(uuid);
  }
}
