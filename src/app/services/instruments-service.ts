import { TinkoffService } from './tinkoff-service';

const INSTRUMENT_ID_TYPE_FIGI = 1;

export class InstrumentsService extends TinkoffService {
    static serviceUrl = '/tinkoff.public.invest.api.contract.v1.InstrumentsService';

    static getShare = async (shareId: string) => {
        return InstrumentsService.sendRequest(`${InstrumentsService.serviceUrl}/ShareBy`, {
            body: JSON.stringify({
                idType: INSTRUMENT_ID_TYPE_FIGI,
                id: shareId,
            })
        });
    };
}
