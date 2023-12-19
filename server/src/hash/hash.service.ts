// import { Injectable } from '@nestjs/common';
// import { genSalt, hash, compare } from 'bcryptjs';
//
// @Injectable()
// export class HashService {
//   async getHashSenha(senha: string): Promise<string> {
//     const salt = await genSalt();
//     const hash = await hash(senha, salt);
//
//     return hash;
//   }
//
//   async verifyHashSenha(senha: string, hash: string): Promise<boolean> {
//     return await compare(senha, hash);
//   }
// }
