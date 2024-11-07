import { Item } from './models/Item';
import { Buyer } from './models/Buyer';
import { Transaction } from './models/Transaction';
import { POS } from './POS';

// Sample Items
const items = [
    new Item("oval hat", "hats", [
        { priceFor: "regular", price: 20000 },
        { priceFor: "VIP", price: 15000 }
    ]),
    new Item("square hat", "hats", [
        { priceFor: "regular", price: 30000 },
        { priceFor: "VIP", price: 20000 },
        { priceFor: "wholesale", price: 15000 }
    ]),
    new Item("magic shirt", "tops", [
        { priceFor: "regular", price: 50000 }
    ])
];

// Sample Buyers
const buyers = [
    new Buyer("Ani", "regular"),
    new Buyer("Budi", "VIP"),
    new Buyer("Charlie", "regular"),
    new Buyer("Dipta", "wholesale")
];

// Sample Transactions
const transactions = [
    new Transaction("magic shirt", 1, "Ani"),
    new Transaction("square hat", 2, "Budi"),
    new Transaction("magic shirt", 1, "Ani"),
    new Transaction("oval hat", 1, "Ani"),
    new Transaction("square hat", 100, "Dipta")
];

// Initialize the POS system
const posSystem = new POS(items, buyers, transactions);

// Run validation, process transactions, and print summary
if (posSystem.validationData()) {
    posSystem.processTransactions();
    posSystem.printSummary();
} else {
    console.log("Validation failed. Summary cannot be generated.");
}
