function processInputFromUser(callbackForPrintResult) {

    for (let triesCounter = 10; triesCounter > 0; triesCounter--) {

        let userInput = prompt(`Enter number higher then 100:\n You have ${triesCounter} tries.`);

        if (userInput === null) {
            callbackForPrintResult("Good luck!");
            break;
        } else if (Number(userInput) && Number(userInput) > 100 || isNaN(Number(userInput))) {
            callbackForPrintResult("Your last suitable input was: " + userInput);
            break;
        } else if (triesCounter === 1) {
            callbackForPrintResult("All attempts expended, last entered was: " + userInput);
            break;
        }

    }
}

processInputFromUser(consolePrintResult);

function consolePrintResult(result) {
    console.log(result);
}
