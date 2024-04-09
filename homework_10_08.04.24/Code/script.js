const exchangeRateUSD = 38.9;
const exchangeRateEUR = 42.25;
const exchangeRateGBP = 48.65;

let userCurrencyChoice = prompt(`What currency would you like to exchange?\n
                                                Enter your choice:\n1.USD\n2.EUR\n3.GBP`, "") ?? "";
userCurrencyChoice = userCurrencyChoice.trim().toUpperCase();

let resultExchangeMessage = "";

switch (userCurrencyChoice) {
    case '1':
    case 'USD':
        for (let step = 10; step <= 100; step += 10) {
            resultExchangeMessage += `${step}$ = ${step * exchangeRateUSD} UAH\n`;
        }
        break;
    case '2':
    case 'EUR':
        for (let step = 10; step <= 100; step += 10) {
            resultExchangeMessage += `${step + String.fromCharCode(8364)} = ${step * exchangeRateEUR} UAH\n`;
        }
        break;
    case '3':
    case 'GBP':
        for (let step = 10; step <= 100; step += 10) {
            resultExchangeMessage += `${step + String.fromCharCode(163)} = ${step * exchangeRateGBP} UAH\n`;
        }
        break;
    case "":
        resultExchangeMessage = "Good luck!";
        break;
    default:
        resultExchangeMessage = "Invalid choice! Refresh the page.";
        break;
}

alert(resultExchangeMessage);
