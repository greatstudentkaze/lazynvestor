import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FC, PropsWithChildren } from 'react';
import { MoneyValue, PortfolioPosition } from '@/app/types';
import { OperationsService } from '@/app/services/operations-service';
import { InstrumentsService } from '@/app/services/instruments-service';
import { round } from '@/lib/utils/round';

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

const Chunk = () => {
    return (
        <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-4xl">$1,329</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    +25% from last week
                </div>
            </CardContent>
            <CardFooter>
                <Progress value={25} aria-label="25% increase" />
            </CardFooter>
        </Card>
    );
};


export const Dashboard: FC<PropsWithChildren> = async () => {
    const portfolioWithDistributionRatio = getPortfolioWithDistributionRatio(ICON_PORTFOLIO);

    const portfolio = await getPortfolioPositions();

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            {/*<Menu />*/}
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                {/*<Header />*/}
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">

                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 xl:grid-rows-2">
                            <Card className="sm:col-span-2 xl:row-span-full" x-chunk="dashboard-05-chunk-0">
                                <CardHeader className="pb-3">
                                    <CardTitle>Идеальный портфель</CardTitle>
                                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                                        Introducing Our Dynamic Orders Dashboard for Seamless
                                        Management and Insightful Analysis.
                                    </CardDescription>
                                    <CardContent>
                                        <ul>
                                            {portfolioWithDistributionRatio.map(({ share, amount, currency, ratio }) => (
                                                <li key={share}>{share} – {amount} {currency}. / {ratio}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </CardHeader>
                                <CardFooter>
                                    <Button>Create New Order</Button>
                                </CardFooter>
                            </Card>
                            <Chunk />
                            <Chunk />
                            <Chunk />
                            <Card x-chunk="dashboard-05-chunk-2">
                                <CardHeader className="pb-2">
                                    <CardDescription>This Month</CardDescription>
                                    <CardTitle className="text-4xl">$5,329</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        +10% from last month
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress value={12} aria-label="12% increase" />
                                </CardFooter>
                            </Card>
                        </div>
                        {/*<Orders />*/}


                        <h2 className="mb-2">Сумма к инвестированию {AMOUNT_TO_INVEST} rub., состояние по плану:</h2>
                        <ul>
                            {portfolioWithDistributionRatio.map(({ share, currency, ratio }) => (
                                <li key={share}>{share} – {portfolio[share]?.averagePositionPrice ?? 0} / {round(AMOUNT_TO_INVEST * ratio)} {currency}.</li>
                            ))}
                        </ul>
                    </div>
                    {/*<Order />*/}
                </main>
            </div>
        </div>
    )
}
