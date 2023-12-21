import { Injectable, Logger } from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Usuario} from "./usuario.model";
import { find } from "rxjs";
import { LoginDTO } from "./dto/login.dto";
import { HashService } from "../hash/hash.service";
import { Role } from "../roles/roles.enum";

@Injectable()
export class UsuarioRepository {

    private readonly logger = new Logger(UsuarioRepository.name);
    constructor(@InjectModel(Usuario.name) private readonly usuario: Model<Usuario>, private readonly hashService: HashService) {
    }
    async findAll(): Promise<Usuario[]> {
        return this.usuario.find().exec();
    }

    async findById(uuid): Promise<Usuario> {
        const usuario = await this.usuario.findById(uuid).exec();
        this.logger.log('Usuario retornado: ' + usuario)
        return usuario;
    }

    async findByCpf(cpf: string): Promise<Usuario> {
        const usuario = await this.usuario.findOne({ cpf }).exec();
        this.logger.log('Usuario retornado: ' + usuario)
        return usuario;
    }

    async findSenhaUsuario(cpf: string): Promise<string> {
        const usuario = await this.usuario.findOne({ cpf }).exec();
        const senhaUsuario =  usuario.senha;
        this.logger.log("Senha do usuario retornado: " + senhaUsuario)
        return senhaUsuario;
    }

    async findByLogin(login: LoginDTO): Promise<Usuario | null> {
        const { cpf, senha } = login;

        // Primeiro, você deve verificar se o CPF existe na base de dados
        const usuario = await this.findByCpf(cpf);
        const senhaUsuario = await this.findSenhaUsuario(cpf);
        this.logger.log("Usuario da consulta por cpf: " + usuario);
        this.logger.log("Retornando a senha do usuario pelo cpf: " + senhaUsuario);

        if (usuario) {
            // Se o CPF existe, agora você pode verificar a senha
            const senhaCorreta = await this.hashService.verifyHashSenha(senha, usuario.senha);

            if (senhaCorreta) {
                // Se a senha está correta, retorna o usuário
                return usuario;
            }
        }

        // Se o CPF ou a senha estiverem incorretos, retorna null
        return null;
    }
}