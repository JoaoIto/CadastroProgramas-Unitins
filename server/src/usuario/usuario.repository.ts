import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Usuario} from "./usuario.model";
import { find } from "rxjs";

@Injectable()
export class UsuarioRepository {

    constructor(@InjectModel(Usuario.name) private readonly usuario: Model<Usuario>) {
    }
    async findAll(): Promise<Usuario[]> {
        return this.usuario.find().exec();
    }

    async findById(uuid): Promise<Usuario> {
        return this.usuario.findById(uuid).exec();
    }

    async findByCpf(cpf: string): Promise<Usuario> {
        return this.usuario.findOne({ cpf }).exec();
    }
}