import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { EnderecoDTO } from '../cadastro.dto';

export class UpdateUsuarioInputDto {
    @ApiProperty({ type: String, example: 'Nome do Usuário' })
    @IsString()
    @IsNotEmpty({ message: 'O nome não pode estar vazio!' })
    nome?: string;

    @ApiProperty({ type: String, example: '12345678900' })
    @IsString()
    @IsNotEmpty({ message: 'O CPF não pode estar vazio!' })
    cpf?: string;

    @ApiProperty({ type: String, example: '24643487' })
    @IsString()
    @IsNotEmpty({ message: 'O rg não pode estar vazio!' })
    rg?: string;

    @ApiProperty({ type: String, example: 'senha123' })
    @IsString()
    @IsNotEmpty({ message: 'A senha não pode estar vazia!' })
    senha?: string;

    @ApiProperty({ type: String, example: '1112324232' })
    @IsString()
    @IsNotEmpty({ message: 'A matrícula não pode estar vazia!' })
    matricula?: string;

    @ApiProperty({ type: String, example: 'Rua 1, Bairro Teste' })
    endereco?: EnderecoDTO;
}
