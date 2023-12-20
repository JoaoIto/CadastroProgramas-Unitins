import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from "../usuario/dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(loginDTO: LoginDTO): Promise<{ access_token: string }> {
    const usuario = await this.usuarioService.login(loginDTO);

    if (usuario) {
      const payload = { cpf: usuario.cpf, senha: usuario.senha };
      const access_token = await this.jwtService.signAsync(payload, {
        secret: 'software_hub-unitins', // Substitua com a sua chave secreta
        expiresIn: '1h',
      });
      return { access_token };
    } else {
      throw new UnauthorizedException();
    }
  }
}
