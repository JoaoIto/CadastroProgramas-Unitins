import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsOptional, IsDate, IsDateString } from 'class-validator';

export class AtualizarProgramaDto {
    @ApiProperty ({ type: String, example: 'Pedrinho Joao Silva'})
    @IsString()
    @IsNotEmpty({ message: 'O nome não pode estar vazio!' })
    nomeCompleto: string;

    @ApiProperty ({ type: String, example: '1111111'})
    @IsString({
        message:
          'O RG não é válido...',
    })
    @Length(7, 7, { message: 'O RG não é compatível com o tamanho!' })
    @IsNotEmpty({
        message: 'O RG não pode estar vazio!',
    })
    rg: string;

    @ApiProperty ({ type: String, example: '000.111.222-33'})
    @Length(11, 11, { message: 'O CPF não é compatível com o tamanho!' })
    @IsNotEmpty({
        message: 'O CPF não pode estar vazio!',
    })
    cpf: string;

    @ApiProperty({ type: Date, example: '2000-01-01' }) // Adicionando exemplo e tipo para o Swagger
    @IsDateString()
    @IsNotEmpty({
        message: 'A data não pode estar vazia!',
    })
    dataNascimento: Date;

    @ApiProperty ({ type: String, example: 'solteiro/casado'})
    @IsString({ message: "Não é compatível" })
    @IsNotEmpty({
        message: 'Este campo não pode estar vazio!',
    })
    estadoCivil: string;
}
