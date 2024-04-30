export const formatCurrency = (value: number, options?: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', notation: 'compact', ...options }).format(value);
