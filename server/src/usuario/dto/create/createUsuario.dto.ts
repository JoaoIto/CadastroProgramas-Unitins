import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { EnderecoDTO } from '../cadastro.dto';

export class CreateUsuarioInputDto {
  @ApiProperty({ type: String, example: "João da Silva" })
  @IsString()
  @IsNotEmpty({ message: "O nome não pode estar vazio!" })
  nome: string;

  @ApiProperty({ type: String, example: "00011122233" })
  @IsString()
  @IsNotEmpty({ message: "O CPF não pode estar vazio!" })
  cpf: string;

  @ApiProperty({ type: String, example: "1234567" })
  @IsString()
  @IsNotEmpty({ message: "O RG não pode estar vazio!" })
  rg: string;

  @ApiProperty({ type: EnderecoDTO })
  @IsNotEmpty({ message: "O endereço não pode estar vazio!" })
  endereco: EnderecoDTO;

  @ApiProperty({ type: String, example: "minhaSenha123" })
  @IsString()
  @IsNotEmpty({ message: "A senha não pode estar vazia!" })
  senha: string;

  @ApiProperty({ type: String, example: "123456789" })
  @IsString()
  @IsNotEmpty({ message: "A matrícula não pode estar vazia!" })
  matricula: string;

  @ApiProperty({ type: Boolean, example: true })
  @IsBoolean()
  @IsNotEmpty({ message: "O campo 'vinculoUnitins' não pode estar vazio!" })
  vinculoUnitins: boolean;

  @ApiProperty({ type: String, example: "Descrição do vínculo com a Unitins" })
  @IsString()
  @IsNotEmpty({ message: "A descrição do vínculo com a Unitins não pode estar vazia!" })
  vinculoUnitinsDesc: string;

  @ApiProperty({ type: String, example: "Nome da Instituição" })
  @IsString()
  @IsNotEmpty({ message: "O nome da instituição não pode estar vazio!" })
  nomeInstituicao: string;

  @ApiProperty({ type: String, example: "Vínculo com a instituição", required: false, nullable: true })
  @IsString()
  @IsOptional()
  vinculoInstituicao?: string;
}
