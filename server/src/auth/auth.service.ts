import { BadRequestException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from "../usuario/dto/login.dto";
import { CadastroDTO } from "src/usuario/dto/cadastro.dto";
import { EsqueciSenhaDTO } from "src/usuario/dto/esqueciSenha.dto";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(loginDTO: LoginDTO): Promise<{ access_token: string }> {
    const usuario = await this.usuarioService.login(loginDTO);

    if (usuario) {
      this.logger.log("Usuario com credenciais encontrado! Gerando token...")
      const payload = { cpf: usuario.cpf, senha: usuario.senha, perfil: usuario.perfil };
      const access_token = await this.jwtService.signAsync(payload, {
        secret: 'software_hub-unitins',
        expiresIn: '1h',
      });
      this.logger.log(`Token de acesso gerado: ${access_token}`)
      return { access_token };
    } else {
      throw new UnauthorizedException();
    }
  }

  async signUp(cadastroDTO: CadastroDTO): Promise<{ access_token: string }> {
    const usuario = await this.usuarioService.register(cadastroDTO);
    if (usuario) {
      this.logger.log("Usuario cadastrado com sucesso! Gerando token...");
      const payload = { cpf: usuario.cpf, senha: usuario.senha, perfil: usuario.perfil };
      const access_token = await this.jwtService.signAsync(payload, {
        secret: 'software_hub-unitins',
        expiresIn: '1h',
      });
      this.logger.log(`Token de acesso gerado: ${access_token}`);
      return { access_token };
    } else {
      throw new UnauthorizedException();
    }
  }

  async redefinirSenha(esqueciSenhaDTO: EsqueciSenhaDTO): Promise<boolean> {
    const usuario = await this.usuarioService.consultarByCpf(esqueciSenhaDTO.cpf);
    if (!usuario) {
      throw new BadRequestException('CPF inexistente');
    }
    await this.usuarioService.redefinirSenha(esqueciSenhaDTO.cpf, esqueciSenhaDTO.senha);
    return true;
  }
}
