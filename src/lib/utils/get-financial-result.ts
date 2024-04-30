import { round } from '@/lib/utils/round';

export const getFinancialResult = (totalInvested: number, totalAmount: number) => {
    if (!totalInvested || !totalAmount) {
        return {
            absolute: 0,
            relative: 0,
        };
    }

    return {
        absolute: totalAmount - totalInvested,
        relative: round((totalAmount - totalInvested) / totalInvested * 100, 2),
    };
};
