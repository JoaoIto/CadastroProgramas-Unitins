import { HashService } from "./hash.service";

const hashService = new HashService();

async function generateHashes() {
  const passwords = ["senha1", "senha2", "senha3"];

  for (const password of passwords) {
    const hashedPassword = await hashService.getHashSenha(password);
    console.log(`Senha: ${password}, Hash: ${hashedPassword}`);
  }
}

generateHashes();