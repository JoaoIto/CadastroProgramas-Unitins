import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsDateString } from 'class-validator';
import { EnderecoDTO } from '../cadastro.dto';
import { Usuario } from 'src/usuario/usuario.model';

export class CreateAutorInputDto implements Partial<Usuario> {
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

  @ApiProperty({ type: String, example: "email@exampleEmail.com" })
  @IsEmail({}, { message: "O email deve ser válido!" })
  @IsNotEmpty({ message: "O email não pode estar vazio!" })
  email: string;

  @ApiProperty({ type: String, example: "123456789" })
  @IsString()
  @IsNotEmpty({ message: "A matrícula não pode estar vazia!" })
  matricula: string;

  @ApiProperty({ type: String, example: "(99) 99999-9999" })
  @IsString()
  @IsNotEmpty({ message: "O telefone não pode estar vazio!" })
  telefone: string;

  @ApiProperty({ type: EnderecoDTO })
  @IsNotEmpty({ message: "O endereço não pode estar vazio!" })
  endereco: EnderecoDTO;

  @ApiProperty({ type: String, example: "Centro" })
  @IsString()
  @IsNotEmpty({ message: "O bairro não pode estar vazio!" })
  bairro: string;

  @ApiProperty({ type: String, example: "12345-678" })
  @IsString()
  @IsNotEmpty({ message: "O CEP não pode estar vazio!" })
  cep: string;

  @ApiProperty({ type: String, example: "1980-01-01" })
  @IsNotEmpty({ message: "A data de nascimento não pode estar vazia!" })
  dataNascimento: string;

  @ApiProperty({ type: String, example: "SSP" })
  @IsString()
  @IsNotEmpty({ message: "O órgão emissor não pode estar vazio!" })
  orgaoEmissor: string;

  @ApiProperty({ type: String, example: "Engenheiro" })
  @IsString()
  @IsNotEmpty({ message: "A profissão não pode estar vazia!" })
  profissao: string;

  @ApiProperty({ type: String, example: "São Paulo" })
  @IsString()
  @IsNotEmpty({ message: "A cidade não pode estar vazia!" })
  cidade: string;

  @ApiProperty({ type: String, example: "SP" })
  @IsString()
  @IsNotEmpty({ message: "O estado não pode estar vazio!" })
  estado: string;

  @ApiProperty({ type: [String], example: [] })
  @IsNotEmpty({ message: "Os campos incompletos não podem estar vazios!" })
  camposIncompletos: string[];
}
