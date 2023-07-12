import { Injectable } from '@nestjs/common';

@Injectable()
export class ProgramaRepository {
    private programas = [];

    async salva(users) {
        this.programas.push(users);
        console.log(`A new programa in arr! Programas: ${JSON.stringify(this.programas)}`);
    }

    async lista() {
        return this.programas;
    }
}