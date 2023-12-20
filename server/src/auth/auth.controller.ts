import { Body, Controller, Logger, Post } from "@nestjs/common";
import { LoginDTO } from 'src/usuario/dto/login.dto';
import {
  ApiBody,
  ApiResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Gera token de autenticação para o usuário' })
  @ApiBody({ type: LoginDTO, description: 'Credenciais do usuário para login' })
  @ApiResponse({ status: 200, description: 'Token gerado com sucesso' })
  async generateToken(@Body() loginDTO: LoginDTO): Promise<{ access_token: string }> {
    this.logger.log(`Tentando autenticação a partir do usuario com cpf: ${loginDTO.cpf}; e senha: ${loginDTO.senha}`)
    const token = await this.authService.signIn(loginDTO);
    return token;
  }
}
