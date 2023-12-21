import {Body, Injectable} from '@nestjs/common';
import {UsuarioRepository} from "./usuario.repository";
import {Usuario} from "./usuario.model";
import {Programa} from "../programa/programa.model";
import { Role } from "../roles/roles.enum";

@Injectable()
export class UsuarioService{
    constructor(private usuarioRepository: UsuarioRepository) {}
    async listar(): Promise<Usuario[]>{
        return this.usuarioRepository.findAll();
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