interface IPrograma {
    _id: string;
    usuarioId: string;
    titulo: string;
    descricao: string;
    solucaoProblemaDesc: string;
    linguagens: string[];
    modificacaoTecnologicaDesc: string | null;
    descricaoMercado: string;
    dataCriacaoPrograma: Date | null;
    dataCriacao: string;
    vinculoUnitins: boolean;
    vinculoInstitucional: string | null;
    fasePublicacao: string;
    status: string;
    nomeArquivo: File | null;
}