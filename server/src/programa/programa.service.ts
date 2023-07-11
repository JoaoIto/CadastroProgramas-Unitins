import {Injectable} from '@nestjs/common';

@Injectable()
export class ProgramaService {
    async enviarDados(formData: any) {
        // Faça o que quiser com os dados do formulário aqui
        console.log(formData);
    }
}
