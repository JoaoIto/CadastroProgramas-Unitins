import {Body, Injectable} from '@nestjs/common';
import {UsuarioRepository} from "./usuario.repository";
import {Usuario} from "./usuario.model";
import {Programa} from "../programa/programa.model";
import { Role } from "../roles/roles.enum";
import { CreateUsuarioInputDto } from './dto/create/createUsuario.dto';
import { CadastroDTO } from './dto/cadastro.dto';

@Injectable()
export class UsuarioService{
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
    async consultar(uuid): Promise<Usuario> {
        return this.usuarioRepository.findById(uuid);
    }

    async consultarByCpf(cpf): Promise<Usuario> {
        return this.usuarioRepository.findByCpf(cpf);
    }

    async login(login): Promise<Usuario> {
        return this.usuarioRepository.findByLogin(login);
    }
}