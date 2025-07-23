import {
    IRequestOptions,
    Method,
    requestOptions,
} from './Api.types';

class Api {

    async request(method: Method, url: string, options: IRequestOptions = requestOptions) {
        const {
            payload,
        } = options;

        const baseUrl = 'http://localhost:4000';

        const fetchOptions: any = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (payload && typeof payload === 'object') {
            fetchOptions.body = JSON.stringify(payload);
        }

        const response = await fetch(`${baseUrl}${url}`, fetchOptions);

        return response;
    }
}

const instance = new Api();

export default instance;
