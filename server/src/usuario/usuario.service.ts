import { ConflictException, Injectable, Logger} from '@nestjs/common';
import {UsuarioRepository} from "./usuario.repository";
import {Usuario, UsuarioDocument} from "./usuario.model";
import { CreateUsuarioInputDto } from './dto/create/createUsuario.dto';
import { CadastroDTO } from './dto/cadastro.dto';
import { verificarCamposIncompletos } from 'src/middleware/usuario/functions/verifyKeysUser';
import { CreateAutorInputDto } from './dto/create/createAutor.dto';
import mongoose from 'mongoose';

@Injectable()
export class UsuarioService{
    private readonly logger = new Logger(UsuarioService.name);
    constructor(private usuarioRepository: UsuarioRepository) {}

    async create(user: CreateUsuarioInputDto): Promise<Usuario>{
        return this.usuarioRepository.create(user);
    }

    async createAutor(createAutorInputDto: CreateAutorInputDto): Promise<Usuario> {
        const { cpf } = createAutorInputDto;
    
        // Verifica se o CPF já existe
        const existingUsuario = await this.usuarioRepository.findByCpf(cpf);
        if (existingUsuario) {
          this.updateAutor(existingUsuario._id, createAutorInputDto);
          throw new ConflictException('O CPF do autor já está cadastrado, pesquise pelo CPF para ter os dados!');
        }
    
        // Se o CPF não existe, cria um novo autor
        return this.usuarioRepository.createAutor(createAutorInputDto);
      }
      private async updateAutor(usuarioId: mongoose.Types.ObjectId, updateData: CreateAutorInputDto): Promise<Usuario> {
        // Atualiza o autor existente com os novos dados
        return this.usuarioRepository.updateAutor(usuarioId, updateData);
    }

    async register(user: CadastroDTO): Promise<Usuario>{
        return this.usuarioRepository.create(user);
    }

    async listar(): Promise<Usuario[]>{
        return this.usuarioRepository.findAll();
    }

    async atualizarInformacoes(uuid: string, updateData: Partial<Usuario>): Promise<Usuario>{
        return this.usuarioRepository.update(uuid, updateData)
    }

    async redefinirSenha(cpf: string, senha: string): Promise<void>{
        return this.usuarioRepository.redefinirSenha(cpf, senha)
    }
    async consultar(uuid): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findById(uuid);
    
        if (usuario) {
            const camposIncompletos = verificarCamposIncompletos(usuario);
            this.logger.log('Campos incompletos: ' + camposIncompletos.join(', '));
            usuario.camposIncompletos = camposIncompletos
        }
    
        return usuario;
    }

    async consultarMatricula(matricula): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findByMatricula(matricula);
    
        if (usuario) {
            const camposIncompletos = verificarCamposIncompletos(usuario);
            this.logger.log('Campos incompletos: ' + camposIncompletos.join(', '));
            usuario.camposIncompletos = camposIncompletos
        }
    
        return usuario;
    }
    async consultarByCpf(cpf: string): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findByCpf(cpf);
    
        if (usuario) {
            const camposIncompletos = verificarCamposIncompletos(usuario);
            this.logger.log('Campos incompletos: ' + camposIncompletos.join(', '));
            usuario.camposIncompletos = camposIncompletos
        }
    
        return usuario;
    }

    async login(login): Promise<Usuario> {
        return this.usuarioRepository.findByLogin(login);
    }
}