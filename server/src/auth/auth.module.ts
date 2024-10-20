import { Module } from '@nestjs/common';
import { AuthController } from "./auth.controller";
import { HashService } from 'src/hash/hash.service';
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UsuarioModule } from "../usuario/usuario.module";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { jwtConstants } from "./constans";

@Module({
    imports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: 5000 },
          }),
      UsuarioModule,
      PassportModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, HashService, JwtService, LocalStrategy]
})

export class AuthModule { }