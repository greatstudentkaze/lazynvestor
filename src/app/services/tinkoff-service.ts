export abstract class TinkoffService {
    // todo: add ability to init with sandbox url?
    static baseUrl = 'https://invest-public-api.tinkoff.ru/rest';

    static sendRequest = async (url: string, init: RequestInit) => {
        const res = await fetch(`${TinkoffService.baseUrl}${url}`, {
            method: 'POST',
            ...init,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.TINKOFF_API_TOKEN}`,
                ...init.headers
            },
        });

        return res.json();
    };
}
