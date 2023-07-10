import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { IsEmailConstraint } from '../validation//emailEhUnico.validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio!' })
  nome: string;

  @IsEmail(undefined, {
    message:
      'O email é inválido! Verifique se esqueceu alguma informação ou ocorreu erro de digitação!',
  })
  @IsEmailConstraint({
    message: 'Já existe um usuário cadastrado com esse email!',
  })
  @IsNotEmpty({
    message: 'O email não pode estar vazio!',
  })
  email: string;

  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres!' })
  @IsNotEmpty({
    message: 'a senha não pode estar vazia!',
  })
  senha: string;
}
