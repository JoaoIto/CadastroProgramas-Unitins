class ApiUtils {

    static async authenticate(loginUser: ILoginUser): Promise<string | undefined> {
        const endpoint = 'http://localhost:8080';
        const loginEndpoint = `${endpoint}/auth/login`;

        try {
            const response: IResponseToken | undefined = await this.postLogin(loginEndpoint, loginUser);

            // Agora você pode acessar a propriedade access_token diretamente
            if (response) {
                const token = response.access_token;
                return token;
            }

        } catch (error) {
            console.error('Erro durante a autenticação:', error);
            throw error; // Repasse o erro para o chamador
        }
    }


    static async postLogin<T>(endpoint: string, data: object): Promise<T | undefined> {
        console.log( window.sessionStorage.getItem('perfilId'));

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'usuario-id': window.sessionStorage.getItem('perfilId') || ''
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Dados enviados com sucesso:', result);

                // Retornar o objeto criado no backend
                return result;
            } else {
                console.log('Erro ao enviar os dados:', response.status);
            }
        } catch (error) {
            console.error(error);
        }
    }
    static async post<T>(endpoint: string, data: object, token: string): Promise<T | undefined> {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Dados enviados com sucesso:', result);
                return result;
            } else {
                console.log('Erro ao enviar os dados:', response.status);
            }
        } catch (error) {
            console.error(error);
        }
        return undefined;
    }

    // Modifique as outras funções seguindo o mesmo padrão

    static async get<T>(endpoint: string, token: string): Promise<T | undefined> {
        try {
            const response = await fetch(endpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            const data: T = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
            throw error;
        }
    }

    static async getByUuid<T>(endpoint: string, uuid: string, token: string): Promise<T | undefined> {
        try {
            const response = await fetch(`${endpoint}/${uuid}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            const data: T = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
            throw error;
        }
    }

    static async put(endpoint: string, data: object, token: string): Promise<void> {
        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error('Erro ao atualizar os dados:', error);
            throw error;
        }
    }

    static async delete(endpoint: string, token: string): Promise<void> {
        try {
            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error('Erro ao deletar os dados:', error);
            throw error;
        }
    }
}

export default ApiUtils;
