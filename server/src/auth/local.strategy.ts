// local.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { LoginDTO } from "../usuario/dto/login.dto";
import { Usuario } from "../usuario/usuario.model";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(loginDTO: LoginDTO): Promise<{ access_token: string }> {
    const user = await this.authService.signIn(loginDTO);
    if (!user) {
      // Se as credenciais não são válidas, retorne null
      return null;
    }
    // Se as credenciais são válidas, retorne o usuário
    return user;
  }
}
