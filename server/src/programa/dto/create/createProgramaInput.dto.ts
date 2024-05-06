import { IsString, IsNotEmpty, IsArray, IsDateString, IsBooleanString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProgramaStatus } from "../../programa-status.enum";
import { ProgramaFase } from '../../programa-fase.enum';
import mongoose, { Schema } from 'mongoose';

export class CreateProgramaInputDto {
    @ApiProperty({ type: String, example: 'Título do Programa' })
    @IsString()
    @IsNotEmpty({ message: 'O título não pode estar vazio!' })
    titulo: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    usuarioId: mongoose.Types.ObjectId;

    @ApiProperty({ type: String, example: 'Descrição do Programa' })
    @IsString()
    @IsNotEmpty({ message: 'A descrição não pode estar vazia!' })
    descricao: string;

    @ApiProperty({ type: String, example: 'Descrição da solução do problema' })
    @IsString()
    @IsNotEmpty({ message: 'A descrição da solução do problema não pode estar vazia!' })
    solucaoProblemaDesc: string;

    @ApiProperty({ type: [String], example: ['JavaScript', 'Python'] })
    @IsArray()
    @IsString({ each: true, message: 'As linguagens devem ser uma lista de strings!' })
    @IsNotEmpty({ message: 'A lista de linguagens não pode estar vazia!' })
    linguagens: string[];

    @ApiProperty({ type: String, example: 'Descrição do mercado' })
    @IsString()
    @IsNotEmpty({ message: 'A descrição do mercado não pode estar vazia!' })
    descricaoMercado: string;

    @ApiProperty({ type: Date, example: '2024-05-05' })
    @IsDateString()
    @IsNotEmpty({ message: 'A data de criação do programa não pode estar vazia!' })
    dataCriacaoPrograma: Date;

    @ApiProperty({ type: Boolean, example: true })
    @IsBooleanString({ message: 'O vínculo com a Unitins deve ser uma string booleana!' })
    vinculoUnitins: boolean;

    @ApiProperty({ type: String, example: 'Descrição do vínculo institucional' })
    @IsOptional()
    @IsString()
    vinculoInstitucional?: string;

    @ApiProperty({ type: String, enum: ProgramaFase, example: ProgramaFase.ARTIGO })
    @IsEnum(ProgramaFase, { message: 'A fase de publicação deve ser uma das fases válidas!' })
    fasePublicacao: ProgramaFase;

    @ApiProperty({ type: String, enum: ProgramaStatus, example: ProgramaStatus.RASCUNHO })
    @IsEnum(ProgramaStatus, { message: 'O status deve ser um dos status válidos!' })
    status: ProgramaStatus;

    @ApiProperty({ type: 'string', format: 'binary', example: 'nome_do_arquivo.extensao' })
    nomeArquivo?: string;
}
