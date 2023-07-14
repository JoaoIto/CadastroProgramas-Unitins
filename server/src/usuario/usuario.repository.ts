import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Usuario} from "./usuario.model";

@Injectable()
export class UsuarioRepository {

    constructor(@InjectModel(Usuario.name) private readonly usuario: Model<Usuario>) {
    }
    async findAll(): Promise<Usuario[]> {
        return this.usuario.find().exec();
    }
}