class ApiUtils {
    static async post(endpoint: string, data: object): Promise<void> {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Dados enviados com sucesso');
            } else {
                console.log('Erro ao enviar os dados:', response.status);
            }
        } catch (error) {
            console.error(error);
        }
    }

    static async get<T>(endpoint: string): Promise<T | undefined> {
        try {
            const response = await fetch(endpoint);

            if (response.ok) {
                const data = await response.json();
                return data as T;
            } else {
                console.log('Erro ao buscar os dados:', response.status);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
        }
        return undefined;
    }

    static async put(endpoint: string, data: object): Promise<void> {
        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Dados atualizados com sucesso');
            } else {
                console.log('Erro ao atualizar os dados:', response.status);
            }
        } catch (error) {
            console.error('Erro ao atualizar os dados:', error);
        }
    }

    static async delete(endpoint: string): Promise<void> {
        try {
            const response = await fetch(endpoint, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Dados deletados com sucesso');
            } else {
                console.log('Erro ao deletar os dados:', response.status);
            }
        } catch (error) {
            console.error('Erro ao deletar os dados:', error);
        }
    }
}

export default ApiUtils;
