import { Item } from './models/Item';
import { Buyer } from './models/Buyer';
import { Transaction } from './models/Transaction';

interface RevenuePerCategory {
    [category: string]: number;
}

interface SpendingInfo {
    spent: number;
    type: string;
}

interface SpendingPerBuyer {
    [buyer: string]: SpendingInfo;
}

interface ItemSalesCount {
    [itemName: string]: number;
}

interface BestSellingItem {
    name: string;
    salesCount: number;
}

interface BestSellingCategory {
    name: string;
    revenue: number;
}

interface TotalRevenue {
    amount: number;
}

type Category = string;

interface Categories {
    list: Category[];
}

interface RPC {
    category: string;
    revenue: number;
}

interface RevenuePerCategoryList {
    rpcList: RPC[];
}

interface TopSpender {
    name: string;
    type: string;
    spent: number;
}

interface TopSpendersList {
    spenders: TopSpender[];
}

interface Summary {
    totalTransaction: number;
    bestSellingItem: BestSellingItem;
    bestSellingCategory: BestSellingCategory;
    rpc: RPC[];
    revenue: number;
    bestSpenders: TopSpender[];
}

export class POS {
    items: Item[];
    buyers: Buyer[];
    transactions: Transaction[];
    totalTransactions: number = 0;
    revenuePerCategory: RevenuePerCategory = {};
    spendingPerBuyer: SpendingPerBuyer = {};
    itemSalesCount: ItemSalesCount = {};

    constructor(items: Item[], buyers: Buyer[], transactions: Transaction[]) {
        this.items = items;
        this.buyers = buyers;
        this.transactions = transactions;
    }

    // validation functon to validate the input base on specific requirement
    validationData(): boolean {
        // Check for missing regular prices
        for (const item of this.items) {
            if (!item.hasRegularPrice()) {
                console.log(`Error: Item "${item.name}" does not have a regular price.`);
                return false;
            }
        }

        // Check for duplicate item names
        const itemNames = new Set();
        for (const item of this.items) {
            if (itemNames.has(item.name)) {
                console.log(`Error: Duplicate item name found - "${item.name}"`);
                return false;
            }

            itemNames.add(item.name)
        }

        // Check for duplicate buyer names
        const buyerNames = new Set();
        for (const buyer of this.buyers) {
            if (buyerNames.has(buyer.name)) {
                console.log(`Error: Duplicate buyer name found - "${buyer.name}"`);
                return false;
            }

            buyerNames.add(buyer.name);
        }

        // All validations passed
        return true;
    }

    processTransactions() {
        // Looping data transaction
        for (const transaction of this.transactions) {
            const item = this.items.find(i => i.name === transaction.item);
            const buyer = this.buyers.find(b => b.name === transaction.buyer);

            // Check if item and buter exist in certain transaction
            if (item && buyer) {
                const price: number | null = item.getPrice(buyer.type)

                if (price !== null) {
                    const totalPrice: number = price * transaction.qty
                    this.totalTransactions += 1;

                    // Track item sales count for best-selling item based on much qty transaction
                    if (!this.itemSalesCount[item.name]) {
                        this.itemSalesCount[item.name] = 0;
                    }
                    this.itemSalesCount[item.name] += transaction.qty;

                    // Update revenue per category
                    if (!this.revenuePerCategory[item.type]) {
                        this.revenuePerCategory[item.type] = 0;
                    }
                    this.revenuePerCategory[item.type] += totalPrice;

                    // Update spending per buyer
                    if (!this.spendingPerBuyer[buyer.name]) {
                        this.spendingPerBuyer[buyer.name] = { spent: 0, type: buyer.type };
                    }
                    this.spendingPerBuyer[buyer.name].spent += totalPrice;
                }
            }
        }
    }

    printSummary() {
        // init the variable and Calculate best-selling item based on much qty transaction
        let bestSellingItem: BestSellingItem = { name: "", salesCount: 0 };
        for (const item in this.itemSalesCount) {
            if (this.itemSalesCount[item] > bestSellingItem.salesCount) {
                bestSellingItem = {
                    name: item,
                    salesCount: this.itemSalesCount[item]
                };
            }
        }

        // Calculate best-selling category
        let bestSellingCategory: BestSellingCategory = { name: "", revenue: 0 };
        for (const category in this.revenuePerCategory) {
            if (this.revenuePerCategory[category] > bestSellingCategory.revenue) {
                bestSellingCategory = {
                    name: category,
                    revenue: this.revenuePerCategory[category]
                };
            }
        }

        // Calculate total revenue
        const totalRevenue: TotalRevenue = { amount: 0 };
        for (const category in this.revenuePerCategory) {
            totalRevenue.amount += this.revenuePerCategory[category];
        }

        // Unique categories
        const categories: Categories = { list: [] };
        const uniqueCategories = new Set<string>(); // using Set to make sure the data was unique

        for (const item of this.items) {
            if (!uniqueCategories.has(item.type)) { // check if data already exist or not
                uniqueCategories.add(item.type); // add to set
                categories.list.push(item.type); // add to categories list
            }
        }

        // Revenue per category (rpc)
        const rpc: RevenuePerCategoryList = {
            rpcList: categories.list.map(category => ({
                category,
                revenue: this.revenuePerCategory[category] || 0
            }))
        };

        // Top 3 spenders
        const topSpendersList: TopSpendersList = {

            // Object.entries() make object spendingPerBuyer to array
            spenders: Object.entries(this.spendingPerBuyer)
                .sort((a, b) => b[1].spent - a[1].spent)
                .slice(0, 3)
                .map(([name, { spent, type }]) => ({ name, type, spent }))
        };

        // Structure the summary data
        const summary: Summary = {
            totalTransaction: this.totalTransactions,
            bestSellingItem: bestSellingItem,
            bestSellingCategory: bestSellingCategory,
            rpc: rpc.rpcList,
            revenue: totalRevenue.amount,
            bestSpenders: topSpendersList.spenders
        };

        // Log the summary data in JSON format
        console.log(JSON.stringify({ Summary: summary }, null, 2));
    }
}