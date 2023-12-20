import { AuthController } from '../../auth/auth.controller';
import { HashService } from '../../hash/hash.service';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../../usuario/usuario.model';
import { LoginDTO } from 'src/usuario/dto/login.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let hashService: HashService;
  let jwtService: JwtService;

  beforeEach(() => {
    hashService = new HashService();
    jwtService = new JwtService();
    authController = new AuthController(hashService, jwtService);
  });

  describe('generateToken', () => {
    it('deve gerar um token JWT válido', async () => {
      // Mock de dados de usuário
      const usuario: LoginDTO = {
        cpf: 'usuario@teste.com',
        senha: 'senha123',
        // Outros campos do usuário, se necessário
      };

      // Mock da função do serviço HashService
      jest.spyOn(hashService, 'getHashSenha').mockResolvedValue('hash-da-senha');

      // Mock da função do serviço JwtService
      jest.spyOn(jwtService, 'sign').mockReturnValue('token-gerado');

      // Chama o método generateToken do AuthController (como é um método privado, chamamos diretamente)
      const token = await (authController as any).generateToken(usuario);

      // Verifica se o token é uma string não vazia
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });
  });
});
