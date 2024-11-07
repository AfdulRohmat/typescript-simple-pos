## Simple POS System
A Simple Point of Sales (POS) System built in TypeScript for a small clothing shop. This application is designed to manage items, buyers, and transactions efficiently, providing a structured summary of sales, top-selling items, and high-spending customers. It emphasizes object-oriented programming (OOP) principles and efficient data structures.

## Features
- Item and Buyer Management: Supports unique items and buyers, each with distinct types and attributes.
- Transaction Processing: Processes and validates transactions, avoiding duplicates and missing prices.
- Sales Summary:
  - Total transactions count.
  - Best-selling item and category.
  - Revenue by category.
  - Daily revenue.
  - Top 3 spenders with detailed spending breakdown.

## Technology Stack
- Language: TypeScript
- Concepts Applied: Object-Oriented Programming (OOP), TypeScript Interfaces, Data Structures (for tracking items, buyers, and transactions)

## Project Structure
- Models: Defines structure for items, buyers, and transactions.
- POS System: The core processing class that handles transaction processing, sales tracking, and summary generation.
- Interfaces: Ensures consistent data types for summaries, sales tracking, and validation.

## Getting Started
1. Clone the repository:
   ```
    git clone https://github.com/AfdulRohmat/typescript-simple-pos.git
   ```
3. Install dependencies:
   ```
   npm install
   ```
5. Run the application
   ```
   ts-node src/index.ts
   ```

## Example Usage
1. Add items, buyers, and transactions to the POS system.
2. Run the POS system to process transactions.
3. Generate a detailed sales summary output in JSON format.

## Input Data
Input data for items, buyers, and transactions is manually added in the index.ts file. Each transaction is processed directly within the script, allowing you to adjust or expand data inputs as needed.

## Validation Requirements
The POS system enforces several validation checks to ensure data integrity before processing transactions. If any validation fails, an error will be printed to the console in English, and the summary will not be generated. Here are the validation rules:

1. **Mandatory Regular Price**: Every item must have a regular price. If a regular price is missing, the POS will print an error and stop.
2. **Special Price Handling**: If an item does not have a specific price for VIP or wholesale buyers, the regular price will be applied as a fallback.
3. **Unique Names**: Both item names and buyer names must be unique. If a duplicate is detected in the input, the POS will print an error and halt.
4. **Error Messages**: All error messages are printed in English for consistency.

## Example Input
```
{
  "Items": [
    {
      "name": "oval hat",
      "type": "hats",
      "prices": [
        {
          "priceFor": "regular",
          "price": 20000
        },
        {
          "priceFor": "VIP",
          "price": 15000
        }
      ]
    },
    {
      "name": "square hat",
      "type": "hats",
      "prices": [
        {
          "priceFor": "regular",
          "price": 30000
        },
        {
          "priceFor": "VIP",
          "price": 20000
        },
        {
          "priceFor": "wholesale",
          "price": 15000
        }
      ]
    },
    {
      "name": "magic shirt",
      "type": "tops",
      "prices": [
        {
          "priceFor": "regular",
          "price": 50000
        }
      ]
    }
  ],
  "Buyers": [
    {
      "name": "Ani",
      "type": "regular"
    },
    {
      "name": "Budi",
      "type": "VIP"
    },
    {
      "name": "Charlie",
      "type": "regular"
    },
    {
      "name": "Dipta",
      "type": "wholesale"
    }
  ],
  "Transaction": [
    {
      "item": "magic shirt",
      "qty": 1,
      "buyer": "Ani"
    },
    {
      "item": "square hat",
      "qty": 2,
      "buyer": "Budi"
    },
    {
      "item": "magic shirt",
      "qty": 1,
      "buyer": "Ani"
    },
    {
      "item": "oval hat",
      "qty": 1,
      "buyer": "Ani"
    },
    {
      "item": "square hat",
      "qty": 100,
      "buyer": "Dipta"
    }
  ]
}

```

## Example Output
```
{
  "Summary": {
    "totalTransaction": 5,
    "bestSellingItem": {
      "name": "square hat",
      "salesCount": 102
    },
    "bestSellingCategory": {
      "name": "hats",
      "revenue": 1560000
    },
    "rpc": [
      {
        "category": "hats",
        "revenue": 1560000
      },
      {
        "category": "tops",
        "revenue": 100000
      }
    ],
    "revenue": 1660000,
    "bestSpenders": [
      {
        "name": "Dipta",
        "type": "wholesale",
        "spent": 1500000
      },
      {
        "name": "Ani",
        "type": "regular",
        "spent": 120000
      },
      {
        "name": "Budi",
        "type": "VIP",
        "spent": 40000
      }
    ]
  }
}
```







