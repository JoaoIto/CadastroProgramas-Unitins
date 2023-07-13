import { IsString, IsNotEmpty, Length, IsOptional, IsDate } from 'class-validator';

export class AtualizarProgramaDto {
    @IsString()
    @IsNotEmpty({ message: 'O nome não pode estar vazio!' })
    @IsOptional()
    nomeCompleto?: string;

    @IsString({
        message: 'O RG não é válido...',
    })
    @Length(7, 7, { message: 'O RG não é compatível com o tamanho!' })
    @IsNotEmpty({
        message: 'O RG não pode estar vazio!',
    })
    @IsOptional()
    rg?: string;

    @Length(11, 11, { message: 'O CPF não é compatível com o tamanho!' })
    @IsNotEmpty({
        message: 'O CPF não pode estar vazio!',
    })
    @IsOptional()
    cpf?: string;

    @IsDate({ message: 'A data não tem tamanho compatível' })
    @IsNotEmpty({
        message: 'A data não pode estar vazia!',
    })
    @IsOptional()
    dataNascimento?: Date;

    @IsString({ message: 'Não é compatível' })
    @IsNotEmpty({
        message: 'Este campo não pode estar vazio!',
    })
    @IsOptional()
    estadoCivil?: string;
}
