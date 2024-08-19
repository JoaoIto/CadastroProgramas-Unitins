interface IPrograma {
    _id: string;
    usuarioId: string;
    titulo: string;
    descricao: string;
    solucaoProblemaDesc: string;
    linguagens: string[];
    descricaoMercado: string;
    dataCriacaoPrograma: Date | string | null;
    dataCriacao: string;
    vinculoUnitins: boolean;
    vinculoInstitucional: string | null;
    fasePublicacao: string;
    status: string;
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