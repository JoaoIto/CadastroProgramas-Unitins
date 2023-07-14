import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {UsuarioRepository} from "./usuario.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {UsuarioSchema} from "./usuario.model";

@Module({
    imports:[MongooseModule.forFeature([{name: 'Usuario', schema: UsuarioSchema}])],
    controllers: [UsuarioController],
    providers: [UsuarioService, UsuarioRepository]
})

export class UsuarioModule{}