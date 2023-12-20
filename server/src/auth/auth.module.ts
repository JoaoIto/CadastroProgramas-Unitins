import { Module } from '@nestjs/common';
import { AuthController } from "./auth.controller";
import { HashService } from 'src/hash/hash.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            secret: 'software_hub-unitins', // Substitua com a sua chave secreta
            signOptions: { expiresIn: '1h' }, // Configurações adicionais, se necessário
          })
    ],
    controllers: [AuthController],
    providers: [HashService]
})

export class AuthModule { }