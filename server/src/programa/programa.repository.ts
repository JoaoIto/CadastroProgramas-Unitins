import { Injectable, Logger } from "@nestjs/common";
import { Programa } from "./programa.model";
import mongoose, { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UpdateProgramaInputDto } from "./dto/update/atualizarPrograma.dto";
import { ProgramaStatus } from "./programa-status.enum";

@Injectable()
export class ProgramaRepository {
  private readonly logger = new Logger(ProgramaRepository.name);
  constructor(
    @InjectModel(Programa.name) private readonly programa: Model<Programa>
  ) {}

  async create(programaData: Partial<Programa>): Promise<Programa> {
    const programaCriado = new this.programa(programaData);
    programaCriado._id = new mongoose.Types.ObjectId();
    console.log(programaCriado._id);
    return programaCriado.save();
}

  async findAll(): Promise<Programa[]> {
    return this.programa.find().exec();
  }

  async findById(uuid): Promise<Programa> {
    const programa = await this.programa.findById(uuid).exec();
    this.logger.log("programa retornado: " + programa);
    return programa;
  }

  async findByIds(programaUuids: string[]): Promise<Programa[]> {
    const programas = [];

    for (const uuid of programaUuids) {
      const programa = await this.programa.findById(uuid).exec();

      if (programa) {
        programas.push(programa);
        this.logger.log(
          "Programa retornado para UUID " + uuid + ": " + programa
        );
      } else {
        this.logger.log("Nenhum programa encontrado para UUID " + uuid);
      }
    }

    return programas;
  }

  async findProgramasEnviados(): Promise<Programa[]> {
    try {
      const programas = await this.programa
        .find({ status: ProgramaStatus.ENVIADO })
        .exec();
      this.logger.log("Programas retornados: " + programas);
      return programas;
    } catch (error) {
      this.logger.error("Erro ao buscar programas", error);
      throw error;
    }
  }

  async findProgramasEmAnalise(): Promise<Programa[]> {
    try {
      const programas = await this.programa
        .find({ status: ProgramaStatus.EM_ANALISE })
        .exec();
      this.logger.log("Programas retornados: " + programas);
      return programas;
    } catch (error) {
      this.logger.error("Erro ao buscar programas", error);
      throw error;
    }
  }

  async findByStatus(status: ProgramaStatus): Promise<Programa[]> {
    const programa = await this.programa.find({ status: "APROVADO" }).exec();
    this.logger.log("programa retornado: " + programa);
    return programa;
  }

  async findByUsuarioId(
    usuarioId: mongoose.Types.ObjectId
  ): Promise<Programa[]> {
    this.logger.log(`Buscando programas para o usuário com ID: ${usuarioId}`);
    const programas = await this.programa.find({ usuarioId: usuarioId }).exec();

    this.logger.log(`Query MongoDB: { usuarioId: ${usuarioId} }`);
    if (programas.length === 0) {
      this.logger.log(
        `Nenhum programa encontrado para o usuário com ID ${usuarioId}`
      );
    } else {
      this.logger.log(
        `Programas encontrados para o usuário com ID ${usuarioId}: ${programas.length}`
      );
    }

    return programas;
  }

  async findByUsuarioIdPaginado(usuarioId: mongoose.Types.ObjectId, page: number, limit: number): Promise<{ data: Programa[], total: number }> {
    this.logger.log(`Buscando programas paginados para o usuário com ID: ${usuarioId}`);
    
    const validPage = page < 1 ? 1 : page;
    
    // Calcular o valor de skip
    const skip = (validPage - 1) * limit; 
    
    // Adicionar logs para verificar valores
    this.logger.log(`Página solicitada: ${page}`);
    this.logger.log(`Limite por página: ${limit}`);
    this.logger.log(`Valor de skip: ${skip}`);
    
    // Buscar dados com paginação
    const [data, total] = await Promise.all([
      this.programa.find({ usuarioId }).skip(skip).limit(limit).exec(),
      this.programa.countDocuments({ usuarioId }).exec()
    ]);
  
    // Adicionar logs para verificar resultados
    if (data.length === 0) {
      this.logger.log(`Nenhum programa encontrado para a página ${page} com limite ${limit}`);
    } else {
      this.logger.log(`Programas encontrados para a página ${page} com limite ${limit}: ${data.length}`);
    }
  
    this.logger.log(`Total de programas encontrados: ${total}`);
  
    return { data, total };
  }
  

  /* async findByUsuarioIdPaginado(
    usuarioId: mongoose.Types.ObjectId,
    page: number,
    limit: number
  ): Promise<{ data: Programa[], total: number }> {
    this.logger.log(`Buscando programas paginados para o usuário com ID: ${usuarioId}`);
    const skip = (page - 1) * limit;
  
    const [data, total] = await Promise.all([
      this.programa.find({ usuarioId: usuarioId }).skip(skip).limit(limit).exec(),
      this.programa.countDocuments({ usuarioId }).exec()
    ]);
  
    if (data.length === 0) {
      this.logger.log(
        `Nenhum programa encontrado para o usuário com ID ${usuarioId}`
      );
    } else {
      this.logger.log(
        `Programas encontrados para o usuário com ID ${usuarioId}: ${data.length}`
      );
    }
  
    return { data, total };
  } */

  async findProgramaTituloByUsuarioId(
    usuarioId: mongoose.Types.ObjectId,
    titulo: string
  ): Promise<Programa[]> {
    let query = { usuarioId: usuarioId, titulo: titulo };
    const programas = await this.programa.find(query).exec();
    this.logger.log("programas retornados: " + programas);
    return programas;
  }

  async update(uuid: string, updateData: Programa): Promise<Programa | null> {
    const programaAtualizado = await this.programa.findByIdAndUpdate(
      uuid,
      updateData,
      { new: true }
    );
    this.logger.log(
      `O programa foi atualizado! Programa atualizado ${uuid}: ${programaAtualizado}`
    );
    return programaAtualizado;
  }

  async delete(uuid: string): Promise<void> {
    const programaApagar = await this.programa.findByIdAndDelete(uuid);
    this.logger.log(
      `O programa foi deletado! Programa deletado ${uuid}: ${programaApagar}`
    );
  }
}
