import { BadRequestException, Body, Controller, Get, Logger, Post, Req, UseGuards } from "@nestjs/common";
import { LoginDTO } from 'src/usuario/dto/login.dto';
import { CadastroDTO } from 'src/usuario/dto/cadastro.dto';
import {
  ApiBody,
  ApiResponse,
  ApiOperation,
  ApiTags, ApiBearerAuth
} from "@nestjs/swagger";
import { AuthService } from './auth.service';
import { LocalAuthGuard } from "./local-auth-guard";
import { AuthGuard } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { Usuario } from "../usuario/usuario.model";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { RolesGuard } from "../roles/roles.guard";
import { UsuarioService } from "../usuario/usuario.service";
import { EsqueciSenhaDTO } from "src/usuario/dto/esqueciSenha.dto";

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService, private readonly usuarioService: UsuarioService) {}

  @Post('/login')
  @UseGuards(JwtStrategy)
  @ApiOperation({ summary: 'Gera token de autenticação para o usuário' })
  @ApiBody({ type: LoginDTO, description: 'Credenciais do usuário para login' })
  @ApiResponse({ status: 200, description: 'Token gerado com sucesso' })
  async generateToken(@Body() loginDTO: LoginDTO): Promise<{ access_token: string }> {
    this.logger.log(`Tentando autenticação a partir do usuario com cpf: ${loginDTO.cpf}; e senha: ${loginDTO.senha}`)
    const token = await this.authService.signIn(loginDTO);
    return token;
  }

  @Post('/esqueci-senha')
  @ApiOperation({ summary: 'Redefine a senha do usuário' })
  @ApiBody({ type: EsqueciSenhaDTO, description: 'CPF e nova senha para redefinição' })
  @ApiResponse({ status: 200, description: 'Senha redefinida com sucesso' })
  @ApiResponse({ status: 400, description: 'CPF inexistente' })
  async esqueciSenha(@Body() esqueciSenhaDTO: EsqueciSenhaDTO): Promise<{ message: string }> {
    const result = await this.authService.redefinirSenha(esqueciSenhaDTO);
    if (result) {
      return { message: 'Senha redefinida com sucesso' };
    } else {
      throw new BadRequestException('CPF inexistente');
    }
  }

  @Post('/cadastro')
  @UseGuards(JwtStrategy)
  @ApiOperation({ summary: 'Cadastrar um novo usuário por meio de autenticação nova' })
  @ApiBody({ type: CadastroDTO, description: 'Credenciais do usuário para cadastro' })
  @ApiResponse({ status: 200, description: 'Token gerado com sucesso' })
  async generateUser(@Body() cadastroDTO: CadastroDTO): Promise<{ access_token: string }> {
    this.logger.log(`Tentando cadastro a partir de um novo usuario com cpf: ${cadastroDTO.cpf}; e senha: ${cadastroDTO.senha}`)
    const token = await this.authService.signUp(cadastroDTO);
    return token;
  }

  @Get('/log-user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiOperation({ summary: 'Retorna o usuário logado' })
@ApiResponse({ status: 200 })
async returnLogUser(@Req() req): Promise<Usuario> {
    this.logger.log("Retornando o usuario logado");
    this.logger.log(req.user);
    const cpf = req.user.cpf;
    const usuario = await this.usuarioService.consultarByCpf(cpf);
    this.logger.log(`Usuario retornado: ${usuario}`);

    return usuario;
}

  @Get('/log-user/payload')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiOperation({ summary: 'Retorna o payload do usuário logado' })
@ApiResponse({ status: 200 })
async returnPayloadLogUser(@Req() req): Promise<Usuario> {
    this.logger.log("Retornando o payload de usuario logado");
    this.logger.log(req.user);

    const usuario = req.user as Usuario;
    return usuario;
}

}