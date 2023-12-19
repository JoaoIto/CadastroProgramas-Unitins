// import { Injectable } from '@nestjs/common';
// import { HashService } from '../hash/hash.service';
// import { Usuario } from "../usuario/usuario.model";
// import { Jwt } from 'jsonwebtoken';
//
// @Injectable()
// export class AuthController {
//
//   constructor(private readonly hashService: HashService, private readonly jwt: Jwt) {}
//
//   private generateToken(usuario: Usuario): Promise<string> {
//     const payload = {
//       cpf: usuario.cpf,
//       senha: usuario.senha,
//     };
//
//     return this.jwt.sign(payload, 'unitins-software_hub-jwt');
//   }
// }
