import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { HashService } from '../hash/hash.service';
import { Usuario } from '../usuario/usuario.model';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'src/usuario/dto/login.dto';

import { ApiBody, ApiResponse, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiProperty } from "@nestjs/swagger";
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}
  
  @Post('/login')
  @ApiOperation({ summary: 'Gera token de autenticação para o usuário' })
  @ApiBody({ type: LoginDTO, description: 'Credenciais do usuário para login' })
  @ApiResponse({ status: 200, description: 'Token gerado com sucesso' })
  generateToken(@Body() usuario: LoginDTO): string {
    const payload = {
      cpf: usuario.cpf,
      senha: usuario.senha,
    };

    return this.jwtService.sign(payload);
  }
}
