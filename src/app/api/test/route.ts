const TINKOFF_API_URL = 'https://invest-public-api.tinkoff.ru/rest';

const getAccounts = () =>
    fetch(`${TINKOFF_API_URL}/tinkoff.public.invest.api.contract.v1.UsersService/GetAccounts`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.TINKOFF_API_TOKEN}`
        },
        method: 'POST',
        body: JSON.stringify({}),
    });

const getPortfolio = (accountId: number) =>
    fetch(`${TINKOFF_API_URL}/tinkoff.public.invest.api.contract.v1.OperationsService/GetPortfolio`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.TINKOFF_API_TOKEN}`
        },
        method: 'POST',
        body: JSON.stringify({
            accountId,
            currency: 'RUB',
        }),
    });

const IIS = 2060172075;

export async function GET(request: Request) {
    try {
        const res = await getPortfolio(IIS);
        const json = await res.json();

        console.log(json.totalAmountPortfolio);

        return Response.json(json);
    } catch (err) {
        console.log('ERROR!');
        console.log(err);
    }

    return Response.json({ a: 'boba' });
}
