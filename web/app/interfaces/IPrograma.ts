import { ProgramaStatus } from "../enum/programa-status.enum";

export interface IPrograma {
    _id: string;
    titulo: string;
    justificativa: string | null;
    descricao: string;
    solucaoProblemaDesc: string;
    linguagens: string[];
    descricaoMercado: string;
    dataCriacaoPrograma: Date | string | null;
    dataCriacao: string;
    vinculoUnitins: boolean;
    vinculoUnitinsDesc: string | null;
    nomeInstituicao: string | null;
    vinculoInstituicao: string | null;
    fasePublicacao: string;
    status: ProgramaStatus;
    outrasObrasDesc: string | null,
    fonteFinanciamentoDesc: string | null,
    revelacaoDesc: string | null,
    revelacaoPublicaDesc: string | null,
    nomeArquivo: File | null;
    autores: string[]
    documentoConfidencialidadePath: string | null
    codigoFontePath: string | null;
    boletoPath: string | null;
    veracidadePath: string | null;
    certificadoRegistroPath: string | null;
    rpiPath: string | null;
    protocoloINPIPath: string | null;
    hash: string | null;
    hashType: string | null;
}