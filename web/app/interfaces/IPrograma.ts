interface IPrograma {
    _id: string;
    usuarioId: string;
    titulo: string;
    descricao: string;
    solucaoProblemaDesc: string;
    linguagens: string[];
    descricaoMercado: string;
    dataCriacaoPrograma: Date | null;
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
}