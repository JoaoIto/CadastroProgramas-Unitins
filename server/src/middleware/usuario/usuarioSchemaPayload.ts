import { UsuarioDocument, UsuarioSchema } from "src/usuario/usuario.model";
import { verificarCamposIncompletos, verificarCamposIncompletosEmLista } from "./functions/verifyKeysUser";

export const verificarCamposIncompletosMiddleware = function (this: UsuarioDocument, next: Function) {
    this.camposIncompletos = verificarCamposIncompletos(this);
    next();
};

export const verificarCamposIncompletosFindMiddleware = function (docs: UsuarioDocument[], next: Function) {
    verificarCamposIncompletosEmLista(docs);
    next();
};

export const verificarCamposIncompletosFindOneMiddleware = function (doc: UsuarioDocument, next: Function) {
    if (doc) {
        doc.camposIncompletos = verificarCamposIncompletos(doc);
    }
    next();
};

// Adicionar middleware para find e findOne
UsuarioSchema.post<UsuarioDocument>('find', verificarCamposIncompletosFindMiddleware);
UsuarioSchema.post<UsuarioDocument>('findOne', verificarCamposIncompletosFindOneMiddleware);
