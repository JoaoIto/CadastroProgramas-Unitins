import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {UsuarioRepository} from "./usuario.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {Usuario, UsuarioSchema} from "./usuario.model";
import { HashService } from "../hash/hash.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[MongooseModule.forFeature([{name: 'Usuario', schema: UsuarioSchema}]), JwtModule],
    controllers: [UsuarioController],
    providers: [UsuarioService, UsuarioRepository, HashService],
    exports: [UsuarioService, HashService, UsuarioRepository]
})

export class UsuarioModule{}