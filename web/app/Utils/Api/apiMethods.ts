import {Programa} from "@/app/dashboard/page";

class ApiUtils {

    static async authenticate(loginUser: ILoginUser): Promise<string | undefined> {
        const endpoint = 'http://localhost:8080';
        const loginEndpoint = `${endpoint}/auth/login`;

        try {
            const response: IResponseToken | undefined = await this.post(loginEndpoint, loginUser);

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


    static async post<T>(endpoint: string, data: object): Promise<T | undefined> {
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

    static async getByUuid<T>(endpoint: string, uuid: string): Promise<T | undefined> {
        try {
            const response = await fetch(`${endpoint}/${uuid}`);

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
