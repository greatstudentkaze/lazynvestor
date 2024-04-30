interface Quotation {
    units: string;
    nano: number;
}

export interface MoneyValue {
    currency: string;
    units: string;
    nano: number;
}

export interface TinkoffPortfolioPosition {
    figi: string;
    averagePositionPrice: MoneyValue;
    quantity: Quotation;
    currentPrice: MoneyValue;
    // etc...
}

export interface PortfolioPosition {
    id: string;
    ticker: string;
    quantity: number;
    currentPrice: number;
    averagePositionPrice: number;
}

export interface IdealPortfolioPosition {
    share: string;
    currency: string;
    amount: number;
    ratio: number;
    goal: number;
    averagePositionPrice: number;
}
