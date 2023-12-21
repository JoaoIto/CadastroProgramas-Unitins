import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./roles.enum";
import { ROLES_KEY } from "./roles.decorator";
import { JwtService } from "@nestjs/jwt";
import { Usuario } from "../usuario/usuario.model";
import { jwtConstants } from "../auth/constans";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly jwtService: JwtService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRoles) {
      return true;
    }

    const authorizationHeader = context.switchToHttp().getRequest().headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      // O cabeçalho Authorization não está presente ou não está no formato esperado
      return false;
    }

    const token = authorizationHeader.split(' ')[1];

    try {
      const validJwt: Usuario = this.jwtService.verify(token, { secret: jwtConstants.secret });

      // Se chegou aqui, o token é válido
      const { user } = context.switchToHttp().getRequest();
      return requiredRoles.some((role) => role === validJwt.perfil);
    } catch (error) {
      // Se ocorrer um erro ao verificar o token (por exemplo, token inválido), retorna falso
      console.error(error);
      return false;
    }
  }
}
