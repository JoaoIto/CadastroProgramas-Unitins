import { Module } from '@nestjs/common';
import { AuthController } from "./auth.controller";
import { HashService } from 'src/hash/hash.service';
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UsuarioService } from "../usuario/usuario.service";
import { UsuarioRepository } from "../usuario/usuario.repository";
import { UsuarioModule } from "../usuario/usuario.module";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        JwtModule.register({
            secret: 'software_hub-unitins', // Substitua com a sua chave secreta
            signOptions: { expiresIn: '1h' }, // Configurações adicionais, se necessário
          }),
      UsuarioModule
    ],
    controllers: [AuthController],
    providers: [AuthService, HashService, JwtService]
})

export class AuthModule { }