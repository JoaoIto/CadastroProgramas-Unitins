import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class EnderecoDTO {
  @ApiProperty({ type: String, example: "Rua dos Bobos" })
  @IsString()
  @IsNotEmpty({ message: "A rua não pode estar vazia!" })
  rua: string;

  @ApiProperty({ type: String, example: "Centro" })
  @IsString()
  @IsNotEmpty({ message: "O bairro não pode estar vazio!" })
  bairro: string;

  @ApiProperty({ type: String, example: "12345678" })
  @IsString()
  @IsNotEmpty({ message: "O CEP não pode estar vazio!" })
  cep: string;
}

export class CadastroDTO {
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

  @ApiProperty({ required: false, type: EnderecoDTO })
  endereco: EnderecoDTO;

  @ApiProperty({ type: String, example: "minhaSenha123" })
  @IsString()
  @IsNotEmpty({ message: "A senha não pode estar vazia!" })
  senha: string;

  @ApiProperty({ type: String, example: "email@emailExample.com" })
  @IsString()
  @IsNotEmpty({ message: "O email não pode estar vazio!" })
  email: string;

  @ApiProperty({ required: false, type: String, example: "123456789" })
  @IsString()
  matricula: string;
}
