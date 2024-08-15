import { Usuario, UsuarioDocument } from "src/usuario/usuario.model";

export const verificarCamposIncompletos = (usuario: Usuario): string[] => {
    const camposIncompletos: string[] = [];

    if (!usuario.nome || usuario.nome == '') camposIncompletos.push('nome');
    if (!usuario.cpf || usuario.cpf == '') camposIncompletos.push('cpf');
    if (!usuario.rg || usuario.rg == '') camposIncompletos.push('rg');
    if (!usuario.senha || usuario.senha == '') camposIncompletos.push('senha');
    if (!usuario.matricula || usuario.matricula == '') camposIncompletos.push('matricula');
    if (!usuario.endereco) camposIncompletos.push('endereco');
    return camposIncompletos;
};

export const verificarCamposIncompletosEmLista = (usuarios: Usuario[]): void => {
    usuarios.forEach(usuario => {
        usuario.camposIncompletos = verificarCamposIncompletos(usuario);
    });
};
