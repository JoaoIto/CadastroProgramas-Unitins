import { IsString, IsNotEmpty, IsArray, IsDateString, IsBooleanString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProgramaStatus } from "../../programa-status.enum";
import { ProgramaFase } from '../../programa-fase.enum';
import mongoose from 'mongoose';

export class UpdateProgramaInputDto {
    @ApiProperty({ type: String, example: 'Título do Programa', required: false })
    @IsString()
    @IsOptional()
    titulo?: string;

    @ApiProperty({ type: String, example: 'Descrição do Programa', required: false })
    @IsString()
    @IsOptional()
    descricao?: string;

    @ApiProperty({ type: String, example: 'Descrição da solução do problema', required: false })
    @IsString()
    @IsOptional()
    solucaoProblemaDesc?: string;

    @ApiProperty({ type: [String], example: ['JavaScript', 'Python'], required: false })
    @IsArray()
    @IsString({ each: true, message: 'As linguagens devem ser uma lista de strings!' })
    @IsOptional()
    linguagens?: string[];

    @ApiProperty({ type: String, example: 'Descrição do mercado', required: false })
    @IsString()
    @IsOptional()
    descricaoMercado?: string;

    @ApiProperty({ type: Date, example: '2024-05-05', required: false })
    @IsDateString()
    @IsOptional()
    dataCriacaoPrograma?: Date;

    @ApiProperty({ type: Boolean, example: true, required: false })
    @IsBooleanString({ message: 'O vínculo com a Unitins deve ser uma string booleana!' })
    @IsOptional()
    vinculoUnitins?: boolean;

    @ApiProperty({ type: String, example: 'Descrição do vínculo institucional', required: false })
    @IsString()
    @IsOptional()
    vinculoInstitucional?: string;

    @ApiProperty({ type: String, enum: ProgramaFase, example: ProgramaFase.ARTIGO, required: false })
    @IsEnum(ProgramaFase, { message: 'A fase de publicação deve ser uma das fases válidas!' })
    @IsOptional()
    fasePublicacao?: ProgramaFase;

    @ApiProperty({ type: String, enum: ProgramaStatus, example: ProgramaStatus.RASCUNHO, required: false })
    @IsEnum(ProgramaStatus, { message: 'O status deve ser um dos status válidos!' })
    @IsOptional()
    status?: ProgramaStatus;

    @ApiProperty({ type: 'string', format: 'binary', example: 'nome_do_arquivo.extensao', required: false })
    @IsOptional()
    nomeArquivo?: string;
}
