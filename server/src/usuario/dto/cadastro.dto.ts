import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CadastroDTO {
  @ApiProperty({ type: String, example: "000.111.222-33" })
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({ type: String, example: "1663313" })
  @IsString()
  @IsNotEmpty()
  rg: string;

  @ApiProperty({ type: String, example: "2308" })
  @IsString()
  @IsNotEmpty({ message: "A senha não pode estar vazia!" })
  senha: string;

  @ApiProperty({ type: String, example: "1112324232" })
  @IsString()
  @IsNotEmpty({ message: "A matrícula não pode estar vazia!" })
  matricula: string;

  @ApiProperty({ type: String, example: "Rua 1, Bairro Teste" })
  endereco?: string;
}
