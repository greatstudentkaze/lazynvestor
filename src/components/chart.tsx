'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { IdealPortfolioPosition } from '@/app/types';
import { FC } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils/format-currency';
import { round } from '@/lib/utils/round';

interface ChartProps {
    data: IdealPortfolioPosition[];
    className?: string;
}

const CustomTooltip: FC<TooltipProps<number, string>> = ({ active, payload, label, ...props }) => {
    if (!active) {
        return null;
    }

    if (!payload || !payload.length) {
        return null;
    }

    const { name, value, payload: { averagePositionPrice, ratio } } = payload[0];

    return (
        <div className="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
            <p>{name} : {formatCurrency(value!)}</p>
            <p>Цена входа: {formatCurrency(averagePositionPrice, { notation: 'standard' })}</p>
            <p>{round(ratio * 100, 2)}% от портфеля</p>
        </div>
    );
};

const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#6EDBFF', '#FF6E6E', '#FF69B4',
    '#B0E57C', '#FFD700', '#6A5ACD', '#98FB98', '#20B2AA', '#FF6347', '#FFA07A', '#8A2BE2',
    '#FF4500', '#7B68EE', '#3CB371', '#FF1493'
];

export const Chart: FC<ChartProps> = ({ data, className }) => {
    if (!data) {
        return null;
    }

    const chartData = data.map(({ amount, share, ...item }) => ({
        name: `#${share}`,
        value: amount,
        ...item
    }));

    return (
        <div className={cn(className, 'w-full h-[250px]')}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie dataKey="value" data={chartData} fill="#8884d8" label={(entry) => entry.name}>
                        {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip content={CustomTooltip} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
};
