import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
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
    endereco: EnderecoDTO;
  
    @ApiProperty({ type: String, example: "minhaSenha123" })
    @IsString()
    @IsNotEmpty({ message: "A senha não pode estar vazia!" })
    senha: string;
  
    @ApiProperty({ type: String, example: "123456789" })
    @IsString()
    @IsNotEmpty({ message: "A matrícula não pode estar vazia!" })
    matricula: string;
  }
  
