import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDTO {
  @ApiProperty ({ type: String, example: '000.111.222-33'})
  @IsNotEmpty()
  cpf: string

  @ApiProperty ({ type: String, example: '2308'})
  @IsNotEmpty()
  senha: string
}