import { Injectable, Logger } from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model} from "mongoose";
import {Usuario} from "./usuario.model";
import { LoginDTO } from "./dto/login.dto";
import { HashService } from "../hash/hash.service";
import { CreateAutorInputDto } from "./dto/create/createAutor.dto";
import { Role } from "src/roles/roles.enum";

@Injectable()
export class UsuarioRepository {

    private readonly logger = new Logger(UsuarioRepository.name);
    constructor(@InjectModel(Usuario.name) private readonly usuario: Model<Usuario>, private readonly hashService: HashService) {
    }

    async create(usuarioData: Partial<Usuario>): Promise<Usuario> {
        const senhaHash = this.hashService.getHashSenha(usuarioData.senha);
        usuarioData.senha = senhaHash;
        const usuarioCriado = new this.usuario(usuarioData);
        usuarioCriado._id = new mongoose.Types.ObjectId();
        this.logger.log('Senha hash: ' + senhaHash)
        this.logger.log('Usuario criado', usuarioCriado)
        return usuarioCriado.save();
    }

    async createAutor(autorData: CreateAutorInputDto): Promise<Usuario> {
        const senhaPadrao = '1234';
        const senhaHash = this.hashService.getHashSenha(senhaPadrao);
    
        // Crie um novo objeto Usuario e preencha com os dados de autorData
        const usuarioData: Partial<Usuario> = {
            nome: autorData.nome,
            cpf: autorData.cpf,
            rg: autorData.rg,
            email: autorData.email ?? '',
            matricula: autorData.matricula ?? '',
            telefone: autorData.telefone ?? '',
            endereco: autorData.endereco ?? { rua: '', bairro: '', cep: '' },
            bairro: autorData.bairro ?? '',
            cep: autorData.cep ?? '',
            dataNascimento: autorData.dataNascimento ?? '',
            orgaoEmissor: autorData.orgaoEmissor ?? '',
            profissao: autorData.profissao ?? '',
            cidade: autorData.cidade ?? '',
            estado: autorData.estado ?? '',
            perfil: Role.User,
            senha: senhaHash,
            camposIncompletos: autorData.camposIncompletos ?? [],
        };
    
        // Cria um novo documento de usuário
        const usuarioCriado = new this.usuario(usuarioData);
        usuarioCriado._id = new mongoose.Types.ObjectId();
    
        this.logger.log('Senha hash: ' + senhaHash);
        this.logger.log('Usuario criado', usuarioCriado);
    
        // Salva o usuário no banco de dados e retorna o resultado
        return usuarioCriado.save();
    }    

    // Atualiza um autor existente com os novos dados
    async updateAutor(usuarioId: mongoose.Types.ObjectId, updateData: CreateAutorInputDto): Promise<Usuario> {
        // Define os dados a serem atualizados
        const updatedData = { ...updateData };

        // Atualiza o documento de usuário
        return this.usuario.findByIdAndUpdate(usuarioId, updatedData, { new: true }).exec();
    }
    
    async findAll(): Promise<Usuario[]> {
        return this.usuario.find().exec();
    }

    async update(
      uuid: string,
      updateData: Partial<Usuario>,
    ): Promise<Usuario | null> {
        const usuarioAtualizado = await this.usuario.findByIdAndUpdate(
          uuid,
          updateData,
          { new: true },
        );
        this.logger.log(`O usuario foi atualizado! Usuario atualizado ${uuid}: ${usuarioAtualizado}`)
        return usuarioAtualizado;
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

    async findByMatricula(matricula: string): Promise<Usuario> {
        const usuario = await this.usuario.findOne({ matricula }).exec();
        this.logger.log('Usuario retornado: ' + usuario)
        return usuario;
    }

    async findSenhaUsuario(cpf: string): Promise<string> {
        const usuario = await this.usuario.findOne({ cpf }).exec();
        const senhaUsuario =  usuario.senha;
        this.logger.log("Senha do usuario retornado: " + senhaUsuario)
        return senhaUsuario;
    }

    async redefinirSenha(cpf: string, novaSenha: string): Promise<void> {
        const usuario = await this.findByCpf(cpf);
        if (usuario) {
            const senhaHash = this.hashService.getHashSenha(novaSenha);
            await this.usuario.findByIdAndUpdate(usuario._id, { senha: senhaHash });
            this.logger.log('Senha atualizada para o usuário com CPF: ' + cpf);
        } else {
            this.logger.error('Usuário não encontrado com CPF: ' + cpf);
        }
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