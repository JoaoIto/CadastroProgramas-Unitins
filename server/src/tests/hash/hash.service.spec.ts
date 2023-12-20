import { Test, TestingModule } from '@nestjs/testing';
import { HashService } from '../../hash/hash.service';

describe('HashService', () => {
  let hashService: HashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashService],
    }).compile();

    hashService = module.get<HashService>(HashService);
  });

  it('deve gerar e verificar o hash corretamente', async () => {
    const senhaOriginal = 'senha123';

    // Gera o hash
    const hashSenha = await hashService.getHashSenha(senhaOriginal);

    // Verifica se o hash é válido
    const verificaHash = await hashService.verifyHashSenha(senhaOriginal, hashSenha);

    expect(verificaHash).toBe(true);
  });
});
