import { Injectable, Logger } from "@nestjs/common";
import { genSaltSync, hashSync, compare } from 'bcryptjs';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class HashService {
  private readonly logger = new Logger(HashService.name);
  private salt: string;
  private readonly saltFilePath = path.join(__dirname, '..', 'hash', 'salt.txt');

  constructor() {
    // Tenta ler o salt do arquivo
    try {
      this.salt = fs.readFileSync(this.saltFilePath, "utf-8");
      this.logger.log("Salt carregado: " + this.salt);
    } catch (error) {
      // Se o arquivo não existe, gera um novo salt
      this.salt = this.generateSalt();
      // Salva o novo salt no arquivo
      fs.writeFileSync(this.saltFilePath, this.salt, "utf-8");
    }
  }

  private generateSalt(): string {
    const salt = genSaltSync(10);
    this.logger.log("Salt gerado: " + salt);
    return salt;
  }

  async getHashSenha(senha: string): Promise<string> {
    this.logger.log('Senha a ser gerada: ' + senha);
    const hashedSenha = await hashSync(senha, this.salt);
    this.logger.log('Hash da senha gerada: ' + hashedSenha);
    return hashedSenha;
  }

  async verifyHashSenha(senha: string, hashedSenha: string): Promise<boolean> {
    this.logger.log('Senha a ser comparada: ' + senha);
    this.logger.log('Hash a ser comparado: ' + hashedSenha);
    return compare(senha, hashedSenha);
  }
}
