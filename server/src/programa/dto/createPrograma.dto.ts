import {IsString, IsEmail, MinLength, IsNotEmpty, MaxLength, Length, IsDate} from 'class-validator';

export class CreateProgramaDto {
    @IsString()
    @IsNotEmpty({ message: 'O nome não pode estar vazio!' })
    nomeCompleto: string;

    @IsString({
        message:
            'O RG não é válido...',
    })
    @Length(7, 7, { message: 'O RG não é compatível com o tamanho!' })
    @IsNotEmpty({
        message: 'O RG não pode estar vazio!',
    })
    rg: string;

    @Length(11, 11, { message: 'O CPF não é compatível com o tamanho!' })
    @IsNotEmpty({
        message: 'O CPF não pode estar vazio!',
    })
    cpf: string;

    @IsDate({ message: "A data não tem tamanho compatível"})
    @IsNotEmpty({
        message: 'A data não pode estar vazia!',
    })
    dataNascimento: Date;

    @IsString({ message: "Não é compatível"})
    @IsNotEmpty({
        message: 'Este campo não pode estar vazio!',
    })
    estadoCivil: String;
}