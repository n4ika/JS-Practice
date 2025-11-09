// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

// Add your functions below:
/* ------------------------------------------------- My Code Solutions  ---------------------------- */

// Returns if a credit card is valid (true) or not
const validateCred = (arr) => {
  let sumDigits = 0;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (
      (arr.length % 2 === 0 && i % 2 === 0) ||
      (arr.length % 2 === 1 && i % 2 === 1)
    ) {
      let doubledArr = arr[i] * 2;
      if (doubledArr > 9) {
        doubledArr -= 9;
      }
      sumDigits += doubledArr;
    } else {
      sumDigits += arr[i];
    }
  }

  if (sumDigits % 10 === 0) {
    return true;
  } else {
    return false;
  }
};

/* TESTS:
console.log(validateCred(valid1))
console.log(validateCred(invalid1))
console.log(validateCred(mystery1))
console.log(validateCred(mystery2)) 
*/

// Returns an array of invalid credit card numbers
const findInvalidCards = (nestedArr) => {
  let invalidCards = nestedArr.filter((item) => validateCred(item) === false);
  return invalidCards;
};

/* TEST:
let invalidCardsArray = findInvalidCards(batch)
console.log(invalidCardsArray)
*/

// Returns an array of credit card companies that mailed invalid credit cards
const idInvalidCardCompanies = (nInvalidCardArr) => {
  let companyInvalidCards = [];

  nInvalidCardArr.forEach((item) => {
    if (item[0] === 3) {
      if (!companyInvalidCards.includes("Amex (American Express)")) {
        companyInvalidCards.push("Amex (American Express)");
      }
    } else if (item[0] === 4) {
      if (!companyInvalidCards.includes("Visa")) {
        companyInvalidCards.push("Visa");
      }
    } else if (item[0] === 5) {
      if (!companyInvalidCards.includes("Mastercard")) {
        companyInvalidCards.push("Mastercard");
      }
    } else if (item[0] === 6) {
      if (!companyInvalidCards.includes("Discover")) {
        companyInvalidCards.push("Discover");
      }
    } else {
      console.log("Company not found");
    }
  });
  return companyInvalidCards;
};

/* TEST:
console.log(idInvalidCardCompanies(findInvalidCards(batch))
*/

/*  --------------------------------------- Bonus challenge & Tests ----------------------------------- */

// CHALLENGE 1: Returns an array of numbers
const ccNumberToArr = (cNumber) => {
  let cardNumber = cNumber.split("").map((digit) => parseInt(digit, 10));
  return cardNumber;
};

/* TEST:
console.log(ccNumberToArr('4716520059155030'))
*/

//numbers from https://www.freeformatter.com/credit-card-number-generator-validator.html
const visa = ccNumberToArr("4539172934148700");
const invalidVisa = ccNumberToArr("4532015112830367");
const amex = ccNumberToArr("348421381552503");
const invalidAmex = ccNumberToArr("378282246310006");
const mastercard = ccNumberToArr("2720997225906082");
const invalidMastercard = ccNumberToArr("27209597225906082");
const discover = ccNumberToArr("6011322488145287");
const invalidDiscover = ccNumberToArr("12511322488145287");

// Test individual validation:
console.log("Visa valid?", validateCred(visa));
console.log("Visa valid?", validateCred(invalidVisa));
console.log("Amex valid?", validateCred(amex));
console.log("Amex valid?", validateCred(invalidAmex));
console.log("Mastercard valid?", validateCred(mastercard));
console.log("Mastercard valid?", validateCred(invalidMastercard));
console.log("Discover valid?", validateCred(discover));
console.log("Discover valid?", validateCred(invalidDiscover));

// Test batch processing:
const mixedBatch = [visa, invalidVisa, amex, invalidAmex];
console.log("Invalid cards found:", findInvalidCards(mixedBatch));
console.log(
  "Companies Mailing Invalid Cards:",
  idInvalidCardCompanies(findInvalidCards(mixedBatch))
);

const convertInvalidToValid = (arr) => {
  if (validateCred(arr)) {
    return arr;
  }

  let newArr = [...arr];

  for (let digit = 0; digit <= 9; digit++) {
    newArr[newArr.length - 1] = digit;
    if (validateCred(newArr)) {
      return newArr;
    }
  }

  return newArr;
};

console.log("Original invalid:", invalidVisa);
console.log("Converted to valid:", convertInvalidToValid(invalidVisa));
console.log(
  "Is it valid now?",
  validateCred(convertInvalidToValid(invalidVisa))
);
