import { Body, Controller, Get, Logger, Post, Req, UseGuards } from "@nestjs/common";
import { LoginDTO } from 'src/usuario/dto/login.dto';
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

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

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

  @Get('/log-user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna o usuário logado' })
  @ApiResponse({ status: 200 })
  async returnLogUser(@Req() req): Promise<Usuario> {
    this.logger.log("Retornando o payload de usuario logado")
    this.logger.log(req.user)
    return req.user;
  }
}
