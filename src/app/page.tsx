import { OperationsService } from '@/app/services/operations-service';
import { InstrumentsService } from '@/app/services/instruments-service';
import { MoneyValue, PortfolioPosition } from '@/app/types';

import { Dashboard } from './dashboard';

const ICON_PORTFOLIO = [
    {
        share: 'VKCO',
        amount: 2_000_000,
        currency: 'rub',
    },
    {
        share: 'VTBR',
        amount: 2_000_000,
        currency: 'rub',
    },
    {
        share: 'GAZP',
        amount: 1_000_000,
        currency: 'rub',
    },
    {
        share: 'NVTK',
        amount: 2_000_000,
        currency: 'rub',
    },
    {
        share: 'POLY',
        amount: 1_000_000,
        currency: 'rub',
    },
    {
        share: 'TCSG',
        amount: 4_000_000,
        currency: 'rub',
    },
    {
        share: 'SMLT',
        amount: 2_000_000,
        currency: 'rub',
    },
];

const IIS = 2060172075;

const PRECISION = 3;

const round = (value: number, precision = PRECISION): number => {
    const roundingFactor = 10 ** precision;

    return Math.round(value * roundingFactor) / roundingFactor;
};

const getPortfolioWithDistributionRatio = (portfolio: typeof ICON_PORTFOLIO) => {
    const totalAmount = portfolio.reduce((acc, { amount }) => acc + amount, 0);

    return portfolio.map(({ amount, ...item }) => {
       return {
           ...item,
           amount,
           ratio: round(amount / totalAmount),
       };
    });
};

const AMOUNT_TO_INVEST = 900_000;

const getPortfolioPositions = async (): Promise<Record<PortfolioPosition['ticker'], PortfolioPosition>> => {
    const portfolio = await OperationsService.getPortfolio(IIS);

    const result: Record<string, PortfolioPosition> = {};
    const promises: Promise<void>[] = [];

    console.log(portfolio.positions);

    portfolio.positions.forEach(({ figi, averagePositionPrice, quantity, currentPrice  }) => {
        promises.push(
            InstrumentsService.getShare(figi)
                .then((it) => {
                    console.log(it);
                    const ticker = it.instrument?.ticker;
                    if (ticker) {
                        result[figi].ticker = ticker;
                        return;
                    }

                    delete result[figi];
                })
        );

        const qty = Number(quantity.units);

        const getTotal = (value: MoneyValue, quantity: number) => quantity * Number(value.units) + quantity * parseFloat(`0.${value.nano}`) / 10;

        result[figi] = {
            id: figi,
            quantity: qty,
            currentPrice: getTotal(currentPrice, qty),
            averagePositionPrice: getTotal(averagePositionPrice, qty),
            ticker: '',
        };
    });

    await Promise.all(promises);

    return Object.values(result).reduce((res, { ticker, ...item }) => {
        res[ticker] = {
            ticker,
            ...item
        };

        return res;
    }, {} as Record<PortfolioPosition['ticker'], PortfolioPosition>);
};

const Home = async () => {
    const portfolioWithDistributionRatio = getPortfolioWithDistributionRatio(ICON_PORTFOLIO);

    const portfolio = await getPortfolioPositions();

    return (
        <Dashboard>
            <section>
                <h2 className="mb-2">Идеальный портфель</h2>
                <ul>
                    {portfolioWithDistributionRatio.map(({ share, amount, currency, ratio }) => (
                        <li key={share}>{share} – {amount} {currency}. / {ratio}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className="mb-2">Сумма к инвестированию {AMOUNT_TO_INVEST} rub., состояние по плану:</h2>
                <ul>
                    {portfolioWithDistributionRatio.map(({ share, currency, ratio }) => (
                        <li key={share}>{share} – {portfolio[share]?.averagePositionPrice ?? 0} / {round(AMOUNT_TO_INVEST * ratio)} {currency}.</li>
                    ))}
                </ul>
            </section>
        </Dashboard>
    );
};

export default Home;
