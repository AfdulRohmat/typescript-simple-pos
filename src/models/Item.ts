export class Item {
    name: string;
    type: string;
    prices: { priceFor: string; price: number }[];

    constructor(name: string, type: string, prices: { priceFor: string; price: number }[]) {
        this.name = name;
        this.type = type;
        this.prices = prices;
    }

    // Method to get price for a specific buyer type
    public getPrice(buyerType: string): number | null {
        const priceObj = this.prices.find(price => price.priceFor === buyerType) ||
            this.prices.find(price => price.priceFor === 'regular');

        return priceObj ? priceObj.price : null;
    }

    public hasRegularPrice(): boolean {
        return this.prices.some(price => price.priceFor === 'regular');
    }
}