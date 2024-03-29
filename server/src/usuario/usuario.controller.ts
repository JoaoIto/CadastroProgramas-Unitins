import { Body, Controller, Get, Logger, Param, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginDTO } from "./dto/login.dto";
import { Role } from "../roles/roles.enum";
import { Roles } from "../roles/roles.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../roles/roles.guard";

@ApiTags('usuario')
@Controller('/usuario')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
    export class UsuarioController{
    private readonly logger = new Logger(UsuarioController.name);

    constructor (private usuarioService: UsuarioService){}
    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Faz a busca dos dados de todos os usuários' })
    async getDados() {
            return this.usuarioService.listar();
    }

    @ApiBearerAuth()
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Faz a busca dos dados do usuario pelo uuid dele' })
    @Get('/:uuid')
    consultar(@Param("uuid") uuid: string) {
        this.logger.log('Fazendo a busca dos dados do usuario com o uuid: ' + uuid)
        return this.usuarioService.consultar(uuid);
    }

    @ApiBearerAuth()
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Faz a busca dos dados do usuario pelo cpf dele' })
    @Get('/cpf/:cpf')
    consultarByCpf(@Param("cpf") cpf: string) {
        this.logger.log('Fazendo a busca dos dados do usuario com o cpf: ' + cpf)
        return this.usuarioService.consultarByCpf(cpf);
    }
    @ApiBearerAuth()
    @Roles(Role.Admin, Role.User)
    @ApiOperation({ summary: 'Faz a busca dos dados do usuario pelo login dele (cpf e senha)' })
    @Post('/login')
    login(@Body() loginDTO: LoginDTO) {
        this.logger.log(`Fazendo a busca dos dados do usuario com o login: ${loginDTO.cpf} e senha: ${loginDTO.senha}`)
        return this.usuarioService.login(loginDTO);
    }
}