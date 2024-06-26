import Link from 'next/link';
import {
    ChevronLeft, ChevronRight,
    Copy, CreditCard, File,
    Home,
    LineChart, ListFilter, MoreVertical,
    Package,
    Package2,
    PanelLeft,
    Search,
    Settings,
    ShoppingCart, Truck,
    Users2,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { IdealPortfolioPosition, PortfolioPosition } from '@/app/types';
import { FC } from 'react';
import { round } from '@/lib/utils/round';
import { AMOUNT_TO_INVEST } from '@/constants';
import { formatCurrency } from '@/lib/utils/format-currency';
import { getFinancialResult } from '@/lib/utils/get-financial-result';

export const Menu = () => {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Link
                    href="#"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Home className="h-5 w-5" />
                                <span className="sr-only">Dashboard</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Dashboard</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                <span className="sr-only">Orders</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Orders</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Package className="h-5 w-5" />
                                <span className="sr-only">Products</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Products</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Users2 className="h-5 w-5" />
                                <span className="sr-only">Customers</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Customers</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <LineChart className="h-5 w-5" />
                                <span className="sr-only">Analytics</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Analytics</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Settings className="h-5 w-5" />
                                <span className="sr-only">Settings</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    );
};

export const Header = () => {
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Home className="h-5 w-5" />
                            Dashboard
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-foreground"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            Orders
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Package className="h-5 w-5" />
                            Products
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Users2 className="h-5 w-5" />
                            Customers
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <LineChart className="h-5 w-5" />
                            Settings
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="#">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="#">Orders</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Recent Orders</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                    >
                        <Image
                            src="/placeholder-user.jpg"
                            width={36}
                            height={36}
                            alt="Avatar"
                            className="overflow-hidden rounded-full"
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export const Order = () => {
    return (
        <div>
            <Card
                className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
            >
                <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            Order Oe31b70H
                            <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <Copy className="h-3 w-3" />
                                <span className="sr-only">Copy Order ID</span>
                            </Button>
                        </CardTitle>
                        <CardDescription>Date: November 23, 2023</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                        <Button size="sm" variant="outline" className="h-8 gap-1">
                            <Truck className="h-3.5 w-3.5" />
                            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      Track Order
                    </span>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="outline" className="h-8 w-8">
                                    <MoreVertical className="h-3.5 w-3.5" />
                                    <span className="sr-only">More</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Export</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Trash</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                        <div className="font-semibold">Order Details</div>
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Glimmer Lamps x <span>2</span>
                      </span>
                                <span>$250.00</span>
                            </li>
                            <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Aqua Filters x <span>1</span>
                      </span>
                                <span>$49.00</span>
                            </li>
                        </ul>
                        <Separator className="my-2" />
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>$299.00</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>$5.00</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Tax</span>
                                <span>$25.00</span>
                            </li>
                            <li className="flex items-center justify-between font-semibold">
                                <span className="text-muted-foreground">Total</span>
                                <span>$329.00</span>
                            </li>
                        </ul>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-3">
                            <div className="font-semibold">Shipping Information</div>
                            <address className="grid gap-0.5 not-italic text-muted-foreground">
                                <span>Liam Johnson</span>
                                <span>1234 Main St.</span>
                                <span>Anytown, CA 12345</span>
                            </address>
                        </div>
                        <div className="grid auto-rows-max gap-3">
                            <div className="font-semibold">Billing Information</div>
                            <div className="text-muted-foreground">
                                Same as shipping address
                            </div>
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                        <div className="font-semibold">Customer Information</div>
                        <dl className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Customer</dt>
                                <dd>Liam Johnson</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Email</dt>
                                <dd>
                                    <a href="mailto:">liam@acme.com</a>
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Phone</dt>
                                <dd>
                                    <a href="tel:">+1 234 567 890</a>
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                        <div className="font-semibold">Payment Information</div>
                        <dl className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <dt className="flex items-center gap-1 text-muted-foreground">
                                    <CreditCard className="h-4 w-4" />
                                    Visa
                                </dt>
                                <dd>**** **** **** 4532</dd>
                            </div>
                        </dl>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground">
                        Updated <time dateTime="2023-11-23">November 23, 2023</time>
                    </div>
                    <Pagination className="ml-auto mr-0 w-auto">
                        <PaginationContent>
                            <PaginationItem>
                                <Button size="icon" variant="outline" className="h-6 w-6">
                                    <ChevronLeft className="h-3.5 w-3.5" />
                                    <span className="sr-only">Previous Order</span>
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button size="icon" variant="outline" className="h-6 w-6">
                                    <ChevronRight className="h-3.5 w-3.5" />
                                    <span className="sr-only">Next Order</span>
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </CardFooter>
            </Card>
        </div>
    );
};

interface PortfolioTableProps {
    idealPortfolio: IdealPortfolioPosition[];
    portfolio: Record<PortfolioPosition['ticker'], PortfolioPosition>;
}

export const Orders: FC<PortfolioTableProps> = ({ idealPortfolio, portfolio }) => {
    return (
        // <Tabs defaultValue="week">
        //     <div className="flex items-center">
        //         <TabsList>
        //             <TabsTrigger value="week">Week</TabsTrigger>
        //             <TabsTrigger value="month">Month</TabsTrigger>
        //             <TabsTrigger value="year">Year</TabsTrigger>
        //         </TabsList>
        //         <div className="ml-auto flex items-center gap-2">
        //             <DropdownMenu>
        //                 <DropdownMenuTrigger asChild>
        //                     <Button
        //                         variant="outline"
        //                         size="sm"
        //                         className="h-7 gap-1 text-sm"
        //                     >
        //                         <ListFilter className="h-3.5 w-3.5" />
        //                         <span className="sr-only sm:not-sr-only">Filter</span>
        //                     </Button>
        //                 </DropdownMenuTrigger>
        //                 <DropdownMenuContent align="end">
        //                     <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        //                     <DropdownMenuSeparator />
        //                     <DropdownMenuCheckboxItem checked>
        //                         Fulfilled
        //                     </DropdownMenuCheckboxItem>
        //                     <DropdownMenuCheckboxItem>
        //                         Declined
        //                     </DropdownMenuCheckboxItem>
        //                     <DropdownMenuCheckboxItem>
        //                         Refunded
        //                     </DropdownMenuCheckboxItem>
        //                 </DropdownMenuContent>
        //             </DropdownMenu>
        //             <Button
        //                 size="sm"
        //                 variant="outline"
        //                 className="h-7 gap-1 text-sm"
        //             >
        //                 <File className="h-3.5 w-3.5" />
        //                 <span className="sr-only sm:not-sr-only">Export</span>
        //             </Button>
        //         </div>
        //     </div>
        //     <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                        <CardTitle>Долгосрочный портфель</CardTitle>
                        <CardDescription>
                            Текущее состояние позиций
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Акция</TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Сумма инвестиций
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Общая стоимость
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Средняя стоимость позиции
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Количество
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Фин. результат
                                    </TableHead>
                                    <TableHead className="text-right">Цель (за шт.)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {idealPortfolio.map(({ share, currency, ratio, goal, averagePositionPrice }) => {
                                    const financialResult = getFinancialResult(portfolio[share] ? portfolio[share].averagePositionPrice * portfolio[share].quantity : 0, portfolio[share] ? portfolio[share].currentPrice * portfolio[share].quantity : 0);

                                    return (
                                        <TableRow key={share}>
                                            <TableCell>
                                                <div className="font-medium">#{share}</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    aboba
                                                </div>
                                            </TableCell>

                                            <TableCell className="hidden sm:table-cell">
                                                {formatCurrency(portfolio[share] ? portfolio[share].averagePositionPrice * portfolio[share].quantity : 0, { style: 'decimal' })} / {formatCurrency(round(AMOUNT_TO_INVEST * ratio))}
                                            </TableCell>

                                            <TableCell className="hidden sm:table-cell">
                                                {formatCurrency(portfolio[share] ? portfolio[share].currentPrice * portfolio[share].quantity : 0)}
                                                {/*<Badge className="text-xs" variant="outline">*/}
                                                {/*    Declined*/}
                                                {/*</Badge>*/}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {formatCurrency(portfolio[share]?.averagePositionPrice ?? 0, { notation: 'standard' })}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {new Intl.NumberFormat('ru-RU', { style: 'decimal', notation: 'compact' }).format(portfolio[share]?.quantity ?? 0)}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {formatCurrency(financialResult.absolute)} / {financialResult.relative}%
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {formatCurrency(goal, { notation: 'standard' })}
                                                <Badge className="ml-2">+{round((goal - averagePositionPrice) / averagePositionPrice * 100, 2)}%</Badge>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}


                                <>
                                {/*<TableRow>*/}
                                {/*    <TableCell>*/}
                                {/*        <div className="font-medium">Noah Williams</div>*/}
                                {/*        <div className="hidden text-sm text-muted-foreground md:inline">*/}
                                {/*            noah@example.com*/}
                                {/*        </div>*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="hidden sm:table-cell">*/}
                                {/*        Subscription*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="hidden sm:table-cell">*/}
                                {/*        <Badge className="text-xs" variant="secondary">*/}
                                {/*            Fulfilled*/}
                                {/*        </Badge>*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="hidden md:table-cell">*/}
                                {/*        2023-06-25*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="text-right">$350.00</TableCell>*/}
                                {/*</TableRow>*/}
                                {/*<TableRow>*/}
                                {/*    <TableCell>*/}
                                {/*        <div className="font-medium">Emma Brown</div>*/}
                                {/*        <div className="hidden text-sm text-muted-foreground md:inline">*/}
                                {/*            emma@example.com*/}
                                {/*        </div>*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="hidden sm:table-cell">*/}
                                {/*        Sale*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="hidden sm:table-cell">*/}
                                {/*        <Badge className="text-xs" variant="secondary">*/}
                                {/*            Fulfilled*/}
                                {/*        </Badge>*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="hidden md:table-cell">*/}
                                {/*        2023-06-26*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="text-right">$450.00</TableCell>*/}
                                {/*</TableRow>*/}
                                {/*<TableRow>*/}
                                {/*    <TableCell>*/}
                                {/*        <div className="font-medium">Liam Johnson</div>*/}
                                {/*        <div className="hidden text-sm text-muted-foreground md:inline">*/}
                                {/*            liam@example.com*/}
                                {/*        </div>*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="hidden sm:table-cell">*/}
                                {/*        Sale*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="hidden sm:table-cell">*/}
                                {/*        <Badge className="text-xs" variant="secondary">*/}
                                {/*            Fulfilled*/}
                                {/*        </Badge>*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="hidden md:table-cell">*/}
                                {/*        2023-06-23*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="text-right">$250.00</TableCell>*/}
                                {/*</TableRow>*/}
                                {/*<TableRow>*/}
                                {/*    <TableCell>*/}
                                {/*        <div className="font-medium">Liam Johnson</div>*/}
                                {/*        <div className="hidden text-sm text-muted-foreground md:inline">*/}
                                {/*            liam@example.com*/}
                                {/*        </div>*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="hidden sm:table-cell">*/}
                                {/*        Sale*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="hidden sm:table-cell">*/}
                                {/*        <Badge className="text-xs" variant="secondary">*/}
                                {/*            Fulfilled*/}
                                {/*        </Badge>*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="hidden md:table-cell">*/}
                                {/*        2023-06-23*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="text-right">$250.00</TableCell>*/}
                                {/*</TableRow>*/}
                                {/*<TableRow>*/}
                                {/*    <TableCell>*/}
                                {/*        <div className="font-medium">Olivia Smith</div>*/}
                                {/*        <div className="hidden text-sm text-muted-foreground md:inline">*/}
                                {/*            olivia@example.com*/}
                                {/*        </div>*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="hidden sm:table-cell">*/}
                                {/*        Refund*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="hidden sm:table-cell">*/}
                                {/*        <Badge className="text-xs" variant="outline">*/}
                                {/*            Declined*/}
                                {/*        </Badge>*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="hidden md:table-cell">*/}
                                {/*        2023-06-24*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="text-right">$150.00</TableCell>*/}
                                {/*</TableRow>*/}
                                {/*<TableRow>*/}
                                {/*    <TableCell>*/}
                                {/*        <div className="font-medium">Emma Brown</div>*/}
                                {/*        <div className="hidden text-sm text-muted-foreground md:inline">*/}
                                {/*            emma@example.com*/}
                                {/*        </div>*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="hidden sm:table-cell">*/}
                                {/*        Sale*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="hidden sm:table-cell">*/}
                                {/*        <Badge className="text-xs" variant="secondary">*/}
                                {/*            Fulfilled*/}
                                {/*        </Badge>*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="hidden md:table-cell">*/}
                                {/*        2023-06-26*/}
                                {/*    </TableCell>*/}
                                {/*    <TableCell className="text-right">$450.00</TableCell>*/}
                                {/*</TableRow>*/}
                                </>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            // </TabsContent>
        // </Tabs>
    );
};
