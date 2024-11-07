export class Transaction {
    item: string;
    qty: number;
    buyer: string;

    constructor(item: string, qty: number, buyer: string) {
        this.item = item;
        this.qty = qty;
        this.buyer = buyer;
    }
}