# Credit Card Checker Challenge

A JavaScript project from Codecademy that validates credit card numbers using the Luhn algorithm and identifies which companies issued invalid cards.

## What It Does

This project implements a credit card validation system with the following functionality:

- **Validates credit card numbers** using the Luhn algorithm to determine if a card number is mathematically valid
- **Batch processes** arrays of credit card numbers to find all invalid cards
- **Identifies credit card companies** (Amex, Visa, Mastercard, Discover) that issued invalid cards
- **Converts string credit card numbers** into arrays for easy processing
- **Fixes invalid cards** by automatically adjusting the check digit to make them valid

## Key Implementations

### Luhn Algorithm Validation

- Implemented the Luhn algorithm with proper handling of even/odd index patterns based on array length
- Used modulo operations for digit validation and check digit verification
- Backwards iteration through arrays starting from the check digit

### Functional Programming Patterns

- Pure functions that don't mutate original data
- Function composition for clean data pipelines
- Spread operator for creating immutable copies

### Smart Card Repair

- Brute-force algorithm to convert invalid cards to valid ones
- Iterates through possible check digits (0-9) until finding a valid combination
- Preserves all other digits while only modifying the check digit

## Bonus Challenges Completed

Beyond the core requirements, I also implemented:

1. ✅ Tested with generated credit card numbers from [FreeFormatter's credit card generator](https://www.freeformatter.com/credit-card-number-generator-validator.html) across multiple companies (Visa, Amex, Mastercard, Discover)
2. ✅ Created a string-to-array converter using `.split()` and `.map()` with `parseInt()`
3. ✅ Built an invalid-to-valid converter that tries different check digits until finding one that works

## Technologies Used

- JavaScript (ES6+)
- Node.js

---

_Part of my ongoing JavaScript practice — check out more projects in the [JS-Practice](../) folder!_
