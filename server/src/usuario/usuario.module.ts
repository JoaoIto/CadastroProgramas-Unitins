import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {UsuarioRepository} from "./usuario.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {Usuario, UsuarioSchema} from "./usuario.model";

@Module({
    imports:[MongooseModule.forFeature([{name: 'Usuario', schema: UsuarioSchema}])],
    controllers: [UsuarioController],
    providers: [UsuarioService, UsuarioRepository],
    exports: [UsuarioService]
})

export class UsuarioModule{}