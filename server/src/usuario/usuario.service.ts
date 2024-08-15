import { Injectable, Logger} from '@nestjs/common';
import {UsuarioRepository} from "./usuario.repository";
import {Usuario, UsuarioDocument} from "./usuario.model";
import { CreateUsuarioInputDto } from './dto/create/createUsuario.dto';
import { CadastroDTO } from './dto/cadastro.dto';
import { verificarCamposIncompletos } from 'src/middleware/usuario/functions/verifyKeysUser';

@Injectable()
export class UsuarioService{
    private readonly logger = new Logger(UsuarioService.name);
    constructor(private usuarioRepository: UsuarioRepository) {}

    async create(user: CreateUsuarioInputDto): Promise<Usuario>{
        return this.usuarioRepository.create(user);
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