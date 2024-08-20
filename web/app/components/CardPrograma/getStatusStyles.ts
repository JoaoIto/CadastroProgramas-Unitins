import { ProgramaStatus } from "@/app/enum/programa-status.enum";

export const getStatusStyles = (status: ProgramaStatus) => {
    switch (status) {
        case ProgramaStatus.RASCUNHO:
            return {
                borderColor: '#6C757D',        // Cinza escuro
                backgroundColor: '#E2E3E5',   // Cinza claro
                color: '#383D41'              // Cinza médio
            };
        case ProgramaStatus.ENVIADO:
            return {
                borderColor: '#007BFF',        // Azul
                backgroundColor: '#CCE5FF',   // Azul claro
                color: '#004085'              // Azul escuro
            };
        case ProgramaStatus.EM_ANALISE:
            return {
                borderColor: '#FFC107',        // Amarelo
                backgroundColor: '#FFF3CD',   // Amarelo claro
                color: '#856404'              // Amarelo escuro
            };
        case ProgramaStatus.APROVADO:
            return {
                borderColor: '#28A745',        // Verde
                backgroundColor: '#D4EDDA',   // Verde claro
                color: '#155724'              // Verde escuro
            };
        case ProgramaStatus.REPROVADO:
            return {
                borderColor: '#DC3545',        // Vermelho
                backgroundColor: '#F8D7DA',   // Vermelho claro
                color: '#721C24'              // Vermelho escuro
            };
        case ProgramaStatus.EM_AJUSTES:
            return {
                borderColor: '#FD7E14',        // Laranja
                backgroundColor: '#FFE5D5',   // Laranja claro
                color: '#8A4B08'              // Laranja escuro
            };
        default:
            return {
                borderColor: '#6C757D',        // Cinza escuro (fallback)
                backgroundColor: '#E2E3E5',   // Cinza claro
                color: '#383D41'              // Cinza médio
            };
    }
};
