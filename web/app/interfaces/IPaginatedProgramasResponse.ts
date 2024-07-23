interface IPaginatedProgramasResponse {
    data: IPrograma[];
    total: number;
    page: number;
    limit: number;
}