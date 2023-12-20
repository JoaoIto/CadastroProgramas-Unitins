import { Injectable, Logger } from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Usuario} from "./usuario.model";
import { find } from "rxjs";

@Injectable()
export class UsuarioRepository {

    private readonly logger = new Logger(UsuarioRepository.name);

    constructor(@InjectModel(Usuario.name) private readonly usuario: Model<Usuario>) {
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
}