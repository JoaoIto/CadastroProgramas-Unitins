import {IsString, IsEmail, MinLength, IsNotEmpty, MaxLength, Length, IsDate, IsOptional} from 'class-validator';
import {ProgramaStatus} from "../programa-status.enum";

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

    @IsString({ message: "A data não tem tamanho compatível"})
    @IsNotEmpty({
        message: 'A data não pode estar vazia!',
    })
    dataNascimento: Date;

    @IsString({ message: "Não é compatível"})
    @IsNotEmpty({
        message: 'Este campo não pode estar vazio!',
    })
    estadoCivil: string;

    @IsNotEmpty({
        message: 'Este campo não pode estar vazio!'
    })

    @IsNotEmpty({
        message: 'Este campo não pode estar vazio!'
    })
    status: ProgramaStatus

    nomeArquivo: string;
}