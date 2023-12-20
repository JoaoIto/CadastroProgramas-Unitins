import { Injectable } from '@nestjs/common';
import { genSalt, hash as bcryptHash, compare } from 'bcryptjs';

@Injectable()
export class HashService {
  async getHashSenha(senha: string): Promise<string> {
    const salt = await genSalt();
    const hashedSenha = await bcryptHash(senha, salt);

    return hashedSenha;
  }

  async verifyHashSenha(senha: string, hashedSenha: string): Promise<boolean> {
    return await compare(senha, hashedSenha);
  }
}

const senha = "senha1"
const hashService = new HashService();
const senhaHash = hashService.getHashSenha(senha)
console.log(senha, senhaHash)
