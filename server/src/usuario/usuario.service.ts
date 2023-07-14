import {Body, Injectable} from '@nestjs/common';
import {UsuarioRepository} from "./usuario.repository";
import {Usuario} from "./usuario.model";

@Injectable()
export class UsuarioService{
    constructor(private usuarioRepository: UsuarioRepository) {}
    async listar(): Promise<Usuario[]>{
        return this.usuarioRepository.findAll();
    }
}