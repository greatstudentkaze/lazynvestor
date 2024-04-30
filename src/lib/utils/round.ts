const PRECISION = 3;

export const round = (value: number, precision = PRECISION): number => {
    const roundingFactor = 10 ** precision;

    return Math.round(value * roundingFactor) / roundingFactor;
};
