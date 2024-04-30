import { TinkoffService } from './tinkoff-service';
import { TinkoffPortfolioPosition } from '@/app/types';

interface PortfolioResponse {
    positions: TinkoffPortfolioPosition[];
}

export class OperationsService extends TinkoffService {
    static serviceUrl = `/tinkoff.public.invest.api.contract.v1.OperationsService`;

    static getPortfolio = async (accountId: number): Promise<PortfolioResponse> => {
        return OperationsService.sendRequest(`${OperationsService.serviceUrl}/GetPortfolio`, {
            body: JSON.stringify({
                accountId,
                currency: 'RUB',
            }),
        });
    };
}
