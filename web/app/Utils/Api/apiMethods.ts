class ApiUtils {

    private static baseUrl = 'http://localhost:8080';
    static async authenticate(loginUser: ILoginUser): Promise<string | undefined> {
        const loginEndpoint = `${(ApiUtils.baseUrl)}/auth/login`;

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
    private static async performRequest<T>(url: string, options: RequestInit): Promise<T | undefined> {
        try {
            const response = await fetch(`${ApiUtils.baseUrl}${url}`, options);

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

    static async post(endpoint: string, data: object, token: string): Promise<void> {
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        };

        await ApiUtils.performRequest<void>(endpoint, options);
    }

    static async patch<T>(
        endpoint: string,
        data: object | FormData,
        token: string,
    ): Promise<T | undefined> {
        const headers: Record<string, string> = {
            'Authorization': `Bearer ${token}`,
        };

        let body: BodyInit;

        if (data instanceof FormData) {
            body = data;
        } else {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }

        const options: RequestInit = {
            method: 'PATCH',
            headers,
            body,
        };

        return ApiUtils.performRequest<T>(endpoint, options);
    }

    static async get<T>(endpoint: string, token: string): Promise<T | undefined> {
        const options: RequestInit = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };

        return ApiUtils.performRequest<T>(endpoint, options);
    }

    static async getByUuid<T>(endpoint: string, uuid: string, token: string): Promise<T | undefined> {
        const options: RequestInit = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };

        return ApiUtils.performRequest<T>(`${endpoint}/${uuid}`, options);
    }

    static async put(endpoint: string, data: object, token: string): Promise<void> {
        const options: RequestInit = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        };

        await ApiUtils.performRequest<void>(endpoint, options);
    }

    static async delete(endpoint: string, token: string): Promise<void> {
        const options: RequestInit = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };

        await ApiUtils.performRequest<void>(endpoint, options);
    }
}

export default ApiUtils;