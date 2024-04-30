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
import { IdealPortfolioPosition, MoneyValue, PortfolioPosition } from '@/app/types';
import { OperationsService } from '@/app/services/operations-service';
import { InstrumentsService } from '@/app/services/instruments-service';
import { round } from '@/lib/utils/round';
import dynamic from 'next/dynamic';
import { Badge } from '@/components/ui/badge';
import { Orders } from '@/components/some-components-from-dashboard';
import { formatCurrency } from '@/lib/utils/format-currency';
import { getFinancialResult } from '@/lib/utils/get-financial-result';
import { AMOUNT_TO_INVEST } from '@/constants';

const Chart = dynamic(() => import('@/components/chart').then((mod) => mod.Chart), { ssr: false })

const ICON_PORTFOLIO = [
    {
        share: 'VKCO',
        amount: 2_000_000,
        currency: 'rub',
        averagePositionPrice: 606,
        goal: 900,
    },
    {
        share: 'VTBR',
        amount: 2_000_000,
        currency: 'rub',
        averagePositionPrice: 0.02325,
        // 0.04 и 0.07 еще была инфа
        goal: 0.05,
    },
    {
        share: 'GAZP',
        amount: 1_000_000,
        currency: 'rub',
        averagePositionPrice: 160.5,
        goal: 216,
    },
    {
        share: 'NVTK',
        amount: 2_000_000,
        currency: 'rub',
        averagePositionPrice: 1292,
        goal: 1700,
    },
    {
        share: 'POLY',
        amount: 1_000_000,
        currency: 'rub',
        averagePositionPrice: 330.8,
        goal: 450,
    },
    {
        share: 'TCSG',
        amount: 4_000_000,
        currency: 'rub',
        averagePositionPrice: 3040,
        goal: 5000,
    },
    {
        share: 'SMLT',
        amount: 2_000_000,
        currency: 'rub',
        averagePositionPrice: 3780,
        goal: 5000,
    },
];

const IIS = 2060172075;

const getPortfolioWithDistributionRatio = (portfolio: typeof ICON_PORTFOLIO): IdealPortfolioPosition[] => {
    const totalAmount = portfolio.reduce((acc, { amount }) => acc + amount, 0);

    return portfolio.map(({ amount, ...item }) => {
        return {
            ...item,
            amount,
            ratio: round(amount / totalAmount),
        };
    });
};

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

        // fixme
        const getTotal = (value: MoneyValue, quantity: number) => Number(value.units) + parseFloat(`0.${value.nano}`) / 10;

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
                <CardDescription>Что-то</CardDescription>
                <CardTitle className="text-4xl">N/A</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    +25% from last week
                </div>
            </CardContent>
            {/*<CardFooter>*/}
            {/*    <Progress value={25} aria-label="25% increase" />*/}
            {/*</CardFooter>*/}
        </Card>
    );
};


export const Dashboard: FC<PropsWithChildren> = async () => {
    const portfolioWithDistributionRatio = getPortfolioWithDistributionRatio(ICON_PORTFOLIO);

    const portfolio = await getPortfolioPositions();

    const totalInvested = portfolioWithDistributionRatio.reduce((acc, { share }) => {
        console.log(portfolio[share]);
        return acc + (portfolio[share] ? portfolio[share].averagePositionPrice * portfolio[share].quantity : 0);
    }, 0);

    const totalAmount = portfolioWithDistributionRatio.reduce((acc, { share }) => {
        console.log(portfolio[share]);
        return acc + (portfolio[share] ? portfolio[share].currentPrice * portfolio[share].quantity : 0);
    }, 0);

    const financialResult = getFinancialResult(totalInvested, totalAmount);

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            {/*<Menu />*/}
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-20">
                {/*<Header />*/}
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">

                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 xl:grid-rows-2">
                            <Card className="sm:col-span-2 xl:row-span-full" x-chunk="dashboard-05-chunk-0">
                                <CardHeader className="pb-3">
                                    <CardTitle>Идеальный портфель</CardTitle>
                                    {/*<CardDescription className="max-w-lg text-balance leading-relaxed">*/}
                                    {/*    Introducing Our Dynamic Orders Dashboard for Seamless*/}
                                    {/*    Management and Insightful Analysis.*/}
                                    {/*</CardDescription>*/}
                                    <CardContent className="pt-6">
                                        {/*<ul className="mb-4">*/}
                                        {/*    {portfolioWithDistributionRatio.map(({ share, amount, currency, ratio }) => (*/}
                                        {/*        <li key={share}>{share} – {amount} {currency}. / {ratio}</li>*/}
                                        {/*    ))}*/}
                                        {/*</ul>*/}
                                        <Chart data={portfolioWithDistributionRatio} />
                                    </CardContent>
                                </CardHeader>
                                <CardFooter className="space-x-2">
                                    {/*<Button>Добавить</Button>*/}
                                    <Button>Редактировать</Button>
                                </CardFooter>
                            </Card>

                            <Card x-chunk="dashboard-05-chunk-2">
                                <CardHeader className="pb-2">
                                    <CardDescription>Стоимость портфеля</CardDescription>
                                    <CardTitle className="text-4xl">{formatCurrency(totalAmount)}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        <Badge>{formatCurrency(financialResult.absolute)} / {financialResult.relative}%</Badge> за все время
                                    </div>
                                </CardContent>
                                {/*<CardFooter>*/}
                                {/*    <Progress value={12} aria-label="12% increase" />*/}
                                {/*</CardFooter>*/}
                            </Card>
                            <Chunk />

                            <Card x-chunk="dashboard-05-chunk-2">
                                <CardHeader className="pb-2">
                                    <CardDescription>Планируемая сумма инвестиций</CardDescription>
                                    <CardTitle className="text-4xl">{formatCurrency(AMOUNT_TO_INVEST)}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        Необходимо пополнить на {formatCurrency(AMOUNT_TO_INVEST - totalInvested)}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress value={totalInvested / AMOUNT_TO_INVEST * 100} aria-label="12% increase" />
                                </CardFooter>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-2">
                                <CardHeader className="pb-2">
                                    <CardDescription>Что-то</CardDescription>
                                    <CardTitle className="text-4xl">N/A</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        +10% N/A
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    {/*<Progress value={12} aria-label="12% increase" />*/}
                                </CardFooter>
                            </Card>
                        </div>

                        <Orders idealPortfolio={portfolioWithDistributionRatio} portfolio={portfolio} />
                    </div>
                    {/*<Order />*/}
                </main>
            </div>
        </div>
    )
}
